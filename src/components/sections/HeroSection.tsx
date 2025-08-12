import { useEffect, useState } from 'react'

export default function HeroSection() {
  const [isAndroid, setIsAndroid] = useState(false)
  const [videoLoaded, setVideoLoaded] = useState(false)
  const [loadingProgress, setLoadingProgress] = useState(0)

  useEffect(() => {
    // Detectar si es Android
    const userAgent = navigator.userAgent.toLowerCase()
    const isAndroidDevice = /android/.test(userAgent)
    setIsAndroid(isAndroidDevice)
  }, [])

  return (
    <div className="h-full w-full relative overflow-hidden">
      {/* Indicador de carga con espacio reservado */}
      {!videoLoaded && (
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center z-20">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-white border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-white text-lg font-semibold">Cargando video...</p>
            <div className="w-64 bg-gray-700 rounded-full h-2 mt-4">
              <div 
                className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${loadingProgress}%` }}
              ></div>
            </div>
            <p className="text-white text-sm mt-2">{Math.round(loadingProgress)}% cargado</p>
          </div>
        </div>
      )}
      
      {/* Espacio reservado para el video - siempre visible */}
      <div className="absolute inset-0 bg-black z-10" style={{ minHeight: '100vh' }}></div>
      
      {/* Video de fondo con reproducción progresiva */}
              <video
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster="/images/slider/SLIDE_INICIO_1.jpg"
        className="absolute inset-0 w-full h-full object-cover z-20"
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          objectPosition: 'center',
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
    </div>
  )
}