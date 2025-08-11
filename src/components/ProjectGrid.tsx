interface Project {
  id: number
  title: string
  client: string
  description: string
  image: string
  category: string
}

const projects: Project[] = [
  {
    id: 1,
    title: "E-commerce Revolution",
    client: "TechCorp",
    description: "Una plataforma de comercio electrónico que transformó la experiencia de compra digital",
    image: "/api/placeholder/400/300",
    category: "Web Development"
  },
  {
    id: 2,
    title: "Brand Identity",
    client: "StartupXYZ",
    description: "Identidad visual completa para una startup tecnológica emergente",
    image: "/api/placeholder/400/300",
    category: "Branding"
  },
  {
    id: 3,
    title: "Mobile App Design",
    client: "HealthTech",
    description: "Aplicación móvil para el seguimiento de salud y bienestar",
    image: "/api/placeholder/400/300",
    category: "Mobile"
  },
  {
    id: 4,
    title: "Digital Campaign",
    client: "Fashion Brand",
    description: "Campaña digital integrada que aumentó las ventas en un 300%",
    image: "/api/placeholder/400/300",
    category: "Marketing"
  },
  {
    id: 5,
    title: "Web Platform",
    client: "FinTech",
    description: "Plataforma web segura para transacciones financieras",
    image: "/api/placeholder/400/300",
    category: "Web Development"
  },
  {
    id: 6,
    title: "AR Experience",
    client: "Retail Giant",
    description: "Experiencia de realidad aumentada para probadores virtuales",
    image: "/api/placeholder/400/300",
    category: "AR/VR"
  }
]

export default function ProjectGrid() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Nuestro <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Trabajo</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Proyectos que combinan creatividad, tecnología y estrategia para generar resultados excepcionales
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <div
              key={project.id}
              className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2"
            >
              {/* Image Container */}
              <div className="relative h-64 bg-gradient-to-br from-blue-400 to-purple-600 overflow-hidden">
                <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-15 transition-opacity duration-300"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-20 h-20 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                    <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  </div>
                </div>
                
                {/* Category Badge */}
                <div className="absolute top-4 left-4">
                  <span className="bg-white bg-opacity-90 text-gray-800 px-3 py-1 rounded-full text-sm font-medium">
                    {project.category}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="mb-2">
                  <span className="text-sm text-blue-600 font-medium">{project.client}</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                  {project.title}
                </h3>
                <p className="text-gray-600 mb-4 leading-relaxed">
                  {project.description}
                </p>
                
                <button className="flex items-center text-blue-600 font-medium hover:text-blue-700 transition-colors group">
                  Ver Caso de Estudio
                  <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-4 px-8 rounded-full transition-all duration-300 transform hover:scale-105 hover:shadow-xl">
            Ver Todos los Proyectos
          </button>
        </div>
      </div>
    </section>
  )
} 