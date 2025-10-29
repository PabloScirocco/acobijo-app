
Cómo integrar el splash screen (iOS + Android)

1) Sube esta carpeta completa al repositorio en:
   /assets/splash/

2) Añade en <head> del index.html estas etiquetas (iOS):
   <meta name="apple-mobile-web-app-capable" content="yes">
   <meta name="apple-mobile-web-app-status-bar-style" content="default">
   <link rel="apple-touch-icon" href="assets/icons/icon-192.png">

   <!-- Splash Portrait -->
   <link rel="apple-touch-startup-image" href="assets/splash/iphone-15pm-portrait.png" media="(device-width: 430px) and (device-height: 932px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)">
   <link rel="apple-touch-startup-image" href="assets/splash/iphone-15p-portrait.png"  media="(device-width: 393px) and (device-height: 852px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)">
   <link rel="apple-touch-startup-image" href="assets/splash/iphone-14-15-plus-portrait.png" media="(device-width: 428px) and (device-height: 926px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)">
   <link rel="apple-touch-startup-image" href="assets/splash/iphone-12pm-portrait.png" media="(device-width: 428px) and (device-height: 926px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)">
   <link rel="apple-touch-startup-image" href="assets/splash/iphone-12-14-portrait.png" media="(device-width: 390px) and (device-height: 844px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)">
   <link rel="apple-touch-startup-image" href="assets/splash/iphone-x-11pro-portrait.png" media="(device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)">
   <link rel="apple-touch-startup-image" href="assets/splash/iphone-11r-portrait.png" media="(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)">
   <link rel="apple-touch-startup-image" href="assets/splash/iphone-6-8-se2-portrait.png" media="(device-width: 375px) and (device-height: 667px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)">
   <link rel="apple-touch-startup-image" href="assets/splash/iphone-5-se1-portrait.png" media="(device-width: 320px) and (device-height: 568px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)">

   <!-- iPad -->
   <link rel="apple-touch-startup-image" href="assets/splash/ipad-pro-12-9-portrait.png" media="(device-width: 1024px) and (device-height: 1366px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)">
   <link rel="apple-touch-startup-image" href="assets/splash/ipad-pro-11-portrait.png"    media="(device-width: 834px) and (device-height: 1194px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)">
   <link rel="apple-touch-startup-image" href="assets/splash/ipad-pro-10-5-portrait.png"  media="(device-width: 834px) and (device-height: 1112px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)">
   <link rel="apple-touch-startup-image" href="assets/splash/ipad-9-7-portrait.png"       media="(device-width: 768px) and (device-height: 1024px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)">
   <link rel="apple-touch-startup-image" href="assets/splash/ipad-10-9-portrait.png"      media="(device-width: 820px) and (device-height: 1180px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)">

3) En manifest.webmanifest asegúrate de:
   "background_color": "#ffffff",
   "theme_color": "#0ea5e9"

4) Publica. Para ver el splash en iOS: elimina la app de la pantalla de inicio y vuelve a añadirla.
