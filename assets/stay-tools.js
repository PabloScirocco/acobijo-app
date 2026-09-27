(function(){
'use strict';
const text={
es:['Tu estancia, más fácil','Wi‑Fi','Consulta en recepción la red y la clave de acceso.','Consultar en recepción','Plano del establecimiento','Encuentra las instalaciones y los servicios.','Abrir plano','Solicita el plano en recepción.','Servicios ahora','Abierto ahora','Cerrado ahora','Consultar horario','Según el horario publicado · hora de Cantabria. Puede variar por temporada.','Hoy','Red','Contraseña','Copiar contraseña','Contraseña copiada','No se pudo copiar. Selecciona la contraseña para copiarla.'],
en:['Your stay made easier','Wi‑Fi','Ask reception for the network and password.','Ask reception','Site map','Find facilities and services.','Open map','Ask reception for the site map.','Services now','Open now','Closed now','Check opening hours','Based on published hours · Cantabria local time. Seasonal changes may apply.','Today','Network','Password','Copy password','Password copied','Could not copy. Select the password to copy it.'],
fr:['Votre séjour, plus simple','Wi‑Fi','Demandez le réseau et le mot de passe à la réception.','Contacter la réception','Plan de l’établissement','Repérez les installations et les services.','Ouvrir le plan','Demandez le plan à la réception.','Services en ce moment','Ouvert','Fermé','Consulter les horaires','Selon les horaires publiés · heure de Cantabrie. Variations saisonnières possibles.','Aujourd’hui','Réseau','Mot de passe','Copier le mot de passe','Mot de passe copié','Copie impossible. Sélectionnez le mot de passe pour le copier.'],
de:['Ihr Aufenthalt, einfacher','WLAN','Netzwerk und Passwort erhalten Sie an der Rezeption.','Rezeption kontaktieren','Lageplan','Einrichtungen und Angebote finden.','Lageplan öffnen','Fragen Sie an der Rezeption nach dem Lageplan.','Angebote jetzt','Jetzt geöffnet','Jetzt geschlossen','Öffnungszeiten erfragen','Laut veröffentlichten Zeiten · Ortszeit Kantabrien. Saisonale Änderungen möglich.','Heute','Netzwerk','Passwort','Passwort kopieren','Passwort kopiert','Kopieren fehlgeschlagen. Markieren Sie das Passwort zum Kopieren.'],
nl:['Je verblijf, makkelijker','Wifi','Vraag bij de receptie naar het netwerk en wachtwoord.','Vraag de receptie','Plattegrond','Vind voorzieningen en diensten.','Open plattegrond','Vraag de receptie om de plattegrond.','Voorzieningen nu','Nu open','Nu gesloten','Vraag naar openingstijden','Volgens de gepubliceerde tijden · lokale tijd in Cantabrië. Seizoenswijzigingen mogelijk.','Vandaag','Netwerk','Wachtwoord','Wachtwoord kopiëren','Wachtwoord gekopieerd','Kopiëren mislukt. Selecteer het wachtwoord om het te kopiëren.']
};
const maps={ramales:'https://www.campingramales.com/wp-content/uploads/2026/03/plano-camping-ramales-03-2026.pdf'};
// Guest networks are added only after the owner provides them for publication.
const wifi={};
function clock(date){const p=Object.fromEntries(new Intl.DateTimeFormat('en-GB',{timeZone:'Europe/Madrid',weekday:'short',hour:'2-digit',minute:'2-digit',hourCycle:'h23'}).formatToParts(date).map(p=>[p.type,p.value]));return {day:['Sun','Mon','Tue','Wed','Thu','Fri','Sat'].indexOf(p.weekday),minute:Number(p.hour)*60+Number(p.minute)};}
function status(raw,date=new Date()){
 const now=clock(date);let s=raw.split('(')[0].trim();
 if(/^cerrad[oa]/i.test(s))return {state:'closed',today:s};
 if(/consultar/i.test(s))return {state:'unknown',today:s};
 if(s.includes(';')){const parts=s.split(';');s=parts.find(p=>/Lu[–-]Vi/i.test(p)&&now.day>=1&&now.day<=5||/Sá[–-]Do/i.test(p)&&(now.day===0||now.day===6)||/domingo(?:[–-]| a )jueves/i.test(p)&&now.day<=4||/viernes(?:[–-]| y )sábado/i.test(p)&&now.day>=5)||'';if(!s)return {state:'unknown',today:raw};s=s.replace(/^.*?(?=\d{1,2}:\d{2})/,'');}
 if(/^24\s*horas/i.test(s))return {state:'open',today:'24 h'};
 const ranges=Array.from(s.matchAll(/(\d{1,2}):(\d{2})\s*[–-]\s*(\d{1,2}):(\d{2})/g)).map(m=>[Number(m[1])*60+Number(m[2]),Number(m[3])*60+Number(m[4])]);
 if(!ranges.length)return {state:'unknown',today:s};
 const open=ranges.some(([a,b])=>a<b?now.minute>=a&&now.minute<b:now.minute>=a||now.minute<b);
 return {state:open?'open':'closed',today:ranges.map(([a,b])=>[a,b].map(n=>String(Math.floor(n/60)).padStart(2,'0')+':'+String(n%60).padStart(2,'0')).join('–')).join(' / ')};
}
window.ACOBIJO_SERVICE_STATUS=status;
function rows(html){const doc=new DOMParser().parseFromString(html||'','text/html');return Array.from(doc.querySelectorAll('b')).map(b=>{let value='';for(let n=b.nextSibling;n&&n.nodeName!=='BR';n=n.nextSibling)value+=n.textContent;return {name:b.textContent,value:value.replace(/^\s*:\s*/,'')};});}
let current=null;
function node(tag,value,cls){const n=document.createElement(tag);n.textContent=value||'';if(cls)n.className=cls;return n;}
function render(){if(!current)return;const {schedules,place,lang,contact}=current,t=text[lang]||text.es,root=document.getElementById('stayTools');if(!root)return;root.replaceChildren();root.append(node('h3',t[0]));const grid=node('div','','stay-tools-grid');root.append(grid);
 const help=()=>{const a=node('a',t[3],'btn');a.href=contact;a.target='_blank';a.rel='noopener';return a;};
 const w=node('article','','stay-tool');w.append(node('h4',t[1]));const credentials=wifi[place];if(credentials){w.append(node('p',t[14]+': '+credentials.ssid),node('p',t[15]+': '+credentials.password));const btn=node('button',t[16],'btn');btn.type='button';const feedback=node('p','','muted');feedback.setAttribute('role','status');btn.onclick=async()=>{try{await navigator.clipboard.writeText(credentials.password);feedback.textContent=t[17];}catch(_){feedback.textContent=t[18];}};w.append(btn,feedback);}else{w.append(node('p',t[2]),help());}grid.append(w);
 const m=node('article','','stay-tool');m.append(node('h4',t[4]),node('p',maps[place]?t[5]:t[7]));if(maps[place]){const a=node('a',t[6]+' ↗','btn');a.href=maps[place];a.target='_blank';a.rel='noopener';m.append(a);}else m.append(help());grid.append(m);
 const services=node('section','','stay-services');services.append(node('h4',t[8]),node('p',t[12],'muted small'));const list=node('ul','','service-list');const source=rows(schedules[place]?.es),localized=rows(schedules[place]?.[lang]||schedules[place]?.es);source.forEach((r,i)=>{if(/check|apartamentos/i.test(r.name))return;const state=status(r.value),li=node('li'),head=node('div','','service-head');head.append(node('strong',localized[i]?.name||r.name),node('span',t[state.state==='open'?9:state.state==='closed'?10:11],'service-state '+state.state));li.append(head,node('p',state.state==='unknown'||/^cerrad/i.test(r.value)?(localized[i]?.value||r.value):t[13]+': '+state.today,'muted small'));list.append(li);});services.append(list);root.append(services);
}
window.addEventListener('acobijo:stay-tools',e=>{current=e.detail;render();});
setInterval(()=>{if(!document.hidden)render();},60000);document.addEventListener('visibilitychange',()=>{if(!document.hidden)render();});
})();
