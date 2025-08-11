import { useEffect, useState } from 'react'

export default function HeroSection() {
  const [isAndroid, setIsAndroid] = useState(false)

  useEffect(() => {
    // Detectar si es Android
    const userAgent = navigator.userAgent.toLowerCase()
    const isAndroidDevice = /android/.test(userAgent)
    setIsAndroid(isAndroidDevice)
  }, [])

  return (
    <div className="h-screen w-full relative overflow-hidden">
      {/* Video de fondo */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
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
      >
        <source src="/videos/winston-video.mp4" type="video/mp4" />
        Tu navegador no soporta videos HTML5.
      </video>
    </div>
  )
}