import AnimatedElement from '@/components/AnimatedElement'

export default function FooterSection() {
  return (
    <div className="bg-blue-600 text-white py-14 md:py-16">
      <div className="container mx-auto px-4 md:px-8">
        
        {/* Sección principal del footer */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-8 mb-10 md:mb-12">
          
          {/* Logo y eslogan */}
          <div className="md:col-span-2">
            <AnimatedElement animation="fadeInUp" delay={300}>
              <div className="mb-5 md:mb-6">
                <div className="text-2xl md:text-3xl font-bold mb-3 md:mb-4 text-yellow-400">
                  WINSTON
                </div>
                <div className="text-base md:text-lg font-semibold mb-4 md:mb-6">
                  WORKING FOR BRIGHTER FUTURES
                </div>
                <p className="text-blue-100 leading-relaxed max-w-md text-sm md:text-base line-clamp-3 md:line-clamp-none">
                  Formando líderes con visión global desde hace más de 30 años. 
                  Educación integral bilingüe con los más altos estándares académicos.
                </p>
              </div>
            </AnimatedElement>
          </div>

          {/* Información de contacto */}
          <div>
            <AnimatedElement animation="slideInUp" delay={600}>
              <h3 className="text-lg md:text-xl font-bold mb-4 md:mb-6 text-yellow-400">CONTACTO</h3>
              <div className="space-y-3 md:space-y-4 text-sm md:text-base">
                <div className="flex items-start">
                  <div className="text-yellow-400 mr-3 mt-1">📍</div>
                  <div>
                    <div className="font-semibold">Dirección</div>
                    <div className="text-blue-100 text-sm">
                      Calle 3 #509<br />
                      Col. Morelos de Noviembre<br />
                      C.P. MADERO NL.
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <div className="text-yellow-400 mr-3">📞</div>
                  <div>
                    <div className="font-semibold">Teléfono</div>
                    <div className="text-blue-100">+52 (81) 8309</div>
                  </div>
                </div>
              </div>
            </AnimatedElement>
          </div>

          {/* Redes sociales y enlaces */}
          <div>
            <AnimatedElement animation="slideInUp" delay={900}>
              <h3 className="text-lg md:text-xl font-bold mb-4 md:mb-6 text-yellow-400">SÍGUENOS</h3>
              <div className="flex space-x-3 md:space-x-4 mb-5 md:mb-6">
                <a href="#" className="w-9 h-9 md:w-10 md:h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-yellow-400 transition-colors duration-300">
                  <svg className="w-4 h-4 md:w-5 md:h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                  </svg>
                </a>
                <a href="#" className="w-9 h-9 md:w-10 md:h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-yellow-400 transition-colors duration-300">
                  <svg className="w-4 h-4 md:w-5 md:h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z"/>
                  </svg>
                </a>
                <a href="#" className="w-9 h-9 md:w-10 md:h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-yellow-400 transition-colors duration-300">
                  <svg className="w-4 h-4 md:w-5 md:h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24.009c6.624 0 11.99-5.367 11.99-11.986C24.007 5.367 18.641.001.017 0z"/>
                  </svg>
                </a>
                <a href="#" className="w-9 h-9 md:w-10 md:h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-yellow-400 transition-colors duration-300">
                  <svg className="w-4 h-4 md:w-5 md:h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </a>
                <a href="#" className="w-9 h-9 md:w-10 md:h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-yellow-400 transition-colors duration-300">
                  <svg className="w-4 h-4 md:w-5 md:h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>
              </div>
              
              <div className="space-y-2">
                <div className="text-xs md:text-sm">
                  <strong>AVISO DE PRIVACIDAD</strong>
                </div>
                <div className="text-blue-100 text-[11px] md:text-xs">
                  Consulta nuestro aviso de privacidad
                </div>
              </div>
            </AnimatedElement>
          </div>
        </div>

        {/* Línea divisoria */}
        <div className="border-t border-blue-500 mb-6 md:mb-8"></div>

        {/* Información adicional del footer */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 text-center md:text-left">
          <AnimatedElement animation="fadeIn" delay={1200}>
            <div className="text-blue-100 text-xs md:text-sm">
              © 2024 Instituto Winston Churchill. Todos los derechos reservados.
              <br />
              30 años formando líderes con visión global.
            </div>
          </AnimatedElement>
          
          <AnimatedElement animation="fadeIn" delay={1500}>
            <div className="text-right">
              <div className="text-yellow-400 font-semibold text-base md:text-lg mb-1 md:mb-2">
                &ldquo;Working for Brighter Futures&rdquo;
              </div>
              <div className="text-blue-100 text-xs md:text-sm">
                Educación bilingüe • Valores • Excelencia académica
              </div>
            </div>
          </AnimatedElement>
        </div>

      </div>
    </div>
  )
} 