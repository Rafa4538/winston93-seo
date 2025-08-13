import { useState, useEffect } from 'react'
import AnimatedElement from '@/components/AnimatedElement'

export default function SliderSection() {
  const [currentSlide, setCurrentSlide] = useState(0)
  
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
    <div className="h-[calc(100vh-4rem)] w-full relative overflow-hidden">
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
              {/* Contenedor con animaciones direccionales */}
              <div key={currentSlide}>
                {/* Título - Entra desde arriba */}
                <h2 className="text-3xl md:text-5xl font-bold leading-tight mb-4 md:mb-8 slide-in-from-top">
                  <span className="block">{slides[currentSlide].title}</span>
                  <span className="block text-yellow-400">{slides[currentSlide].subtitle}</span>
                </h2>

                {/* Descripción - Entra desde la derecha */}
                {slides[currentSlide].description && (
                  <p className="text-base md:text-lg text-gray-200 mb-6 md:mb-10 md:max-w-md leading-relaxed slide-in-from-right line-clamp-3 md:line-clamp-none">
                    {slides[currentSlide].description}
                  </p>
                )}

                {/* Botón - Entra desde abajo */}
                <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 md:py-4 md:px-8 rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl slide-in-from-bottom">
                  AGENDAR CITA
                </button>
              </div>
            </div>

          </div>
        </div>
      </div>



      {/* Botones de navegación del slider - ocultar en móvil para limpiar */}
      <button
        onClick={prevSlide}
        className="hidden md:flex absolute left-4 top-1/2 transform -translate-y-1/2 z-40 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-all duration-300 shadow-lg"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <button
        onClick={nextSlide}
        className="hidden md:flex absolute right-4 top-1/2 transform -translate-y-1/2 z-40 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-all duration-300 shadow-lg"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Elementos decorativos adicionales */}
      <div className="hidden md:block absolute top-20 left-20 w-2 h-2 bg-yellow-300 rounded-full animate-pulse opacity-70 z-30"></div>
      <div className="hidden md:block absolute bottom-32 right-24 w-3 h-3 bg-blue-400 rounded-full animate-bounce opacity-60 z-30"></div>
      <div className="hidden md:block absolute top-1/3 right-1/4 w-1 h-1 bg-green-400 rounded-full animate-ping opacity-50 z-30"></div>
    </div>
  )
} 