import { useEffect, useRef, useState } from 'react'

export default function ConveniosSection() {
  const [isVisible, setIsVisible] = useState(false)
  const [isTablet, setIsTablet] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)

  // Detectar si es tablet
  useEffect(() => {
    const updateDeviceType = () => {
      const width = window.innerWidth
      const height = window.innerHeight
      const isLandscape = width > height
      
      // Tablet: (768-1024px) O (landscape con altura <= 900px) - incluye Nest Hub y Nest Hub Max
      const isTabletDevice = (width >= 768 && width <= 1024) || (isLandscape && height <= 900)
      setIsTablet(isTabletDevice)
    }
    
    updateDeviceType()
    window.addEventListener('resize', updateDeviceType)
    window.addEventListener('orientationchange', updateDeviceType)
    
    return () => {
      window.removeEventListener('resize', updateDeviceType)
      window.removeEventListener('orientationchange', updateDeviceType)
    }
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.3 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <div ref={sectionRef} className="h-full w-full relative overflow-hidden bg-white">
      {/* Contenido principal */}
      <div className="h-[300px] md:h-full flex items-center justify-center">
        <div className="w-full px-4 md:px-8">
          <div className="flex items-center justify-center h-full">
            
            {/* 2026-03-27: Corrección de escalas responsive válidas para conservar proporciones en móvil/tablet/desktop. */}
            {/* Imagen de convenios más grande y mejor centrada */}
            <div className="relative flex items-center justify-center w-full max-w-7xl ml-2 sm:ml-4 md:ml-12 lg:ml-16">
              <div className={`relative w-full flex items-center justify-center transition-all duration-1000 ease-out ${
                isVisible 
                  ? 'opacity-100 translate-y-0 scale-100' 
                  : 'opacity-0 translate-y-8 scale-95'
              }`} style={{ transitionDelay: '200ms' }}>
                {/* Imagen de convenios - Responsive - Tamaño perfecto */}
                <img
                  src="/images/logos/convenios.png"
                  alt="Convenios y Alianzas Académicas - Instituto Winston Churchill"
                  // 2026-03-27: Reducción de escala para mejorar composición y evitar solapes con texto.
                  className="w-auto h-auto object-contain scale-90 sm:scale-95 md:scale-100 lg:scale-110 xl:scale-125 2xl:scale-140"
                />
                
                {/* 2026-03-27: Reubicación responsive del texto para evitar empalme sobre la imagen. */}
                {/* Texto vertical anclado al margen derecho del bloque azul */}
                <div className={`absolute right-2 sm:right-3 md:right-4 lg:right-6 xl:right-8 top-1/2 transform -translate-y-1/2 transition-all duration-1000 ease-out ${
                  isVisible 
                    ? 'opacity-100 translate-x-0' 
                    : 'opacity-0 translate-x-8'
                }`} style={{ transitionDelay: '600ms' }}>
                  <div className="text-white transform rotate-90 origin-center whitespace-nowrap drop-shadow-[0_2px_6px_rgba(0,0,0,0.35)]">
                    <h2 className={`font-bold tracking-widest ${
                      isTablet 
                        ? 'text-sm' 
                        : 'text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl 2xl:text-2xl'
                    }`}>
                      CONVENIOS Y CERTIFICACIONES
                    </h2>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
} 