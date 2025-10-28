# App PWA · Grupo A Cobijo

Esta es una app web instalable (PWA) y gratuita para Grupo A Cobijo.
Se puede publicar en GitHub Pages, Netlify o Cloudflare Pages sin coste.

## Archivos principales
- `index.html`: página inicial con accesos rápidos a cada camping.
- `data/sites.json`: edita aquí teléfonos, WhatsApp, webs y enlaces de reserva.
- `styles.css`: estilos.
- `app.js`: lógica de UI y registro del Service Worker.
- `service-worker.js`: cache offline e instalación.
- `manifest.webmanifest`: metadatos de la app (iconos, colores, nombre).
- `assets/icon-192.png` y `assets/icon-512.png`: iconos de la app.

## Publicar gratis en GitHub Pages
1. Crea un repositorio nuevo en GitHub llamado `acobijo-app`.
2. Sube todo el contenido de esta carpeta (no la carpeta en sí, sino sus archivos y subcarpetas).
3. En GitHub, ve a **Settings → Pages** y elige **Deploy from a branch**. Selecciona la rama principal y carpeta raíz `/`.
4. Espera a que aparezca la URL. Accede a ella desde el móvil.
5. En Android/Chrome verás la opción **Instalar app**. En iPhone/Safari usa **Compartir → Añadir a pantalla de inicio**.

## Dominio propio (opcional)
- En **Settings → Pages**, añade tu dominio (por ejemplo, `app.grupoacobijo.com`) y sigue las instrucciones para el registro DNS (CNAME).
- Asegúrate de tener HTTPS activo (GitHub Pages lo gestiona automáticamente).

## Modificar datos
- Edita `data/sites.json` con los teléfonos, WhatsApp, webs y reservas reales. Los formatos `tel:` y `https://wa.me/` funcionan con números sin espacios.
- Cambia textos de la portada editando `index.html`.

## Notas
- Para publicar en tiendas (App Store / Google Play) se necesitan cuentas de desarrollador de pago. Con PWA evitamos ese coste.
- Las reservas y mapas requieren conexión. La app funciona sin conexión para la información básica.

¡Listo!