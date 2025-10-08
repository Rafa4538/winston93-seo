# ✅ Lista de Verificación - AmoCRM Widget Flotante

## 🎯 Resumen de los Cambios Realizados

1. ✅ Componente AmoCRM creado e integrado
2. ✅ Estilos CSS específicos para el widget (z-index: 99999)
3. ✅ Debugging avanzado en consola
4. ✅ Aplicación automática de estilos via JavaScript

## 🔍 Paso a Paso para Verificar

### 1️⃣ **Abrir el Proyecto**

```bash
npm run dev
```

Abre tu navegador en: `http://localhost:3000`

---

### 2️⃣ **Abrir la Consola del Navegador**

Presiona **F12** → Pestaña **Console**

**Deberías ver estos mensajes:**

```
🔄 Iniciando carga de AmoCRM...
📋 Configuración: { id: "238716", hash: "29c870677...", locale: "es" }
📝 Script agregado al <head>
✅ Script de AmoCRM cargado exitosamente
```

**Después de 2 segundos:**

#### ✅ **Caso A: Widget Funcionando**
```
✅ Widget de AmoCRM encontrado: <div class="amo-button-holder">...</div>
🎨 Estilos de z-index aplicados al widget
🎨 Estilos aplicados al contenedor del widget
```
**¡Perfecto! El widget debería ser visible en tu sitio.**

#### ⚠️ **Caso B: Widget NO Encontrado**
```
⚠️ Widget de AmoCRM no encontrado en el DOM
💡 Verifica que el widget esté habilitado en tu panel de AmoCRM
💡 URL del panel: https://www.amocrm.com/
📋 Pasos a seguir:
   1. Ve a tu panel de AmoCRM
   2. Configuración → Widgets → Botón Social
   3. Habilita el widget como "Flotante"
   4. Agrega "localhost:3000" a dominios permitidos
```
**Significa que el script carga bien, pero el widget no está configurado en AmoCRM.**

---

### 3️⃣ **Inspeccionar el DOM**

En la consola, escribe:

```javascript
// Ver el objeto de configuración
console.log(window.amo_social_button)

// Buscar el widget en el DOM
console.log(document.querySelector('[class*="amo"]'))

// Ver todos los elementos de AmoCRM
document.querySelectorAll('[class*="amo"]').forEach(el => console.log(el))
```

---

## 🎨 Estilos Aplicados

El widget ahora tiene estos estilos CSS:

```css
.amo-button-holder.amo-horisontal {
  position: fixed !important;
  z-index: 99999 !important;  /* MUY ALTO - por encima de todo */
  right: 10px !important;
  bottom: 210px !important;    /* En desktop */
  padding: 10px !important;
}

/* En móvil: */
@media (max-width: 768px) {
  .amo-button-holder.amo-horisontal {
    bottom: 20px !important;
  }
}
```

**Además**, el JavaScript aplica estilos inline como backup.

---

## 🚨 Si el Widget NO Aparece

### Problema 1: Script Carga pero Widget No Aparece

**Síntomas:**
- ✅ Ves `✅ Script de AmoCRM cargado exitosamente`
- ⚠️ Ves `⚠️ Widget de AmoCRM no encontrado en el DOM`

**Solución:**
El widget **NO está configurado en tu panel de AmoCRM**. Necesitas:

1. **Ir a tu panel de AmoCRM:**
   - URL: https://www.amocrm.com/ (o tu dominio)
   - Iniciar sesión

2. **Configurar el Widget:**
   - Ve a: **Configuración** (⚙️)
   - **Widgets** → **Botón Social**
   - Haz click en **Instalar** o **Configurar**

3. **Configuración del Widget:**
   - ✅ **Habilitar** el widget
   - ✅ Tipo: **"Flotante"** o **"Floating button"** (NO "Inline")
   - ✅ Posición: Esquina inferior derecha
   - ✅ **Dominios permitidos**: Agrega `localhost:3000` y `localhost`

4. **Verificar Credenciales:**
   - En el panel, busca el **código de instalación**
   - Verifica que `id` y `hash` coincidan con:
     ```
     id: "238716"
     hash: "29c870677258fc88d0be09ef388efbacb487dc265acc4ee2e4bb24478ce29784"
     ```

5. **Guardar y Activar:**
   - Guarda los cambios
   - Activa/habilita el widget
   - Puede tomar 1-2 minutos en aplicarse

---

### Problema 2: Error al Cargar el Script

**Síntomas:**
```
❌ Error al cargar el script de AmoCRM
```

**Solución:**
- Verifica tu conexión a internet
- Verifica que `https://gso.amocrm.com/js/button.js` sea accesible
- Revisa que las credenciales sean correctas

---

### Problema 3: Widget Tapado por Otros Elementos

**Síntomas:**
- Widget encontrado en el DOM
- Pero no se ve visualmente

**Solución:**
Ya está resuelto con `z-index: 99999`, pero puedes verificar:

```javascript
// En la consola del navegador:
const holder = document.querySelector('.amo-button-holder')
if (holder) {
  console.log('Z-index actual:', window.getComputedStyle(holder).zIndex)
  console.log('Posición:', window.getComputedStyle(holder).position)
  console.log('Visibilidad:', window.getComputedStyle(holder).visibility)
  console.log('Opacity:', window.getComputedStyle(holder).opacity)
}
```

---

## 🎯 Checklist Final

Antes de pedir ayuda, verifica:

- [ ] El servidor está corriendo (`npm run dev`)
- [ ] La consola muestra: `✅ Script de AmoCRM cargado exitosamente`
- [ ] Tienes acceso a tu panel de AmoCRM
- [ ] El widget está **habilitado** en el panel
- [ ] El widget está configurado como **"Flotante"**
- [ ] Tu dominio (`localhost:3000`) está en la lista de permitidos
- [ ] Las credenciales (id y hash) son correctas
- [ ] Has esperado al menos 5 segundos después de cargar la página
- [ ] Has probado en modo incógnito (sin extensiones)
- [ ] Has limpiado la caché del navegador (Ctrl+Shift+R)

---

## 📞 Información de Depuración

Si necesitas ayuda, comparte esta información:

1. **Mensajes de la consola:** (copia todo lo que aparece)
2. **Resultado de:**
   ```javascript
   console.log(window.amo_social_button)
   console.log(document.querySelector('[class*="amo"]'))
   ```
3. **¿Tienes acceso al panel de AmoCRM?** (Sí/No)
4. **¿El widget está habilitado en el panel?** (Sí/No/No sé)
5. **URL de tu sitio:** (ej: `localhost:3000`)

---

## ✨ Cuando Funcione

Una vez que el widget aparezca:

1. **Personaliza el widget** en tu panel de AmoCRM:
   - Colores según tu marca (verde, azul Winston)
   - Mensaje de bienvenida
   - Canales de contacto (WhatsApp, etc.)

2. **Configura respuestas automáticas**

3. **Integra con Google Analytics** (ver `GOOGLE_ANALYTICS_SETUP.md`)

4. **Prueba enviándote un mensaje de prueba**

---

## 🔄 Comandos Útiles

```bash
# Reiniciar el servidor
npm run dev

# Limpiar caché de Next.js
rm -rf .next

# Verificar TypeScript
npx tsc --noEmit

# Ver logs en tiempo real
npm run dev | grep "amo"
```

---

**¡Éxito!** 🎉 Si sigues viendo problemas, revisa `CONFIGURAR_WIDGET_AMOCRM.md` para más detalles.
