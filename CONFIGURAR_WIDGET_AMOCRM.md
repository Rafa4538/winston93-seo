# 🔧 Configurar el Widget Flotante de AmoCRM

## ⚠️ Problema: El widget no aparece

Si el widget de AmoCRM no se ve en tu sitio, sigue estos pasos:

## 📋 Paso 1: Verificar en la Consola del Navegador

1. Abre tu sitio: `http://localhost:3000`
2. Presiona **F12** para abrir las herramientas de desarrollo
3. Ve a la pestaña **Console**
4. Busca estos mensajes:

```
🔄 Iniciando carga de AmoCRM...
📋 Configuración: { id: "238716", hash: "29c870677...", locale: "es" }
📝 Script agregado al <head>
✅ Script de AmoCRM cargado exitosamente
```

### ✅ Si ves estos mensajes:
El script está cargando correctamente, pero el widget no está configurado en AmoCRM.

### ❌ Si ves errores:
Revisa las credenciales (ID y hash).

## 🌐 Paso 2: Configurar el Widget en AmoCRM

El widget debe estar **habilitado y configurado** en tu panel de AmoCRM:

### Acceder al Panel de AmoCRM:

1. Ve a: **https://www.amocrm.com/** (o tu dominio personalizado)
2. Inicia sesión con tu cuenta
3. Ve a: **Configuración** (⚙️ en la esquina superior derecha)

### Configurar el Widget Social:

1. En el menú lateral, busca: **Configuración → Widgets**
2. Busca: **"Botón Social"** o **"Social Button"**
3. Haz click en **Configurar** o **Instalar**

### Configuración Importante:

#### 1. **Habilitar el Widget**
   - Asegúrate de que esté **activado** ✅

#### 2. **Tipo de Widget**
   - Selecciona: **"Botón flotante"** o **"Floating button"**
   - NO selecciones "Inline" (ese se inserta en un elemento específico)

#### 3. **Posición**
   - Elige dónde quieres que aparezca:
     - Esquina inferior derecha ✅ (recomendado)
     - Esquina inferior izquierda
     - Otros...

#### 4. **Canales de Contacto**
   - Activa los canales que quieres mostrar:
     - ✅ WhatsApp
     - ✅ Facebook Messenger
     - ✅ Email
     - ✅ Teléfono
     - Otros...

#### 5. **Dominio Permitido**
   - **MUY IMPORTANTE:** Agrega tu dominio:
     - Para desarrollo: `localhost:3000` o `localhost`
     - Para producción: `tu-dominio.com`
   
   ⚠️ **Si no agregas el dominio, el widget NO aparecerá**

#### 6. **Obtener Código de Instalación**
   - En la sección de instalación, verás un código similar a:
   ```javascript
   id: "238716"
   hash: "29c870677258fc88d0be09ef388efbacb487dc265acc4ee2e4bb24478ce29784"
   ```
   - Verifica que coincidan con los del script original

## 🔍 Paso 3: Verificar las Credenciales

Las credenciales actuales en tu proyecto son:

```
ID: 238716
Hash: 29c870677258fc88d0be09ef388efbacb487dc265acc4ee2e4bb24478ce29784
```

### Para verificar si son correctas:

1. Ve a tu panel de AmoCRM
2. Configuración → Widgets → Botón Social
3. Ve a la sección "Código de instalación"
4. Compara el `id` y el `hash`

### Si son diferentes:

Actualiza en `/src/components/AmoCRM.tsx`:

```tsx
export default function AmoCRM({ 
  id = "TU_NUEVO_ID",
  hash = "TU_NUEVO_HASH",
  locale = "es"
}: AmoCRMProps)
```

O crea un archivo `.env.local`:

```env
NEXT_PUBLIC_AMOCRM_ID=TU_ID
NEXT_PUBLIC_AMOCRM_HASH=TU_HASH
```

## 🧪 Paso 4: Probar el Widget

### 1. Reiniciar el servidor:
```bash
# Detener el servidor actual (Ctrl+C)
npm run dev
```

### 2. Abrir el navegador:
```
http://localhost:3000
```

### 3. Esperar 2-3 segundos
El widget debería aparecer en la esquina que configuraste.

### 4. Revisar la consola (F12):
Deberías ver:
```
✅ Widget de AmoCRM encontrado: <div>...</div>
```

## ⚠️ Problemas Comunes

### 1. "Widget de AmoCRM no encontrado en el DOM"
**Causa:** El widget no está habilitado o configurado en AmoCRM
**Solución:** Ve al Paso 2 y configura el widget

### 2. "Error al cargar el script de AmoCRM"
**Causa:** Problemas de red o credenciales incorrectas
**Solución:** 
- Verifica tu conexión a internet
- Comprueba las credenciales

### 3. El widget no aparece en mi dominio
**Causa:** El dominio no está en la lista de permitidos
**Solución:** 
- Ve a tu panel de AmoCRM
- Widgets → Botón Social → Configuración
- Agrega tu dominio a la lista blanca

### 4. Las credenciales son correctas pero no aparece
**Causa:** Puede que el widget esté configurado como "inline"
**Solución:**
- Ve a configuración del widget
- Cambia a "Flotante" o "Floating button"
- Guarda los cambios

## 🎨 Personalizar el Widget

Una vez que el widget aparezca, puedes personalizarlo:

### En el Panel de AmoCRM:

1. **Colores:**
   - Color del botón
   - Color del texto
   - Color de hover

2. **Texto:**
   - Mensaje de bienvenida
   - Texto del botón
   - Mensajes automáticos

3. **Comportamiento:**
   - Mostrar automáticamente después de X segundos
   - Mostrar en páginas específicas
   - Horario de disponibilidad

## 🔄 Alternativa: Widget de Prueba

Si quieres probar que todo funciona mientras configuras tu cuenta real, puedes usar este widget de prueba:

```tsx
// En _app.tsx, temporalmente:
<AmoCRM 
  id="238716"
  hash="29c870677258fc88d0be09ef388efbacb487dc265acc4ee2e4bb24478ce29784"
  locale="es"
/>
```

⚠️ Nota: Si estas credenciales no son tuyas, el widget puede no aparecer o no funcionar correctamente.

## 📞 Soporte de AmoCRM

Si sigues teniendo problemas:

1. **Centro de Ayuda:** https://www.amocrm.com/support/
2. **Chat de Soporte:** Disponible en el panel de AmoCRM
3. **Email:** support@amocrm.com

## ✅ Lista de Verificación

Antes de contactar soporte, verifica:

- [ ] El widget está habilitado en el panel de AmoCRM
- [ ] El widget está configurado como "flotante"
- [ ] Tu dominio está en la lista de permitidos
- [ ] Las credenciales (ID y hash) son correctas
- [ ] El script se carga sin errores (revisar consola F12)
- [ ] Has esperado al menos 3-5 segundos después de cargar la página
- [ ] Has probado en modo incógnito (sin extensiones del navegador)

## 🎯 Próximos Pasos

Una vez que el widget aparezca:

1. ✅ Configura los mensajes automáticos
2. ✅ Personaliza los colores según tu marca
3. ✅ Configura las notificaciones
4. ✅ Integra con Google Analytics (ver `GOOGLE_ANALYTICS_SETUP.md`)
5. ✅ Prueba enviar un mensaje de prueba

---

**¿Necesitas más ayuda?** Revisa los logs en la consola del navegador y compártelos para diagnosticar el problema.

