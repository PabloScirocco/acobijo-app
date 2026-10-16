/* Small presentation-only enhancements. Business data and navigation stay in their modules. */
(function(){
'use strict';
const copy={
 eu:{notificationsTitle:'Talde osoaren abisuak',notificationsSub:'Grupo A Cobijoko establezimendu guztietako ekitaldiak, eskaintzak eta abisu garrantzitsuak. Aukeratu zer jaso nahi duzun.',notificationsButton:'Abisuak konfiguratu',townsTitle:'Zer bisitatu',foodTitle:'Gastronomia',favoritesTitle:'Taldearen gomendioak',discoverEyebrow:'Zure erritmoan',discoverTitle:'Ezagutu Kantabria',seaSub:'Mareak, olatuak eta ilunabarra',routesSub:'Oinez edo bizikletaz, zuk aukeratu',townsSub:'Herriak, paisaiak eta bisitak',foodSub:'Gure lurraldeko zaporeak',marketsSub:'Azoketan ibiltzeko egunak eta lekuak',favoritesSub:'Gure taldearen gomendioak',quickLabel:'Zure egonaldirako sarbide azkarrak'},
 es:{notificationsTitle:"Avisos en tu móvil",notificationsSub:"Eventos, ofertas y avisos importantes de todos los establecimientos de Grupo A Cobijo. Tú eliges qué recibir.",notificationsButton:"Configurar avisos",townsTitle:'Qué visitar',foodTitle:'Gastronomía',favoritesTitle:'Favoritos del equipo',discoverEyebrow:'A tu ritmo',discoverTitle:'Sal a descubrir Cantabria',seaSub:'Mareas, olas y puesta de sol',routesSub:'A pie o en bici, tú eliges',townsSub:'Pueblos, paisajes y visitas',foodSub:'Sabores de nuestra tierra',marketsSub:'Días y lugares para curiosear',favoritesSub:'Las recomendaciones del equipo',quickLabel:'Accesos de tu estancia'},
 en:{notificationsTitle:"Notifications on your phone",notificationsSub:"Events, offers and important updates from all Grupo A Cobijo establishments. Choose what you receive.",notificationsButton:"Set up notifications",townsTitle:'Places to visit',foodTitle:'Local food',favoritesTitle:'Team favourites',discoverEyebrow:'At your own pace',discoverTitle:'Discover Cantabria',seaSub:'Tides, waves and sunset',routesSub:'On foot or by bike — your choice',townsSub:'Towns, landscapes and sights',foodSub:'A taste of our region',marketsSub:'Where to browse and when to go',favoritesSub:'Our team’s recommendations',quickLabel:'Shortcuts for your stay'},
 fr:{notificationsTitle:"Des notifications sur votre mobile",notificationsSub:"Événements, offres et informations importantes de tous les établissements de Grupo A Cobijo. Choisissez ce que vous recevez.",notificationsButton:"Configurer les notifications",townsTitle:'À visiter',foodTitle:'Gastronomie',favoritesTitle:'Nos coups de cœur',discoverEyebrow:'À votre rythme',discoverTitle:'Partez découvrir la Cantabrie',seaSub:'Marées, vagues et coucher de soleil',routesSub:'À pied ou à vélo, à vous de choisir',townsSub:'Villages, paysages et visites',foodSub:'Les saveurs de notre région',marketsSub:'Les jours et les lieux pour flâner',favoritesSub:'Les recommandations de l’équipe',quickLabel:'Raccourcis pour votre séjour'},
 de:{notificationsTitle:"Benachrichtigungen auf Ihrem Smartphone",notificationsSub:"Veranstaltungen, Angebote und wichtige Mitteilungen aller Unterkünfte von Grupo A Cobijo. Sie wählen, was Sie erhalten.",notificationsButton:"Benachrichtigungen einrichten",townsTitle:'Ausflugsziele',foodTitle:'Regionale Küche',favoritesTitle:'Tipps vom Team',discoverEyebrow:'In Ihrem eigenen Tempo',discoverTitle:'Entdecken Sie Kantabrien',seaSub:'Gezeiten, Wellen und Sonnenuntergang',routesSub:'Zu Fuß oder mit dem Rad',townsSub:'Orte, Landschaften und Ausflugsziele',foodSub:'Die Küche unserer Region',marketsSub:'Markttage und Orte zum Stöbern',favoritesSub:'Die Empfehlungen unseres Teams',quickLabel:'Direktzugriff für Ihren Aufenthalt'},
 nl:{notificationsTitle:"Meldingen op je telefoon",notificationsSub:"Evenementen, aanbiedingen en belangrijke berichten van alle accommodaties van Grupo A Cobijo. Jij kiest wat je ontvangt.",notificationsButton:"Meldingen instellen",townsTitle:'Bezienswaardigheden',foodTitle:'Streekgerechten',favoritesTitle:'Tips van ons team',discoverEyebrow:'Op je eigen tempo',discoverTitle:'Ontdek Cantabrië',seaSub:'Getijden, golven en zonsondergang',routesSub:'Te voet of op de fiets: jij kiest',townsSub:'Dorpen, landschappen en bezienswaardigheden',foodSub:'Proef onze streek',marketsSub:'Waar en wanneer je kunt rondstruinen',favoritesSub:'De tips van ons team',quickLabel:'Snel naar je verblijfsinformatie'}
};
const paths={
 home:'<path d="m3 10 9-7 9 7M5 9v12h5v-7h4v7h5V9"/>',
 stay:'<rect x="5" y="7" width="14" height="14" rx="3"/><path d="M9 7V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v3M9 11v6m6-6v6"/>',
 clock:'<circle cx="12" cy="12" r="9"/><path d="M12 7v5l4 2"/>',
 help:'<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="4"/><path d="m6 5 3 4m6 6 3 4M5 18l4-3m6-6 4-3"/>',
 calendar:'<rect x="4" y="5" width="16" height="16" rx="3"/><path d="M8 3v4m8-4v4M4 10h16m-11 4h.01M12 14h.01M16 14h.01M8 17h.01M12 17h.01"/>',
 pin:'<path d="M19 10c0 5-7 11-7 11S5 15 5 10a7 7 0 1 1 14 0Z"/><circle cx="12" cy="10" r="2.5"/>',
 award:'<circle cx="12" cy="9" r="6"/><path d="m8 14-2 7 6-3 6 3-2-7m-6-5 1.5 1.5L15 7"/>',
 message:'<path d="M5 4h14a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H9l-6 4V6a2 2 0 0 1 2-2Z"/><path d="M7 9h10M7 13h7"/>'
};
let installedThisSession=false;
const installed=()=>installedThisSession||window.matchMedia('(display-mode: standalone)').matches||navigator.standalone===true;
function translate(){const lang=localStorage.getItem('lang')||document.documentElement.lang;const t=copy[lang]||copy.es;const manifest=document.querySelector('link[rel=manifest]');if(manifest)manifest.href=lang==='eu'?'manifest-eu.webmanifest':'manifest.webmanifest';document.querySelectorAll('[data-design-copy]').forEach(n=>{n.textContent=t[n.dataset.designCopy]||'';});document.querySelector('.home-essentials')?.setAttribute('aria-label',t.quickLabel);}
function installation(){
 const isInstalled=installed(),card=document.querySelector('.install-card'),notifications=document.querySelector('.home-notifications');
 if(card)card.hidden=isInstalled;
 if(notifications)notifications.hidden=!isInstalled;
}
function arrangeHome(){
 const home=document.getElementById('view-home');if(!home)return;
 const card=home.querySelector('.install-card'),notifications=home.querySelector('.home-notifications');
 if(notifications)home.prepend(notifications);
 if(card)home.prepend(card);
}
document.addEventListener('DOMContentLoaded',()=>{
 document.querySelectorAll('[data-design-icon]').forEach(n=>{const path=paths[n.dataset.designIcon];if(path)n.innerHTML='<svg viewBox="0 0 24 24" aria-hidden="true">'+path+'</svg>';});
 // The first home action follows the device: installation or group notifications.
 arrangeHome();
 translate();installation();
 const media=window.matchMedia('(display-mode: standalone)');if(media.addEventListener)media.addEventListener('change',installation);
 window.addEventListener('appinstalled',()=>{installedThisSession=true;installation();});
 window.addEventListener('pageshow',installation);
});
document.addEventListener('acobijo:language',translate);
})();
