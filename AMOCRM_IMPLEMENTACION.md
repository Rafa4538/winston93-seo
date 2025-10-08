# Implementación de AmoCRM en Next.js con TypeScript

## 📋 Descripción

Se ha implementado el script de AmoCRM en el proyecto Next.js con TypeScript para habilitar:
- 🎯 Métricas y seguimiento con Google Analytics
- 💬 Contacto directo con usuarios
- 📊 Widget de chat/comunicación de AmoCRM

## 🔧 Archivos Creados/Modificados

### 1. `/src/components/AmoCRM.tsx`
Componente React que gestiona la carga e inicialización del script de AmoCRM de forma segura.

**Características:**
- ✅ Carga asíncrona del script
- ✅ Verificación de carga duplicada
- ✅ Tipos de TypeScript correctamente declarados
- ✅ Limpieza automática al desmontar
- ✅ Soporte SSR (Server-Side Rendering)

### 2. `/src/pages/_app.tsx`
Se agregó el componente AmoCRM para que esté disponible en todas las páginas.

## 🚀 Uso

### Implementación Básica (Ya configurado)
El componente está implementado en `_app.tsx` con la configuración por defecto:

```tsx
<AmoCRM />
```

### Configuración Personalizada
Si necesitas cambiar los parámetros de AmoCRM:

```tsx
<AmoCRM 
  id="238716"
  hash="29c870677258fc88d0be09ef388efbacb487dc265acc4ee2e4bb24478ce29784"
  locale="es"
/>
```

### Parámetros Disponibles

| Parámetro | Tipo   | Por Defecto | Descripción |
|-----------|--------|-------------|-------------|
| `id`      | string | `"238716"`  | ID de tu cuenta AmoCRM |
| `hash`    | string | `"29c870..."`| Hash de autenticación |
| `locale`  | string | `"es"`      | Idioma del widget (es, en, ru, etc.) |

## 🔍 Cómo Funciona

1. **Detección del Entorno**: Verifica que está en el navegador (no en servidor)
2. **Prevención de Duplicados**: Verifica si el script ya está cargado
3. **Configuración Global**: Crea el objeto `window.amo_social_button` con tus credenciales
4. **Carga del Script**: Inyecta el script de AmoCRM de forma asíncrona
5. **Limpieza**: Remueve el script cuando el componente se desmonta

## 📱 Widget Visible

Una vez implementado, AmoCRM debería cargar automáticamente un widget en tu sitio web. Este puede aparecer como:
- Botón flotante de chat
- Formulario de contacto
- Widget de redes sociales

## 🛠️ Integración con Google Analytics

Para rastrear eventos de AmoCRM en Google Analytics, puedes modificar el componente:

```tsx
// En AmoCRM.tsx, después de cargar el script:
script.onload = () => {
  // Notificar a Google Analytics
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', 'amocrm_loaded', {
      event_category: 'CRM',
      event_label: 'AmoCRM Widget Loaded'
    })
  }
}
```

## 🎨 Personalización del Widget

Para personalizar la apariencia del widget de AmoCRM, visita tu panel de AmoCRM:
1. Ve a Configuración → Widgets → Botón Social
2. Personaliza colores, posición y comportamiento
3. Los cambios se aplicarán automáticamente

## 🧪 Verificación

Para verificar que AmoCRM está funcionando:

1. **Consola del Navegador:**
```javascript
console.log(window.amo_social_button)
console.log(window.amoSocialButton)
```

2. **Inspeccionar Script:**
Busca en el `<head>` del HTML el script con id `amo_social_button_script`

3. **Red del Navegador:**
Verifica que se carga correctamente: `https://gso.amocrm.com/js/button.js`

## ⚠️ Notas Importantes

- ✅ El componente solo se ejecuta en el cliente (no en SSR)
- ✅ Se previene la carga duplicada del script
- ✅ Compatible con todas las páginas de Next.js
- ✅ No afecta el rendimiento inicial de la página (carga asíncrona)
- ⚠️ Requiere conexión a internet para cargar el script externo

## 🐛 Solución de Problemas

### El widget no aparece
1. Verifica la consola del navegador en busca de errores
2. Confirma que el `id` y `hash` son correctos
3. Revisa la configuración en tu panel de AmoCRM

### Error de TypeScript
Si ves errores de tipos, asegúrate de que la declaración global esté presente en `AmoCRM.tsx`

### Conflictos con otros scripts
Si tienes otros scripts de chat/CRM, pueden causar conflictos. Considera:
- Deshabilitar temporalmente otros widgets
- Ajustar la configuración de z-index en CSS

## 📚 Recursos

- [Documentación de AmoCRM](https://www.amocrm.com/support/)
- [Next.js Script Component](https://nextjs.org/docs/api-reference/next/script)
- [TypeScript Window Types](https://www.typescriptlang.org/docs/handbook/declaration-files/templates/global-modifying-module-d-ts.html)

## 🔄 Actualización de Credenciales

Si necesitas cambiar las credenciales en el futuro, edita las props por defecto en `/src/components/AmoCRM.tsx`:

```tsx
export default function AmoCRM({ 
  id = "TU_NUEVO_ID",
  hash = "TU_NUEVO_HASH",
  locale = "es"
}: AmoCRMProps) {
  // ...
}
```

O pásalas como props en `_app.tsx`:

```tsx
<AmoCRM 
  id="TU_NUEVO_ID"
  hash="TU_NUEVO_HASH"
/>
```

