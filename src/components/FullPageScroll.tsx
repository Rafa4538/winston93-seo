import { useEffect, useRef, useState } from 'react'

interface FullPageScrollProps {
  children: React.ReactNode[]
  onSectionChange?: (sectionIndex: number) => void
}

export default function FullPageScroll({ children, onSectionChange }: FullPageScrollProps) {
  const [currentSection, setCurrentSection] = useState(0)
  const [isScrolling, setIsScrolling] = useState(false)
  const [windowHeight, setWindowHeight] = useState(0)
  const [isAndroid, setIsAndroid] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [isTablet, setIsTablet] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const touchStartY = useRef(0)

  // Inicializar altura de ventana en el cliente
  useEffect(() => {
    const updateHeight = () => {
      // En móvil, usar visualViewport si está disponible para mejor precisión
      if (window.visualViewport) {
        setWindowHeight(window.visualViewport.height)
      } else {
        setWindowHeight(window.innerHeight)
      }
    }
    
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
    
    updateHeight()
    updateDeviceType()
    
    window.addEventListener('resize', () => {
      updateHeight()
      updateDeviceType()
    })
    window.addEventListener('orientationchange', () => {
      setTimeout(() => {
        updateHeight()
        updateDeviceType()
      }, 100)
    })
    
    // Para móvil, también escuchar cambios en visualViewport
    if (window.visualViewport) {
      window.visualViewport.addEventListener('resize', updateHeight)
    }
    
    return () => {
      window.removeEventListener('resize', updateHeight)
      window.removeEventListener('orientationchange', updateHeight)
      if (window.visualViewport) {
        window.visualViewport.removeEventListener('resize', updateHeight)
      }
    }
  }, [])

  const scrollToSection = (index: number) => {
    if (isScrolling || index < 0 || index >= children.length || windowHeight === 0) return
    
    setIsScrolling(true)
    setCurrentSection(index)
    
    // Notificar al componente padre sobre el cambio de sección
    if (onSectionChange) {
      onSectionChange(index)
    }
    
    if (containerRef.current) {
      let translateY = 0
      
      if (index === 0) {
        translateY = 0
      } else {
        // Usar altura exacta para evitar acumulación de espacio
        const sectionHeight = windowHeight
        translateY = index * sectionHeight
      }
      containerRef.current.style.transform = `translateY(-${translateY}px)`
    }
    
    // Ajustar tiempo de bloqueo según el dispositivo
    const scrollDelay = isMobile ? 800 : 1000
    setTimeout(() => {
      setIsScrolling(false)
    }, scrollDelay)
  }

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault()
      
      if (isScrolling) return
      
      // Ajustar sensibilidad según el dispositivo
      const sensitivity = isMobile ? 30 : 50
      
      if (e.deltaY > sensitivity) {
        // Scroll hacia abajo
        scrollToSection(currentSection + 1)
      } else if (e.deltaY < -sensitivity) {
        // Scroll hacia arriba
        scrollToSection(currentSection - 1)
      }
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (isScrolling) return
      
      switch (e.key) {
        case 'ArrowDown':
        case 'PageDown':
          e.preventDefault()
          scrollToSection(currentSection + 1)
          break
        case 'ArrowUp':
        case 'PageUp':
          e.preventDefault()
          scrollToSection(currentSection - 1)
          break
        case 'Home':
          e.preventDefault()
          scrollToSection(0)
          break
        case 'End':
          e.preventDefault()
          scrollToSection(children.length - 1)
          break
      }
    }

    const handleTouchStart = (e: TouchEvent) => {
      touchStartY.current = e.touches[0].clientY
    }

    const handleTouchEnd = (e: TouchEvent) => {
      if (isScrolling) return
      
      const touchEndY = e.changedTouches[0].clientY
      const diff = touchStartY.current - touchEndY
      
      // Ajustar sensibilidad del touch según el dispositivo
      const touchSensitivity = isMobile ? 40 : 50
      
      if (Math.abs(diff) > touchSensitivity) {
        if (diff > 0) {
          // Swipe hacia arriba (scroll hacia abajo)
          scrollToSection(currentSection + 1)
        } else {
          // Swipe hacia abajo (scroll hacia arriba)
          scrollToSection(currentSection - 1)
        }
      }
    }

    // Solo agregar listeners si estamos en el cliente
    if (typeof window !== 'undefined') {
      // Ocultar scroll nativo para usar solo navegación por secciones
      document.body.style.overflow = 'hidden'
      
      window.addEventListener('wheel', handleWheel, { passive: false })
      window.addEventListener('keydown', handleKeyDown)
      window.addEventListener('touchstart', handleTouchStart, { passive: true })
      window.addEventListener('touchend', handleTouchEnd, { passive: true })
    }

    return () => {
      if (typeof window !== 'undefined') {
        document.body.style.overflow = 'hidden'
        window.removeEventListener('wheel', handleWheel)
        window.removeEventListener('keydown', handleKeyDown)
        window.removeEventListener('touchstart', handleTouchStart)
        window.removeEventListener('touchend', handleTouchEnd)
      }
    }
  }, [currentSection, isScrolling, children.length, windowHeight, isMobile, scrollToSection])

  // No renderizar hasta que tengamos la altura de la ventana
  if (windowHeight === 0) {
    return <div className="h-screen flex items-center justify-center">Cargando...</div>
  }

  return (
    <div className="relative overflow-hidden bg-transparent">
      {/* Contenedor de secciones */}
      <div
        ref={containerRef}
        className="transition-transform duration-1000 ease-in-out"
      >
        {children.map((child, index) => (
          <div
            key={index}
            className="w-full flex-shrink-0 relative"
            style={{ 
              height: '100vh',
              minHeight: '100vh',
              maxHeight: '100vh'
            }}
          >
            {child}
          </div>
        ))}
      </div>

      {/* Indicador de scroll - Responsivo */}
      <div className="absolute bottom-4 md:bottom-8 left-1/2 transform -translate-x-1/2 z-50 text-white animate-bounce">
        {currentSection < children.length - 1 && (
          <div className="flex flex-col items-center">
            <span className="text-xs md:text-sm mb-1 md:mb-2 opacity-75 hidden sm:block">Scroll para continuar</span>
            <svg className="w-4 h-4 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        )}
      </div>
    </div>
  )
} 