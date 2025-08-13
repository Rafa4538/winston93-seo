import Head from 'next/head'
import { useState } from 'react'
import Navigation from '@/components/Navigation'
import FullPageScroll from '@/components/FullPageScroll'
import HeroSection from '@/components/sections/HeroSection'
import SliderSection from '@/components/sections/ProjectsSection'
import EducationalOfferSection from '@/components/sections/ServicesSection'
import ConveniosSection from '@/components/sections/ConveniosSection'
import OfertaEducativaSection from '@/components/sections/OfertaEducativaSection'


export default function Home() {
  const [currentSection, setCurrentSection] = useState(0)

  const handleSectionChange = (sectionIndex: number) => {
    setCurrentSection(sectionIndex)
  }

  return (
    <>
      <Head>
        <title>Instituto Winston Churchill - Working for a Brighter Future</title>
        <meta name="description" content="Instituto educativo con 30 años de experiencia. Educación bilingüe integral: Kínder, Primaria y Secundaria. Respaldados por Oxford University Press y University of Cambridge." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="keywords" content="instituto, educación, bilingüe, kínder, primaria, secundaria, Winston Churchill, Oxford, Cambridge" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Navigation que recibe la sección actual */}
      <Navigation currentSection={currentSection} />

      <FullPageScroll onSectionChange={handleSectionChange}>
        <HeroSection />
        <SliderSection />
        <EducationalOfferSection />
        <ConveniosSection />
        <OfertaEducativaSection />
      </FullPageScroll>
      

    </>
  )
} 