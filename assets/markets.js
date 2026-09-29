(function(){
'use strict';
const copy={
 es:{nav:'Mercadillos',title:'De pueblo en pueblo, de puesto en puesto.',intro:'Descubre una selección de mercadillos semanales de Cantabria. Elige un día y una localidad para preparar tu visita.',eyebrow:'MERCADILLOS DE CANTABRIA',day:'Día de la semana',allDays:'Cualquier día',town:'Localidad',allTowns:'Toda Cantabria',search:'Buscar localidad o lugar',today:'Día de hoy',reset:'Restablecer filtros',weekly:'Cada semana',place:'Dónde se celebra',directions:'Cómo llegar',source:'Información oficial',one:'{count} mercadillo',many:'{count} mercadillos',empty:'No hay mercadillos con estos filtros.',emptyHint:'Prueba otro día o localidad.',notice:'Los días indicados corresponden a la programación habitual, no a una confirmación de apertura. En festivos o por otros motivos puede haber cambios de día o ubicación: consulta la información oficial antes de ir.',homeTitle:'Una mañana de mercadillo',homeText:'Consulta los días y lugares de los mercadillos de Cantabria.',district:'Zona',west:'Occidente y Liébana',central:'Santander y zona central',east:'Costa oriental y Asón',allZones:'Todas las zonas'},
 en:{nav:'Street markets',title:'Explore the towns, browse the stalls.',intro:'Discover a selection of weekly street markets in Cantabria. Choose a day and a town to plan your visit.',eyebrow:'STREET MARKETS IN CANTABRIA',day:'Day of the week',allDays:'Any day',town:'Town',allTowns:'All of Cantabria',search:'Search for a town or venue',today:'Today’s weekday',reset:'Reset filters',weekly:'Every week',place:'Where to find it',directions:'Directions',source:'Official information',one:'{count} market',many:'{count} markets',empty:'No markets match these filters.',emptyHint:'Try another day or town.',notice:'The days shown are the usual schedule, not confirmation that the market is open. Public holidays or other circumstances may change the day or venue: check the official information before visiting.',homeTitle:'A morning at the market',homeText:'Find the days and locations of Cantabria’s street markets.',district:'Area',west:'Western Cantabria and Liébana',central:'Santander and central area',east:'Eastern coast and Asón',allZones:'All areas'},
 fr:{nav:'Marchés',title:'De village en village, d’étal en étal.',intro:'Découvrez une sélection de marchés hebdomadaires de Cantabrie. Choisissez un jour et une localité pour préparer votre visite.',eyebrow:'MARCHÉS DE CANTABRIE',day:'Jour de la semaine',allDays:'Tous les jours',town:'Localité',allTowns:'Toute la Cantabrie',search:'Rechercher une localité ou un lieu',today:'Jour de la semaine actuel',reset:'Réinitialiser les filtres',weekly:'Chaque semaine',place:'Lieu du marché',directions:'Itinéraire',source:'Informations officielles',one:'{count} marché',many:'{count} marchés',empty:'Aucun marché ne correspond à ces filtres.',emptyHint:'Essayez un autre jour ou une autre localité.',notice:'Les jours indiqués correspondent au calendrier habituel et ne garantissent pas la tenue du marché. Les jours fériés ou d’autres circonstances peuvent modifier le jour ou le lieu : consultez les informations officielles avant de vous déplacer.',homeTitle:'Une matinée au marché',homeText:'Retrouvez les jours et les lieux des marchés de Cantabrie.',district:'Zone',west:'Cantabrie occidentale et Liébana',central:'Santander et région centrale',east:'Côte orientale et Asón',allZones:'Toutes les zones'},
 de:{nav:'Wochenmärkte',title:'Von Ort zu Ort, von Stand zu Stand.',intro:'Entdecken Sie eine Auswahl an Wochenmärkten in Kantabrien. Wählen Sie einen Wochentag und einen Ort für Ihren Besuch.',eyebrow:'WOCHENMÄRKTE IN KANTABRIEN',day:'Wochentag',allDays:'Alle Wochentage',town:'Ort',allTowns:'Ganz Kantabrien',search:'Ort oder Marktplatz suchen',today:'Heutiger Wochentag',reset:'Filter zurücksetzen',weekly:'Jede Woche',place:'Veranstaltungsort',directions:'Anfahrt',source:'Offizielle Informationen',one:'{count} Markt',many:'{count} Märkte',empty:'Keine Märkte mit diesen Filtern.',emptyHint:'Versuchen Sie einen anderen Tag oder Ort.',notice:'Die angegebenen Tage entsprechen dem regulären Turnus und sind keine Bestätigung, dass der Markt stattfindet. An Feiertagen oder aus anderen Gründen können Tag und Ort abweichen. Prüfen Sie vor Ihrem Besuch die offiziellen Informationen.',homeTitle:'Ein Vormittag auf dem Markt',homeText:'Entdecken Sie die Tage und Orte der Wochenmärkte in Kantabrien.',district:'Region',west:'Westliches Kantabrien und Liébana',central:'Santander und zentrale Region',east:'Ostküste und Asón',allZones:'Alle Regionen'},
 nl:{nav:'Weekmarkten',title:'Van dorp naar dorp, van kraam naar kraam.',intro:'Ontdek een selectie van weekmarkten in Cantabrië. Kies een dag en een plaats om je bezoek te plannen.',eyebrow:'WEEKMARKTEN IN CANTABRIË',day:'Dag van de week',allDays:'Alle dagen',town:'Plaats',allTowns:'Heel Cantabrië',search:'Zoek een plaats of locatie',today:'De weekdag van vandaag',reset:'Filters wissen',weekly:'Elke week',place:'Waar is de markt?',directions:'Routebeschrijving',source:'Officiële informatie',one:'{count} markt',many:'{count} markten',empty:'Geen markten met deze filters.',emptyHint:'Probeer een andere dag of plaats.',notice:'De aangegeven dagen volgen het gebruikelijke schema en bevestigen niet dat de markt doorgaat. Op feestdagen of door andere omstandigheden kunnen dag en locatie veranderen. Controleer de officiële informatie voor je bezoek.',homeTitle:'Een ochtend op de markt',homeText:'Bekijk de dagen en locaties van de weekmarkten in Cantabrië.',district:'Regio',west:'West-Cantabrië en Liébana',central:'Santander en centrale regio',east:'Oostkust en Asón',allZones:'Alle regio’s'}
};
const normalize=value=>String(value||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().trim();
const localized=(value,lang)=>typeof value==='string'?value:value?.[lang]||value?.es||'';
function weekday(date=new Date()){const name=new Intl.DateTimeFormat('en-US',{weekday:'short',timeZone:'Europe/Madrid'}).format(date);return ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'].indexOf(name)+1;}
function dayName(day,lang){return new Intl.DateTimeFormat(lang,{weekday:'long',timeZone:'UTC'}).format(new Date(Date.UTC(2026,0,4+Number(day))));}
function matches(m,f){return (!f.day||m.days.includes(Number(f.day)))&&(!f.town||m.town===f.town)&&(!f.zone||m.zone===f.zone)&&(!normalize(f.search)||normalize(m.town+' '+m.venue+' '+(m.mapVenue||'')+' '+(m.locations||[]).map(location=>location.venue).join(' ')+' '+localized(m.name,f.lang)).includes(normalize(f.search)));}
function directions(m,venue=m.mapVenue||m.venue){const url=new URL('https://www.google.com/maps/dir/');url.searchParams.set('api','1');url.searchParams.set('destination',venue+', '+m.town+', Cantabria, España');return url.href;}
window.ACOBIJO_MARKET_UTILS={matches,weekday,dayName,directions,copy};
document.addEventListener('DOMContentLoaded',()=>{
 const $=id=>document.getElementById(id),form=$('marketFilters');if(!form)return;
 const markets=window.ACOBIJO_MARKETS||[];let lang='es',t=copy.es;
 const element=(tag,text,cls)=>{const n=document.createElement(tag);if(text!=null)n.textContent=text;if(cls)n.className=cls;return n;};
 function options(id,rows){const select=$(id),previous=select.value;select.replaceChildren(...rows.map(([value,text])=>{const n=element('option',text);n.value=value;return n;}));if(rows.some(([value])=>value===previous))select.value=previous;}
 function render(){
  const f={day:$('marketDay').value,town:$('marketTown').value,zone:$('marketZone').value,search:$('marketSearch').value,lang};
  const found=markets.filter(m=>matches(m,f)).sort((a,b)=>Math.min(...a.days)-Math.min(...b.days)||a.town.localeCompare(b.town,lang));
  $('marketCount').textContent=(found.length===1?t.one:t.many).replace('{count}',found.length);$('marketEmpty').hidden=!!found.length;
  $('marketResults').replaceChildren(...found.map(m=>{
   const card=element('article',null,'card market-card');card.dataset.marketId=m.id;
   const days=element('div',null,'market-days');m.days.forEach(day=>days.append(element('span',dayName(day,lang),'market-day')));
   card.append(days,element('p',t.weekly,'market-frequency'),element('h3',m.town));
   if(m.name)card.append(element('p',localized(m.name,lang),'market-name'));
   card.append(element('p',t.place,'market-location-label'),element('p',m.venue,'market-location'));
   if(m.notice)card.append(element('p',localized(m.notice,lang),'market-notice'));
   const links=element('div',null,'market-links');
   const directionsLinks=m.locations?m.locations.map(location=>[t.directions+' · '+localized(location.label,lang)+' ↗',directions(m,location.venue),'btn']):[[t.directions+' ↗',directions(m),'btn']];
   for(const [text,url,cls] of [...directionsLinks,[t.source+' ↗',m.source,'text-link']]){const a=element('a',text,cls);a.href=url;a.target='_blank';a.rel='noopener';a.setAttribute('aria-label',text+' · '+m.town+(m.name?' · '+localized(m.name,lang):''));links.append(a);}
   card.append(links);return card;
  }));
 }
 function translate(){let saved;try{saved=localStorage.getItem('lang');}catch(_){}lang=Object.hasOwn(copy,saved)?saved:'es';t=copy[lang];
  document.querySelectorAll('[data-market-copy]').forEach(n=>n.textContent=t[n.dataset.marketCopy]);form.setAttribute('aria-label',t.nav);
  options('marketDay',[['',t.allDays],...[1,2,3,4,5,6,7].map(day=>[String(day),dayName(day,lang)])]);
  options('marketTown',[['',t.allTowns],...[...new Set(markets.map(m=>m.town))].sort((a,b)=>a.localeCompare(b,lang)).map(town=>[town,town])]);
  options('marketZone',[['',t.allZones],...['west','central','east'].map(zone=>[zone,t[zone]])]);render();
 }
 function reset(){form.reset();render();}
 form.addEventListener('submit',e=>e.preventDefault());form.addEventListener('input',render);form.addEventListener('change',render);
 $('marketReset').addEventListener('click',reset);$('marketEmptyReset').addEventListener('click',reset);
 $('marketToday').addEventListener('click',()=>{$('marketDay').value=String(weekday());render();});
 document.addEventListener('acobijo:language',translate);translate();
});
})();
