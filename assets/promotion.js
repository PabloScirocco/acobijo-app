(function(){
'use strict';
const end=Date.parse('2026-11-02T00:00:00+01:00');
const copy={
es:['Exclusivo en la app','15 % de descuento','En cualquier reserva realizada hasta el 1 de noviembre de 2026, en cualquiera de nuestros establecimientos.','Código','Copiar código','Código copiado','No se pudo copiar. Selecciona el código APPCOBIJO para copiarlo.'],
en:['App exclusive','15% off','On any booking made by 1 November 2026, at any of our establishments.','Code','Copy code','Code copied','Could not copy. Select APPCOBIJO to copy it.'],
fr:['Exclusivité de l’application','15 % de réduction','Sur toute réservation effectuée jusqu’au 1er novembre 2026 inclus, dans l’un de nos établissements.','Code','Copier le code','Code copié','Copie impossible. Sélectionnez APPCOBIJO pour le copier.'],
de:['Exklusiv in der App','15 % Rabatt','Auf jede Buchung bis einschließlich 1. November 2026 in allen unseren Unterkünften.','Code','Code kopieren','Code kopiert','Kopieren nicht möglich. Wählen Sie APPCOBIJO aus, um den Code zu kopieren.'],
nl:['Exclusief in de app','15% korting','Op elke boeking die uiterlijk 1 november 2026 wordt gemaakt, bij al onze accommodaties.','Code','Code kopiëren','Code gekopieerd','Kopiëren is niet gelukt. Selecteer APPCOBIJO om de code te kopiëren.']};
let banner,timer;
const t=()=>copy[localStorage.getItem('lang')]||copy.es;
function render(){if(!banner)return;banner.hidden=Date.now()>=end;if(banner.hidden)return;const c=t();banner.querySelectorAll('[data-promo-copy]').forEach(n=>n.textContent=c[Number(n.dataset.promoCopy)]);banner.querySelector('.promo-feedback').textContent='';clearTimeout(timer);timer=setTimeout(render,Math.min(Math.max(1,end-Date.now()),86400000));}
document.addEventListener('DOMContentLoaded',()=>{banner=document.createElement('aside');banner.className='app-promotion';banner.setAttribute('aria-labelledby','promoTitle');banner.innerHTML='<div class="promo-content"><p class="eyebrow" data-promo-copy="0"></p><h2 id="promoTitle" data-promo-copy="1"></h2><p class="promo-description" data-promo-copy="2"></p></div><div class="promo-action"><span class="promo-code-label" data-promo-copy="3"></span><strong class="promo-code">APPCOBIJO</strong><button type="button" class="btn promo-copy" data-promo-copy="4"></button><p class="promo-feedback" role="status" aria-live="polite"></p></div>';document.querySelector('main').prepend(banner);banner.querySelector('button').onclick=async()=>{const c=t();try{await navigator.clipboard.writeText('APPCOBIJO');banner.querySelector('.promo-feedback').textContent=c[5];window.dispatchEvent(new CustomEvent('acobijo:feedback',{detail:{message:c[5]}}));}catch(_){banner.querySelector('.promo-feedback').textContent=c[6];}};render();});
document.addEventListener('acobijo:language',render);document.addEventListener('visibilitychange',()=>{if(!document.hidden)render();});
})();
