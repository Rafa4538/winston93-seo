import { useEffect, useState } from 'react'

export default function HeroSection() {
  const [isAndroid, setIsAndroid] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [isTablet, setIsTablet] = useState(false)
  const [videoLoaded, setVideoLoaded] = useState(false)
  const [loadingProgress, setLoadingProgress] = useState(0)

  useEffect(() => {
    const updateDeviceType = () => {
      const width = window.innerWidth
      const userAgent = navigator.userAgent.toLowerCase()
      
      // Detectar si es Android
      const isAndroidDevice = /android/.test(userAgent)
      setIsAndroid(isAndroidDevice)
      
      // Detectar tipo de dispositivo
      setIsMobile(width < 768)
      setIsTablet(width >= 768 && width < 1024)
    }
    
    updateDeviceType()
    window.addEventListener('resize', updateDeviceType)
    window.addEventListener('orientationchange', updateDeviceType)
    
    return () => {
      window.removeEventListener('resize', updateDeviceType)
      window.removeEventListener('orientationchange', updateDeviceType)
    }
  }, [])

  return (
    <div className="h-full w-full relative overflow-hidden">
      {/* Indicador de carga con espacio reservado */}
      {!videoLoaded && (
        <div className="absolute inset-0 bg-white bg-opacity-90 flex items-center justify-center z-20">
          <div className="text-center px-4">
            <div className="w-12 h-12 md:w-16 md:h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-800 text-base md:text-lg font-semibold">Cargando video...</p>
            <div className="w-48 md:w-64 bg-gray-200 rounded-full h-2 mt-4">
              <div 
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${loadingProgress}%` }}
              ></div>
            </div>
            <p className="text-gray-600 text-xs md:text-sm mt-2">{Math.round(loadingProgress)}% cargado</p>
          </div>
        </div>
      )}
      
      {/* Fundido blanco con transición suave */}
      <div 
        className={`absolute inset-0 bg-white z-10 transition-opacity duration-1000 ease-in-out`}
        style={{ 
          minHeight: '100vh',
          opacity: videoLoaded ? 0 : 1
        }}
      ></div>
      
      {/* Video de fondo con reproducción progresiva */}
      <video
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        poster="/images/slider/SLIDE_INICIO_1.jpg"
        className={`absolute inset-0 w-full h-full object-cover z-20 transition-opacity duration-1000 ease-in-out`}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          objectPosition: 'center',
          opacity: videoLoaded ? 1 : 0,
          // Ajustes específicos para Android
          ...(isAndroid && {
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            width: '100vw',
            height: '100vh',
            maxWidth: '100vw',
            maxHeight: '100vh',
            transform: 'translateZ(0)', // Forzar aceleración por hardware
            willChange: 'transform'
          })
        }}
        onLoadStart={() => {
          console.log('Video empezando a cargar...')
          setVideoLoaded(false)
        }}
        onCanPlay={() => {
          console.log('Video puede reproducirse')
          setVideoLoaded(true)
        }}
        onCanPlayThrough={() => {
          console.log('Video puede reproducirse completamente')
          setVideoLoaded(true)
        }}
        onProgress={(e) => {
          const video = e.currentTarget
          if (video.buffered.length > 0) {
            const bufferedEnd = video.buffered.end(video.buffered.length - 1)
            const duration = video.duration
            if (duration > 0) {
              const progress = (bufferedEnd / duration) * 100
              setLoadingProgress(progress)
            }
          }
        }}
      >
        <source src="/videos/winston-video.mp4" type="video/mp4" />
        Tu navegador no soporta videos HTML5.
      </video>

      {/* Overlay responsivo para mejorar legibilidad */}
      <div className="absolute inset-0 z-30 bg-black/20 md:bg-black/10 lg:bg-black/15"></div>

      {/* Contenido superpuesto responsivo */}
      <div className="absolute inset-0 z-40 flex items-center justify-center px-4 md:px-8">
        <div className="text-center text-white">
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6 tracking-wide">
            INSTITUTO WINSTON CHURCHILL
          </h1>
          <p className="text-lg md:text-xl lg:text-2xl font-medium mb-6 md:mb-8 opacity-90">
            Working for a Brighter Future
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 md:px-8 md:py-4 rounded-lg font-semibold transition-colors duration-300">
              Conoce más
            </button>
            <button className="bg-transparent border-2 border-white text-white px-6 py-3 md:px-8 md:py-4 rounded-lg font-semibold hover:bg-white hover:text-black transition-all duration-300">
              Contáctanos
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}