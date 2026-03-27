import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import AnimatedElement from '@/components/AnimatedElement'

export default function SliderSection() {
  const router = useRouter()
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isMobile, setIsMobile] = useState(false)
  const [isTablet, setIsTablet] = useState(false)
  const [isTabletLandscape, setIsTabletLandscape] = useState(false)
  
  const slides = [
    {
      image: '/images/slider/SLIDE_INICIO.jpg',
      title: 'FORMA PARTE',
      subtitle: 'DE LA FAMILIA WINSTON CHURCHILL',
      description: 'Únete a nuestra comunidad educativa y descubre el potencial que hay en ti. Más de 30 años formando líderes del mañana.'
    },
    {
      image: '/images/slider/SLIDE_INICIO_1.jpg',
      title: 'WORKING FOR A',
      subtitle: 'BRIGHTER FUTURE',
      description: 'Construimos el futuro a través de una educación de excelencia que prepara a nuestros estudiantes para los desafíos del mañana.'
    },
    {
      image: '/images/slider/SLIDE_INICIO_2.jpg',
      title: 'EDUCACIÓN QUE',
      subtitle: 'TRASCIENDE',
      description: 'Más que conocimientos, formamos personas íntegras con valores sólidos y visión global para transformar el mundo.'
    }
  ]

  // Detectar tipo de dispositivo
  useEffect(() => {
    const updateDeviceType = () => {
      const width = window.innerWidth
      const height = window.innerHeight
      const isLandscape = width > height
      
      setIsMobile(width < 768)
      setIsTablet(width >= 768 && width < 1024)
      setIsTabletLandscape(width >= 768 && width < 1024 && isLandscape)
    }
    
    updateDeviceType()
    window.addEventListener('resize', updateDeviceType)
    window.addEventListener('orientationchange', updateDeviceType)
    
    return () => {
      window.removeEventListener('resize', updateDeviceType)
      window.removeEventListener('orientationchange', updateDeviceType)
    }
  }, [])

  // Auto-advance slider every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => {
        const nextSlide = (prev + 1) % slides.length
        return nextSlide
      })
    }, 5000)
    
    return () => clearInterval(interval)
  }, [slides.length])

  const nextSlide = () => {
    setCurrentSlide((prev) => {
      return (prev + 1) % slides.length
    })
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => {
      return (prev - 1 + slides.length) % slides.length
    })
  }

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
  }

  return (
    <div className="w-full h-full relative overflow-hidden">
      {/* Slider de imágenes de fondo */}
      <div className="absolute inset-0">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
            }`}
          >
            <img
              src={slide.image}
              alt={`Slide ${index + 1}`}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
        {/* Overlay oscuro para legibilidad */}
        <div className="absolute inset-0 z-20 bg-black/30 md:bg-black/15 lg:bg-black/20"></div>
      </div>

      {/* Contenido superpuesto */}
      <div className="relative z-30 h-full flex items-center justify-end">
        <div className="container mx-auto px-2 md:px-8 py-0 md:py-0">
          {/* 2026-03-27: Ajuste de tipografía/espaciado para lectura en móvil y tablet. */}
          <div className={`flex items-start justify-between h-full ${
            // Eliminar padding-top en móvil, mantener en tablet/desktop
            isTabletLandscape 
              ? 'pt-12' // Menos padding en tablet horizontal
              : 'pt-4 md:pt-20' // Mínimo padding en móvil, normal en desktop
          }`}>
            
            {/* Texto dinámico con posicionamiento condicional */}
            <div className={`${
              currentSlide === 2 
                ? 'w-full md:w-1/2 md:max-w-lg text-white md:pl-8 md:ml-auto' // Slide 3: derecha en desktop
                : 'w-full md:w-1/2 md:max-w-lg text-white md:pr-8'        // Slides 1 y 2: izquierda en desktop
            }`}>
              <AnimatedElement>
                <h2 className="text-[clamp(1.5rem,4.2vw,3rem)] font-bold mb-2 md:mb-4 tracking-wide">
                  {slides[currentSlide].title}
                </h2>
                <h3 className="text-[clamp(1.125rem,3.5vw,2.25rem)] font-bold mb-3 md:mb-4 lg:mb-6 text-blue-300">
                  {slides[currentSlide].subtitle}
                </h3>
                <p className="text-base md:text-base lg:text-lg text-gray-100 leading-relaxed mb-4 md:mb-6 lg:mb-8 max-w-md md:max-w-none">
                  {slides[currentSlide].description}
                </p>
                <button 
                  onClick={() => router.push('/contacto')}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 md:px-4 md:py-2 lg:px-6 lg:py-3 rounded-lg font-semibold transition-colors duration-300 text-sm sm:text-sm md:text-base"
                >
                  Agenda ahora
                </button>
              </AnimatedElement>
            </div>

            {/* Controles de navegación - Desktop y Tablet */}
            <div className="hidden md:flex flex-col items-center justify-center space-y-3 md:space-y-4">
              {/* Botón anterior */}
              <button
                onClick={prevSlide}
                className="w-10 h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 bg-white/20 hover:bg-white/30 text-white rounded-full flex items-center justify-center transition-all duration-300 backdrop-blur-sm"
              >
                <svg className="w-4 h-4 md:w-5 md:h-5 lg:w-6 lg:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>

              {/* Indicadores de slide */}
              <div className="flex flex-col space-y-1.5 md:space-y-2">
                {slides.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToSlide(index)}
                    className={`w-2.5 h-2.5 md:w-3 md:h-3 rounded-full transition-all duration-300 ${
                      index === currentSlide 
                        ? 'bg-white scale-125' 
                        : 'bg-white/50 hover:bg-white/75'
                    }`}
                  />
                ))}
              </div>

              {/* Botón siguiente */}
              <button
                onClick={nextSlide}
                className="w-10 h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 bg-white/20 hover:bg-white/30 text-white rounded-full flex items-center justify-center transition-all duration-300 backdrop-blur-sm"
              >
                <svg className="w-4 h-4 md:w-5 md:h-5 lg:w-6 lg:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Controles móviles */}
      <div className="md:hidden absolute bottom-4 left-1/2 transform -translate-x-1/2 z-40">
          <div className="flex space-x-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                index === currentSlide 
                  ? 'bg-white scale-125' 
                  : 'bg-white/50'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Botones de navegación móviles */}
      <div className="md:hidden absolute inset-x-0 top-1/2 transform -translate-y-1/2 z-40 flex justify-between px-4">
        <button
          onClick={prevSlide}
          className="w-11 h-11 bg-white/20 hover:bg-white/30 text-white rounded-full flex items-center justify-center transition-all duration-300 backdrop-blur-sm"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button
          onClick={nextSlide}
          className="w-11 h-11 bg-white/20 hover:bg-white/30 text-white rounded-full flex items-center justify-center transition-all duration-300 backdrop-blur-sm"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  )
} 