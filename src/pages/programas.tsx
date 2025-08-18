import Head from 'next/head'
import { useState, useEffect, useRef } from 'react'
import Navigation from '@/components/Navigation'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import FullPageScroll from '@/components/FullPageScroll'

// Componente para imágenes fragmentadas
const ImageFragment = ({ 
  src, 
  alt, 
  initialPosition, 
  delay = 0 
}: {
  src: string
  alt: string
  initialPosition: { x: number; y: number }
  delay?: number
}) => {
  return (
    <motion.div
      initial={{ 
        opacity: 0, 
        x: initialPosition.x, 
        y: initialPosition.y,
        scale: 0.9,
        rotate: 0
      }}
      whileInView={{ 
        opacity: 1, 
        x: 0, 
        y: 0,
        scale: 1,
        rotate: 0
      }}
      transition={{ 
        duration: 0.8, 
        delay: delay,
        ease: "easeOut"
      }}
      viewport={{ once: true, margin: "-50px" }}
      className="w-full h-full relative"
      style={{ 
        border: 'none', 
        outline: 'none',
        boxShadow: 'none'
      }}
    >
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover"
        priority={true}
        style={{ 
          border: 'none', 
          outline: 'none',
          boxShadow: 'none',
          objectPosition: 'center'
        }}
      />
    </motion.div>
  )
}

// Tipo para las secciones que pueden tener imagen normal o fragmentada
interface Section {
  id: string
  title: string
  subtitle: string
  description: string
  longDescription: string
  bgColor: string
  textColor: string
  accentColor: string
  image?: string
  imageFragments?: string[]
  fragmentPositions?: { x: number; y: number }[]
}

