import Image from 'next/image'

const LoadingScreen = () => {
  return (
    <div className="fixed inset-0 bg-gradient-to-b from-blue-900 to-blue-800 z-50 flex items-center justify-center">
      <div className="text-center">
        <div className="mb-8">
          <Image
            src="/images/logos/logo_winston.png"
            alt="Instituto Winston Churchill"
            width={112}
            height={112}
            className="h-28 w-auto mx-auto drop-shadow-lg"
          />
        </div>
        
        <h1 className="text-white text-xl font-bold mb-2 tracking-wide">
          INSTITUTO WINSTON CHURCHILL
        </h1>
        
        <p className="text-blue-200 text-sm font-medium mb-8">
          Working for a Brighter Future
        </p>
        
        <div className="w-48 mx-auto mb-8">
          <div className="bg-white bg-opacity-20 rounded-full h-1 overflow-hidden">
            <div className="h-full bg-yellow-400 rounded-full animate-pulse" />
          </div>
        </div>
        
        <div className="flex justify-center space-x-2 mb-6">
          <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse" />
          <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }} />
          <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }} />
        </div>
        
        <p className="text-white text-sm font-medium">
          Cargando contenido...
        </p>
      </div>
    </div>
  )
}

export default LoadingScreen 