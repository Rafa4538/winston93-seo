import { useState, useEffect } from 'react'
import AnimatedElement from '@/components/AnimatedElement'

export default function SliderSection() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isMobile, setIsMobile] = useState(false)
  const [isTablet, setIsTablet] = useState(false)
  
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

  // Auto-advance slider every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => {
        const nextSlide = (prev + 1) % slides.length
        console.log('Auto advancing to slide:', nextSlide)
        return nextSlide
      })
    }, 5000)
    
    return () => clearInterval(interval)
  }, [slides.length])

  const nextSlide = () => {
    setCurrentSlide((prev) => {
      const next = (prev + 1) % slides.length
      console.log('Manual next to slide:', next)
      return next
    })
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => {
      const previous = (prev - 1 + slides.length) % slides.length
      console.log('Manual prev to slide:', previous)
      return previous
    })
  }

  const goToSlide = (index: number) => {
    console.log('Going to slide:', index)
    setCurrentSlide(index)
  }

  // Debug: Log current slide
  useEffect(() => {
    console.log('Current slide changed to:', currentSlide)
  }, [currentSlide])

  return (
    <div className="h-screen w-full relative overflow-hidden">
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
              onLoad={() => console.log(`Image ${index + 1} loaded:`, slide.image)}
              onError={(e) => console.error(`Error loading image ${index + 1}:`, slide.image, e)}
            />
          </div>
        ))}
        {/* Overlay oscuro para legibilidad */}
        <div className="absolute inset-0 z-20 bg-black/30 md:bg-black/15 lg:bg-black/20"></div>
      </div>

      {/* Contenido superpuesto */}
      <div className="relative z-30 h-full flex items-center">
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex items-start justify-between h-full pt-16 md:pt-20">
            
            {/* Texto dinámico con posicionamiento condicional */}
            <div className={`${
              currentSlide === 2 
                ? 'w-full md:w-1/2 md:max-w-lg text-white md:pl-8 md:ml-auto' // Slide 3: derecha en desktop
                : 'w-full md:w-1/2 md:max-w-lg text-white md:pr-8'        // Slides 1 y 2: izquierda en desktop
            }`}>
              <AnimatedElement>
                <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold mb-2 md:mb-4 tracking-wide">
                  {slides[currentSlide].title}
                </h2>
                <h3 className="text-xl md:text-3xl lg:text-4xl font-bold mb-4 md:mb-6 text-blue-300">
                  {slides[currentSlide].subtitle}
                </h3>
                <p className="text-sm md:text-base lg:text-lg text-gray-200 leading-relaxed mb-6 md:mb-8">
                  {slides[currentSlide].description}
                </p>
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 md:px-6 md:py-3 rounded-lg font-semibold transition-colors duration-300 text-sm md:text-base">
                  Saber más
                </button>
              </AnimatedElement>
            </div>

            {/* Controles de navegación */}
            <div className="hidden md:flex flex-col items-center justify-center space-y-4">
              {/* Botón anterior */}
              <button
                onClick={prevSlide}
                className="w-12 h-12 md:w-14 md:h-14 bg-white/20 hover:bg-white/30 text-white rounded-full flex items-center justify-center transition-all duration-300 backdrop-blur-sm"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>

              {/* Indicadores de slide */}
              <div className="flex flex-col space-y-2">
                {slides.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToSlide(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
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
                className="w-12 h-12 md:w-14 md:h-14 bg-white/20 hover:bg-white/30 text-white rounded-full flex items-center justify-center transition-all duration-300 backdrop-blur-sm"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
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
          className="w-10 h-10 bg-white/20 hover:bg-white/30 text-white rounded-full flex items-center justify-center transition-all duration-300 backdrop-blur-sm"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button
          onClick={nextSlide}
          className="w-10 h-10 bg-white/20 hover:bg-white/30 text-white rounded-full flex items-center justify-center transition-all duration-300 backdrop-blur-sm"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  )
} 