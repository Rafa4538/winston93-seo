# Configuración de Google Analytics con AmoCRM

## 📊 Integrar Google Analytics 4 (GA4) en Next.js

Si aún no tienes Google Analytics configurado, aquí está la guía completa.

## 🔧 Paso 1: Obtener tu ID de Google Analytics

1. Ve a [Google Analytics](https://analytics.google.com/)
2. Crea una propiedad GA4 si no tienes una
3. Copia tu ID de medición (formato: `G-XXXXXXXXXX`)

## 📝 Paso 2: Crear el Componente de Google Analytics

Crea el archivo `/src/components/GoogleAnalytics.tsx`:

```tsx
import Script from 'next/script'

interface GoogleAnalyticsProps {
  measurementId: string
}

export default function GoogleAnalytics({ measurementId }: GoogleAnalyticsProps) {
  return (
    <>
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`}
      />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: \`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${measurementId}', {
              page_path: window.location.pathname,
            });
          \`,
        }}
      />
    </>
  )
}
```

## 🔄 Paso 3: Integrar en _app.tsx

Modifica tu `/src/pages/_app.tsx`:

```tsx
import GoogleAnalytics from '@/components/GoogleAnalytics'
import AmoCRM from '@/components/AmoCRM'
// ... otros imports

export default function App({ Component, pageProps }: AppProps) {
  // ... tu código existente

  return (
    <>
      {/* Google Analytics */}
      <GoogleAnalytics measurementId="G-XXXXXXXXXX" />
      
      {/* AmoCRM con métricas */}
      <AmoCRM />
      
      <AnimatePresence mode="wait">
        {/* ... resto de tu código */}
      </AnimatePresence>
    </>
  )
}
```

## 🎯 Paso 4: Rastrear Cambios de Página

Next.js necesita código adicional para rastrear navegación:

```tsx
// En _app.tsx
import { useEffect } from 'react'
import { useRouter } from 'next/router'

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter()

  useEffect(() => {
    const handleRouteChange = (url: string) => {
      if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('config', 'G-XXXXXXXXXX', {
          page_path: url,
        })
      }
    }

    router.events.on('routeChangeComplete', handleRouteChange)
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [router.events])

  // ... resto del código
}
```

## 📈 Paso 5: Usar AmoCRM con Analytics

### Opción A: Usar AmoCRM básico (Ya implementado)
```tsx
<AmoCRM />
```

### Opción B: Usar AmoCRM con Analytics avanzado

Reemplaza en `_app.tsx`:

```tsx
import AmoCRMWithAnalytics from '@/components/AmoCRMWithAnalytics'

// Dentro del componente:
<AmoCRMWithAnalytics trackEvents={true} />
```

## 🎯 Eventos que se Rastrean Automáticamente

Con `AmoCRMWithAnalytics`:
- ✅ Carga del widget de AmoCRM
- ✅ Errores de carga
- ✅ Interacciones con el widget
- ✅ Clicks en elementos del CRM

## 📊 Ver Métricas en Google Analytics

1. Ve a tu panel de Google Analytics
2. **Informes → Interacción → Eventos**
3. Busca estos eventos:
   - `widget_loaded` - Cuando se carga AmoCRM
   - `widget_error` - Si hay errores
   - `widget_clicked` - Cuando interactúan con el widget
   - `chat_opened`, `message_sent`, `chat_closed` - Eventos personalizados

## 🔍 Verificar que Funciona

### En la Consola del Navegador:
```javascript
// Verificar que gtag está disponible
console.log(window.gtag)

// Verificar dataLayer
console.log(window.dataLayer)

// Enviar evento de prueba
gtag('event', 'test_event', {
  event_category: 'Test',
  event_label: 'Testing Analytics'
})
```

### En Google Analytics (Real-Time):
1. Ve a **Informes → Tiempo real**
2. Navega por tu sitio
3. Deberías ver las visitas en tiempo real

## 🎨 Eventos Personalizados de AmoCRM

Puedes rastrear eventos específicos importando las funciones:

```tsx
import { 
  trackChatOpen, 
  trackMessageSent, 
  trackCustomCRMEvent 
} from '@/components/AmoCRMWithAnalytics'

// En cualquier componente:
const handleContactClick = () => {
  trackChatOpen()
  // ... tu lógica
}

const handleFormSubmit = () => {
  trackCustomCRMEvent('form_submitted', {
    form_type: 'contact',
    event_label: 'Contact Form'
  })
}
```

## 🔐 Variables de Entorno (Recomendado)

Para mayor seguridad, usa variables de entorno:

### 1. Crea `.env.local`:
```bash
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
NEXT_PUBLIC_AMOCRM_ID=238716
NEXT_PUBLIC_AMOCRM_HASH=29c870677258fc88d0be09ef388efbacb487dc265acc4ee2e4bb24478ce29784
```

### 2. Úsalas en tus componentes:
```tsx
<GoogleAnalytics 
  measurementId={process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID!} 
/>

<AmoCRM
  id={process.env.NEXT_PUBLIC_AMOCRM_ID}
  hash={process.env.NEXT_PUBLIC_AMOCRM_HASH}
/>
```

## 📱 Rastrear Conversiones

Para rastrear cuando alguien contacta vía AmoCRM:

```tsx
// Después de que el usuario envía un mensaje
if (typeof window !== 'undefined' && window.gtag) {
  window.gtag('event', 'conversion', {
    send_to: 'G-XXXXXXXXXX/conversion_id',
    value: 1.0,
    currency: 'MXN'
  })
}
```

## 🎯 Eventos Recomendados para Educación

```tsx
// Cuando alguien ve la página de Primaria
window.gtag('event', 'page_view', {
  page_title: 'Primaria',
  page_location: window.location.href,
  page_path: '/primaria'
})

// Cuando alguien hace click en "Solicitar información"
window.gtag('event', 'generate_lead', {
  event_category: 'Education',
  event_label: 'Primaria Interest'
})

// Cuando completan un formulario
window.gtag('event', 'form_submit', {
  event_category: 'Engagement',
  event_label: 'Contact Form',
  form_type: 'contact'
})
```

## 🚀 Próximos Pasos

1. ✅ Implementa Google Analytics usando la guía anterior
2. ✅ Verifica que AmoCRM está funcionando
3. ✅ Configura eventos personalizados según tus necesidades
4. ✅ Revisa las métricas en GA después de 24-48 horas
5. ✅ Configura alertas y objetivos en Google Analytics

## 🔗 Recursos Útiles

- [Google Analytics 4 Documentation](https://support.google.com/analytics/answer/9304153)
- [Next.js Analytics](https://nextjs.org/docs/basic-features/analytics)
- [AmoCRM API](https://www.amocrm.com/developers/)
- [GTM Data Layer](https://developers.google.com/tag-manager/devguide)