export default function ProgramasPage() {
  const [showTitle, setShowTitle] = useState(true)

  // Ocultar el título después de 3 segundos
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowTitle(false)
    }, 3000)
    
    return () => clearTimeout(timer)
  }, [])

  // Función para obtener el color de difuminado según el fondo de la sección
  const getFadeColor = (bgColor: string) => {
    if (bgColor.includes('blue-500') || bgColor.includes('blue-600')) {
      return {
        light: 'rgba(59, 130, 246, 0.05)',
        medium: 'rgba(59, 130, 246, 0.15)',
        strong: 'rgba(59, 130, 246, 0.4)',
        veryStrong: 'rgba(59, 130, 246, 0.7)',
        solid: 'rgba(59, 130, 246, 0.95)'
      }
    } else if (bgColor.includes('blue-800')) {
      return {
        light: 'rgba(30, 58, 138, 0.05)',
        medium: 'rgba(30, 58, 138, 0.15)',
        strong: 'rgba(30, 58, 138, 0.4)',
        veryStrong: 'rgba(30, 58, 138, 0.7)',
        solid: 'rgba(30, 58, 138, 0.95)'
      }
    } else if (bgColor.includes('yellow-400') || bgColor.includes('yellow-500')) {
      return {
        light: 'rgba(234, 179, 8, 0.05)',
        medium: 'rgba(234, 179, 8, 0.15)',
        strong: 'rgba(234, 179, 8, 0.4)',
        veryStrong: 'rgba(234, 179, 8, 0.7)',
        solid: 'rgba(234, 179, 8, 0.95)'
      }
    }
    // Color por defecto (negro) para otros casos
    return {
      light: 'rgba(0, 0, 0, 0.05)',
      medium: 'rgba(0, 0, 0, 0.15)',
      strong: 'rgba(0, 0, 0, 0.4)',
      veryStrong: 'rgba(0, 0, 0, 0.7)',
      solid: 'rgba(0, 0, 0, 0.95)'
    }
  }

  // Configuración de las tres secciones
  const sections: Section[] = [
    {
      id: 'mindfulness',
      title: 'MIND',
      subtitle: 'FUL NESS',
      description: 'Atención plena para el bienestar emocional y la concentración.',
      longDescription: 'Con ejercicios de respiración, enfoque y relajación, nuestros alumnos aprenden a gestionar sus emociones y mejorar su rendimiento académico.',
      bgColor: 'from-blue-500 to-blue-600',
      textColor: 'text-white',
      accentColor: 'bg-yellow-400',
      // Imágenes fragmentadas para el efecto de unión
      image: '/images/PROGRAMAS/socioemocional.jpg'
    },
    {
      id: 'formacion-social',
      title: 'FORMACIÓN',
      subtitle: 'Social y Humana',
      description: 'Atención plena para el bienestar emocional y la concentración.',
      longDescription: 'Con ejercicios de respiración, enfoque y relajación, nuestros alumnos aprenden a gestionar sus emociones y mejorar su rendimiento académico.',
      bgColor: 'from-blue-600 to-blue-800',
      textColor: 'text-white',
      accentColor: 'bg-yellow-400',
      // Imágenes fragmentadas para formación social (efecto desfazado)
      image: '/images/PROGRAMAS/donativo.jpg'
    },
    {
      id: 'educacion-financiera',
      title: 'Educación Financiera',
      subtitle: 'Entrepreneurs',
      description: 'Fomentamos la cultura del emprendimiento desde edades tempranas.',
      longDescription: 'Nuestros alumnos no sólo imaginan ideas innovadoras: Aprenden a construir un negocio desde cero. Desarrollan planes de negocio reales, crean estrategias de marketing, realizan proyecciones financieras básicas y presentan sus proyectos de forma profesional, todo esto con la finalidad de fortalecer su liderazgo, pensamiento estratégico y toma de decisiones.',
      bgColor: 'from-yellow-400 to-yellow-500',
      textColor: 'text-black',
      accentColor: 'bg-blue-600',
      // Imágenes fragmentadas para emprendimiento
      image: '/images/PROGRAMAS/emprende.jpg'
    }
  ]

  return (
    <div className="programas-page">
      <Head>
        <title>Programas - Instituto Winston Churchill</title>
        <meta name="description" content="Descubre nuestros programas especializados en formación social, educación financiera y mindfulness en el Instituto Winston Churchill." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="keywords" content="programas, mindfulness, emprendimiento, educación financiera, Winston Churchill" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Navigation siempre transparente */}
      <Navigation currentSection={0} />

      {/* Título de página que aparece brevemente */}
      <AnimatePresence>
        {showTitle && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.8 }}
            className="fixed top-16 md:top-24 left-1/2 transform -translate-x-1/2 z-30 bg-blue-900 text-white px-4 md:px-6 py-2 md:py-3 rounded-full shadow-lg"
          >
            <h1 className="text-sm md:text-lg font-bold">PROGRAMAS ESPECIALIZADOS</h1>
          </motion.div>
        )}
      </AnimatePresence>

      {/* FullPageScroll para manejar el scroll por secciones */}
      <FullPageScroll>
        {sections.map((section, index) => (
          <motion.section
            key={section.id}
            className="w-full relative overflow-hidden"
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            viewport={{ once: true, margin: "-200px" }}
            style={{ border: 'none', outline: 'none', boxShadow: 'none' }}
          >
            {/* Contenedor unificado para imagen y texto */}
            <div className="h-full w-full relative flex flex-col md:flex-row" style={{ border: 'none', outline: 'none', boxShadow: 'none' }}>
              {/* Imagen de fondo con overlay */}
              <div className="w-full md:w-2/3 h-1/2 md:h-full relative" style={{ border: 'none', outline: 'none', boxShadow: 'none' }}>
                <motion.div
                  initial={{ opacity: 0, scale: 1.1 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                  viewport={{ once: true, margin: "-50px" }}
                  className="absolute inset-0"
                  style={{ border: 'none', outline: 'none' }}
                >
                  {/* Renderizar imagen normal o fragmentos según la configuración */}
                  {section.imageFragments && section.imageFragments.length > 0 ? (
                    // Renderizar fragmentos si existen
                    <div className="image-fragments-container">
                      {section.imageFragments.map((fragmentSrc, fragmentIndex) => (
                        <div
                          key={fragmentIndex}
                          className="absolute"
                          style={{
                            left: section.id === 'educacion-financiera' ? '0%' : `${(fragmentIndex * 33.33)}%`,
                            top: section.id === 'educacion-financiera' ? `${fragmentIndex * 33.33}%` : '0%',
                            width: section.id === 'educacion-financiera' ? '100%' : '33.33%',
                            height: section.id === 'educacion-financiera' ? '33.33%' : '100%',
                            zIndex: fragmentIndex + 1,
                            transform: 'translateX(0)',
                            overflow: 'hidden',
                            boxSizing: 'border-box'
                          }}
                        >
                          <ImageFragment
                            src={fragmentSrc}
                            alt={`${section.title} - Fragmento ${fragmentIndex + 1}`}
                            initialPosition={section.fragmentPositions[fragmentIndex]}
                            delay={fragmentIndex * 1.5}
                          />
                        </div>
                      ))}
                    </div>
                  ) : section.image ? (
                    // Renderizar imagen normal si existe
                    <Image
                      src={section.image}
                      alt={section.title}
                      fill
                      className="object-cover"
                      priority={index === 0}
                    />
                  ) : (
                    // Fallback si no hay imagen ni fragmentos
                    <div className="w-full h-full bg-gray-300 flex items-center justify-center">
                      <span className="text-gray-500">Imagen no disponible</span>
                    </div>
                  )}
                  {/* Overlay con gradiente para el fundido con el texto */}
                  <div 
                    className="absolute inset-0"
                    style={{
                      background: `linear-gradient(
                        to right,
                        transparent 0%,
                        transparent 15%,
                        ${getFadeColor(section.bgColor).light} 30%,
                        ${getFadeColor(section.bgColor).medium} 50%,
                        ${getFadeColor(section.bgColor).strong} 70%,
                        ${getFadeColor(section.bgColor).veryStrong} 90%,
                        ${getFadeColor(section.bgColor).solid} 100%
                      )`,
                      border: 'none',
                      outline: 'none',
                      boxShadow: 'none'
                    }}
                  ></div>
                </motion.div>
              </div>

              {/* Panel de texto derecho */}
              <div 
                className={`w-full md:w-1/3 h-1/2 md:h-full bg-gradient-to-b ${section.bgColor} relative flex items-center justify-center p-6 md:p-12`}
                style={{
                  border: 'none',
                  outline: 'none',
                  boxShadow: 'none'
                } as React.CSSProperties}
              >
                <motion.div
                  initial={{ opacity: 0, x: 100 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 1.2, delay: 0.3, ease: "easeOut" }}
                  viewport={{ once: true, margin: "-100px" }}
                  className="text-center max-w-sm"
                >
                  {/* Título principal */}
                  <motion.h2 
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    viewport={{ once: true }}
                    className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-2 ${section.textColor}`}
                  >
                    {section.title}
                  </motion.h2>
                  
                  {/* Subtítulo */}
                  <motion.h3 
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    viewport={{ once: true }}
                    className={`text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-4 md:mb-6 ${section.textColor}`}
                  >
                    {section.subtitle}
                  </motion.h3>

                  {/* Descripción en caja */}
                  <motion.div 
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    viewport={{ once: true }}
                    className={`${section.accentColor} bg-opacity-20 border border-current border-opacity-30 rounded-lg p-3 md:p-4 mb-4 md:mb-6`}
                  >
                    <p className={`text-sm md:text-lg ${section.textColor} font-medium`}>
                      {section.description}
                    </p>
                  </motion.div>

                  {/* Descripción larga */}
                  <motion.p 
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.8 }}
                    viewport={{ once: true }}
                    className={`text-sm md:text-base leading-relaxed ${section.textColor} opacity-90`}
                  >
                    {section.longDescription}
                  </motion.p>

                  {/* Icono de avión de papel */}
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 1 }}
                    viewport={{ once: true }}
                    className="absolute bottom-8 left-8"
                  >
                    <svg 
                      className={`w-8 h-8 ${section.textColor} opacity-60`} 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth={2} 
                        d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" 
                      />
                    </svg>
                  </motion.div>

                  {/* Aviso de privacidad */}
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 1.2 }}
                    viewport={{ once: true }}
                    className="absolute bottom-8 right-8"
                  >
                    <p className={`text-sm ${section.textColor} opacity-70 font-medium`}>
                      AVISO DE PRIVACIDAD
                    </p>
                  </motion.div>
                </motion.div>
              </div>
            </div>
          </motion.section>
        ))}
      </FullPageScroll>
    </div>
  )
} 