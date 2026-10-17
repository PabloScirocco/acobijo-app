/* Owner-confirmed closure. Boundaries are calendar days in Cantabria, inclusive. */
(function(){
'use strict';
const start='2026-10-19',end='2027-03-19';
const places=new Set(['oyambre','ramales']);
const copy={
 es:{upcoming:'Próximo cierre de temporada',closed:'Cerrado por temporada',dates:'Del 19 de octubre de 2026 al 19 de marzo de 2027, ambos incluidos.'},
 en:{upcoming:'Upcoming seasonal closure',closed:'Closed for the season',dates:'From 19 October 2026 to 19 March 2027, both dates included.'},
 fr:{upcoming:'Prochaine fermeture saisonnière',closed:'Fermé pour la saison',dates:'Du 19 octobre 2026 au 19 mars 2027 inclus.'},
 de:{upcoming:'Bevorstehende Saisonpause',closed:'Saisonal geschlossen',dates:'Vom 19. Oktober 2026 bis einschließlich 19. März 2027.'},
 nl:{upcoming:'Komende seizoenssluiting',closed:'Gesloten voor het seizoen',dates:'Van 19 oktober 2026 tot en met 19 maart 2027.'},
 eu:{upcoming:'Denboraldia laster amaituko da',closed:'Denboraldiz kanpo itxita',dates:'2026ko urriaren 19tik 2027ko martxoaren 19ra, bi egunak barne.'}
};
const calendar=new Intl.DateTimeFormat('en-GB',{timeZone:'Europe/Madrid',year:'numeric',month:'2-digit',day:'2-digit'});
function dayKey(date=new Date()){
 const parts=Object.fromEntries(calendar.formatToParts(date).map(p=>[p.type,p.value]));
 return parts.year+'-'+parts.month+'-'+parts.day;
}
function info(place,lang,date=new Date()){
 if(!places.has(place))return null;
 const day=dayKey(date);
 if(day>end)return null;
 const closed=day>=start,text=copy[lang]||copy.es,title=closed?text.closed:text.upcoming;
 return {closed,title,dates:text.dates,html:'<div class="seasonal-hours-notice"><strong>'+title+'</strong><span>'+text.dates+'</span></div>'};
}
function renderHours(place,schedule,lang,date=new Date()){
 const notice=info(place,lang,date),normal=schedule&&(schedule[lang]||schedule.es)||'';
 return notice?notice.html+(notice.closed?'':normal):normal;
}
window.ACOBIJO_SEASONAL_HOURS={info,renderHours,dayKey};
})();
