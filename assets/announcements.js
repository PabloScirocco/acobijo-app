/* Group announcements use absolute dates so their meaning survives later visits. */
(function(){
'use strict';
const copy={
 es:{title:'Cierre de temporada · 18 de octubre',body:'Caravaning Oyambre, Camping Ruiloba y Camping Ramales cierran el 18 de octubre de 2026. Gracias por haber compartido esta temporada con nosotros.',news:'¡2027 viene con MUCHÍSIMAS NOVEDADES!'},
 en:{title:'Season closing · 18 October',body:'Caravaning Oyambre, Camping Ruiloba and Camping Ramales will close on 18 October 2026. Thank you for sharing this season with us.',news:'There’s SO MUCH NEW coming in 2027!'},
 fr:{title:'Fin de saison · 18 octobre',body:'Caravaning Oyambre, Camping Ruiloba et Camping Ramales fermeront le 18 octobre 2026. Merci d’avoir partagé cette saison avec nous.',news:'2027 vous réserve UNE MULTITUDE DE NOUVEAUTÉS !'},
 de:{title:'Saisonende · 18. Oktober',body:'Caravaning Oyambre, Camping Ruiloba und Camping Ramales schließen am 18. Oktober 2026. Vielen Dank, dass Sie diese Saison mit uns verbracht haben.',news:'2027 bringt JEDE MENGE NEUIGKEITEN!'},
 nl:{title:'Seizoensafsluiting · 18 oktober',body:'Caravaning Oyambre, Camping Ruiloba en Camping Ramales sluiten op 18 oktober 2026. Bedankt dat je dit seizoen met ons hebt doorgebracht.',news:'2027 brengt HEEL VEEL NIEUWS!'},
 eu:{title:'Denboraldiaren amaiera · urriaren 18a',body:'Caravaning Oyambre, Camping Ruiloba eta Camping Ramales 2026ko urriaren 18an itxiko dira. Eskerrik asko denboraldi hau gurekin partekatzeagatik.',news:'2027a BERRITASUN ASKO ETA ASKOREKIN dator!'}
};
function translate(){
 const notice=document.getElementById('homeClosureNotice');
 if(!notice)return;
 let lang=document.documentElement.lang;
 try{lang=localStorage.getItem('lang')||lang;}catch(_){}
 const text=copy[lang]||copy.es;
 notice.querySelector('h2').textContent=text.title;
 notice.querySelector('p').textContent=text.body;
 notice.querySelector('strong').textContent=text.news;
}
function mount(){
 const home=document.getElementById('view-home');
 const hero=home&&home.querySelector('.welcome-hero');
 if(!hero)return;
 if(!document.getElementById('homeClosureNotice')){
  const notice=document.createElement('aside');
  notice.id='homeClosureNotice';
  notice.className='home-announcement';
  notice.setAttribute('aria-labelledby','homeClosureTitle');
  notice.innerHTML='<span class="home-announcement-icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8L12 21l8.8-8.6a5.5 5.5 0 0 0 0-7.8Z"/></svg></span><div class="home-announcement-copy"><h2 id="homeClosureTitle"></h2><p></p><strong class="home-announcement-news"></strong></div>';
  home.insertBefore(notice,hero);
 }
 translate();
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',mount,{once:true});
else mount();
document.addEventListener('acobijo:language',translate);
})();
