# Grupo A Cobijo • PWA estática (GitHub Pages)

App web progresiva (instalable) y gratuita para publicar en GitHub Pages.

## Cómo publicar (5 pasos)

1. Crea un repositorio público en GitHub. Ejemplo: `acobijo-app`.
2. Sube **todos los archivos** de esta carpeta a la raíz del repositorio.
3. En **Settings → Pages**:
   - *Build and deployment*: **Deploy from a branch**
   - *Branch*: **main** y **/root**
   - Guarda.
4. Espera a que GitHub construya la página (icono amarillo → verde). La URL será:
   `https://TU_USUARIO.github.io/NOMBRE_DEL_REPO/`
5. Abre la URL desde el móvil en Chrome/Edge (Android) o Safari (iOS) y **añade a pantalla de inicio**.

## Personaliza
- Edita los teléfonos `tel:+34942XXXXXX` con los reales.
- Cambia los textos de cada camping y los enlaces a Web/Maps.
- Sustituye los iconos en `assets/icons/` por tu logotipo si quieres.

## Notas técnicas
- PWA con `manifest.webmanifest` + `service-worker.js` (cache-first).
- Funciona sin conexión para la pantalla principal.
- No requiere frameworks ni backend.
