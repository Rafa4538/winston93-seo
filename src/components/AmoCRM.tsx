import { useEffect } from 'react'

// Declaración de tipos para el objeto AmoCRM en window
declare global {
  interface Window {
    amoSocialButton?: ((...args: any[]) => void) & { q?: any[] }
    amo_social_button?: {
      id: string
      hash: string
      locale?: string
      inline?: boolean
      setMeta?: (params: any) => void
      params?: any[]
    }
  }
}

interface AmoCRMProps {
  id?: string
  hash?: string
  locale?: string
}

export default function AmoCRM({ 
  id = "238716",
  hash = "29c870677258fc88d0be09ef388efbacb487dc265acc4ee2e4bb24478ce29784",
  locale = "es"
}: AmoCRMProps) {
  
  useEffect(() => {
    // Solo ejecutar en el cliente
    if (typeof window === 'undefined') return

    // Verificar si ya está cargado
    if (document.getElementById('amo_social_button_script')) {
      console.log('✅ AmoCRM ya está cargado')
      return
    }

    console.log('🔄 Iniciando carga de AmoCRM...')
    console.log('📋 Configuración:', { id, hash: hash.substring(0, 10) + '...', locale })

    // PASO 1: Configurar el objeto AmoCRM PRIMERO (antes del script)
    window.amo_social_button = {
      id: id,
      hash: hash,
      locale: locale,
      inline: false, // Importante: false para que sea flotante
      setMeta: function(p) {
        this.params = (this.params || []).concat([p])
      },
      params: []
    }

    // PASO 2: Función para inicializar amoSocialButton
    window.amoSocialButton = function(...args: any[]) {
      (window.amoSocialButton!.q = window.amoSocialButton!.q || []).push(args)
    } as any
    window.amoSocialButton.q = []

    console.log('✅ Objeto amo_social_button configurado:', window.amo_social_button)
    console.log('✅ Función amoSocialButton inicializada')

    // PASO 3: AHORA crear y cargar el script (después de configurar todo)
    const script = document.createElement('script')
    script.async = true
    script.id = 'amo_social_button_script'
    script.src = 'https://gso.amocrm.com/js/button.js?1658160430'
    
    // Evento cuando se carga exitosamente
    script.onload = () => {
      console.log('✅ Script de AmoCRM cargado exitosamente')
      console.log('📦 Objeto amo_social_button:', window.amo_social_button)
      
      // Verificar después de 2 segundos si el widget apareció
      setTimeout(() => {
        const widget = document.querySelector('[id*="amo"], [class*="amo"]')
        if (widget) {
          console.log('✅ Widget de AmoCRM encontrado:', widget)
          
          // Forzar estilos para que sea visible
          const applyForceStyles = (element: Element) => {
            if (element instanceof HTMLElement) {
              element.style.setProperty('z-index', '999999', 'important')
              element.style.setProperty('position', 'fixed', 'important')
              element.style.setProperty('visibility', 'visible', 'important')
              element.style.setProperty('opacity', '1', 'important')
              element.style.setProperty('display', 'block', 'important')
              element.style.setProperty('pointer-events', 'auto', 'important')
            }
          }
          
          // Aplicar estilos al elemento encontrado
          applyForceStyles(widget)
          
          // Buscar y aplicar a todos los elementos relacionados con AmoCRM
          const amoElements = document.querySelectorAll('[class*="amo"], [id*="amo"], .amo-button-holder, .amo-widget-container')
          amoElements.forEach(el => {
            applyForceStyles(el)
            console.log('🎨 Estilos forzados aplicados a:', el.className || el.id)
          })
          
          console.log('✅ Estilos de visibilidad forzados aplicados')
        } else {
          console.warn('⚠️ Widget de AmoCRM no encontrado en el DOM')
          console.warn('💡 Verifica que el widget esté habilitado en tu panel de AmoCRM')
          console.warn('💡 URL del panel: https://www.amocrm.com/')
        }
      }, 2000)
      
      // Segunda verificación más agresiva a los 4 segundos
      setTimeout(() => {
        const amoElements = document.querySelectorAll('[class*="amo"], [id*="amo"]')
        if (amoElements.length > 0) {
          console.log(`🔍 Encontrados ${amoElements.length} elementos de AmoCRM, forzando visibilidad...`)
          amoElements.forEach(el => {
            if (el instanceof HTMLElement) {
              el.style.setProperty('z-index', '999999', 'important')
              el.style.setProperty('position', 'fixed', 'important')
              el.style.setProperty('visibility', 'visible', 'important')
              el.style.setProperty('opacity', '1', 'important')
              el.style.setProperty('display', 'block', 'important')
            }
          })
          console.log('✅ Segunda aplicación de estilos completada')
        }
      }, 4000)
    }

    // Evento de error
    script.onerror = (error) => {
      console.error('❌ Error al cargar el script de AmoCRM:', error)
      console.error('🔍 Verifica tu conexión a internet y las credenciales')
    }
    
    // Agregar el script al head
    if (document.head) {
      document.head.appendChild(script)
      console.log('📝 Script agregado al <head>')
    }

    // Observer para mantener los estilos aplicados constantemente
    const observer = new MutationObserver(() => {
      const amoElements = document.querySelectorAll('[class*="amo"], [id*="amo"]')
      amoElements.forEach(el => {
        if (el instanceof HTMLElement) {
          const currentZIndex = window.getComputedStyle(el).zIndex
          if (currentZIndex !== '999999') {
            el.style.setProperty('z-index', '999999', 'important')
            el.style.setProperty('visibility', 'visible', 'important')
            el.style.setProperty('opacity', '1', 'important')
          }
        }
      })
    })

    // Observar cambios en el DOM
    observer.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['style', 'class']
    })

    // Cleanup: remover el script y observer cuando el componente se desmonte
    return () => {
      observer.disconnect()
      const existingScript = document.getElementById('amo_social_button_script')
      if (existingScript && existingScript.parentNode) {
        existingScript.parentNode.removeChild(existingScript)
        console.log('🗑️ Script de AmoCRM removido')
      }
    }
  }, [id, hash, locale])

  // Este componente no renderiza nada visible
  return null
}

