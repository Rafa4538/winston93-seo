import Head from 'next/head'
import Navigation from '@/components/Navigation'

export default function ServiciosEnLinea() {
  const servicios = [
    {
      id: 'alta-de-facturacion',
      nombre: 'ALTA DE FACTURACIÓN',
      icono: '/images/servicios/alta.png',
      destacado: false
    },
    {
      id: 'colegiaturas',
      nombre: 'COLEGIATURAS',
      icono: '/images/servicios/colegiaturas.png',
      destacado: false
    },
    {
      id: 'inscripciones',
      nombre: 'INSCRIPCIONES',
      icono: '/images/servicios/usuario.png',
      destacado: false
    },
    {
      id: 'tareas-en-linea',
      nombre: 'TAREAS EN LÍNEA',
      icono: '/images/servicios/tareas.png',
      destacado: false
    },
    {
      id: 'servicios-internos',
      nombre: 'SERVICIOS INTERNOS',
      icono: '/images/servicios/servicios_internos.png',
      destacado: false
    },
    {
      id: 'registro-para-examen',
      nombre: 'REGISTRO PARA EXAMEN',
      icono: '/images/servicios/registro.png',
      destacado: false
    }
  ]

  return (
    <div className="servicios-en-linea-page">
      <Head>
        <title>Servicios en Línea - Instituto Winston Churchill</title>
        <meta name="description" content="Accede a nuestros servicios en línea: colegiaturas, inscripciones, tareas y más." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <style jsx global>{`
          .service-icon {
            filter: grayscale(100%) opacity(60%);
            transition: all 0.3s ease;
          }
          .group:hover .service-icon {
            filter: grayscale(0%) brightness(0) invert(1) !important;
            opacity: 1 !important;
          }
          /* Estilo más específico para asegurar que funcione */
          .service-card:hover .service-icon {
            filter: grayscale(0%) brightness(0) invert(1) !important;
            opacity: 1 !important;
          }
        `}</style>
      </Head>

      {/* Header con navegación */}
      <Navigation currentSection={1} />

      {/* Contenido principal */}
      <div className="min-h-screen bg-white">
        {/* Título de la página */}
        <div className="container mx-auto px-4 py-16">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-700 uppercase tracking-wide mb-4">
              Servicios en Línea
            </h1>
            <div className="w-32 h-0.5 bg-gray-400 mx-auto"></div>
          </div>

          {/* Grid de servicios */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {servicios.map((servicio) => (
              <div
                key={servicio.id}
                className="flex flex-col items-center p-8 transition-all duration-300 hover:scale-105 hover:bg-blue-600 hover:shadow-lg rounded-lg cursor-pointer group service-card"
                onMouseEnter={(e) => {
                  const icon = e.currentTarget.querySelector('.service-icon') as HTMLImageElement;
                  if (icon) {
                    icon.style.filter = 'grayscale(0%) brightness(0) invert(1)';
                    icon.style.opacity = '1';
                  }
                }}
                onMouseLeave={(e) => {
                  const icon = e.currentTarget.querySelector('.service-icon') as HTMLImageElement;
                  if (icon) {
                    icon.style.filter = 'grayscale(100%) opacity(60%)';
                    icon.style.opacity = '0.6';
                  }
                }}
              >
                <div className="mb-6 p-6 rounded-lg bg-gray-100 group-hover:bg-blue-600 transition-colors duration-300">
                  <img
                    src={servicio.icono}
                    alt={servicio.nombre}
                    className="w-20 h-20 object-contain service-icon"
                    style={{
                      filter: 'grayscale(100%) opacity(60%)',
                      transition: 'all 0.3s ease'
                    }}
                  />
                </div>
                <h3 className="text-center font-semibold uppercase tracking-wide text-base text-gray-700 group-hover:text-white transition-colors duration-300">
                  {servicio.nombre}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
} 