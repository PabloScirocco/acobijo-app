(function(){
'use strict';
const stays={oyambre:'Caravaning Oyambre',ramales:'Camping Ramales',ruiloba:'Camping Ruiloba',cardeo:'Apartamentos El Cardeo',verdemar:'Hotel Verdemar by Grupo A Cobijo'};
const categories=['mobility','health','pharmacy','garage','vet','police','supermarket','other'];
const categoryKeys={mobility:'categoryMobility',health:'categoryHealthCentres',pharmacy:'categoryPharmacy',garage:'categoryCarGarage',vet:'categoryVet',police:'categoryPolice',supermarket:'categorySupermarket',other:'categoryOther'};
const normalize=value=>String(value||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLocaleLowerCase();
const validCoordinates=p=>!!p&&typeof p.lat==='number'&&Number.isFinite(p.lat)&&Math.abs(p.lat)<=90&&typeof p.lon==='number'&&Number.isFinite(p.lon)&&Math.abs(p.lon)<=180;
function distance(a,b){
 if(!validCoordinates(a)||!validCoordinates(b))return null;
 const radians=n=>n*Math.PI/180,phi=radians(b.lat-a.lat),lambda=radians(b.lon-a.lon);
 const h=Math.sin(phi/2)**2+Math.cos(radians(a.lat))*Math.cos(radians(b.lat))*Math.sin(lambda/2)**2;
 return 6371*2*Math.asin(Math.min(1,Math.sqrt(h)));
}
function text(value){return typeof value==='string'&&value.trim().length>0;}
function approved(contact){
 if(!contact||contact.approvedByOwner!==true||!text(contact.id)||!text(contact.name)||!categories.includes(contact.category)||!text(contact.locality)||!Array.isArray(contact.stays)||!contact.stays.length||!contact.stays.every(id=>Object.hasOwn(stays,id)))return false;
 const mobile=contact.category==='mobility'&&['bus','taxi'].includes(contact.kind);
 return mobile||text(contact.address);
}
function localized(value,lang){return typeof value==='string'?value:value?.[lang]||value?.es||'';}
function selectContacts(data,filters){
 if(!Object.hasOwn(stays,filters.place))return [];
 const search=normalize(filters.search).trim();
 return data.filter(approved).filter(c=>(!filters.category||c.category===filters.category)&&c.stays.includes(filters.place)&&(!search||normalize(c.name+' '+localized(c.displayName,filters.lang)+' '+(c.address||'')+' '+c.locality+' '+localized(c.description,filters.lang)).includes(search)))
 .map(contact=>({contact,km:distance(filters.position,contact.coordinates)}))
 .filter(row=>!filters.radius||(row.km!==null&&row.km<=Number(filters.radius)))
 .sort((a,b)=>filters.sort==='distance'&&a.km!==b.km?(a.km===null?1:b.km===null?-1:a.km-b.km):Number(b.contact.recommendedByOwner===true)-Number(a.contact.recommendedByOwner===true)||a.contact.name.localeCompare(b.contact.name,filters.lang||'es'));
}
function directions(contact){if(!text(contact.address))return null;const url=new URL('https://www.google.com/maps/dir/');url.searchParams.set('api','1');url.searchParams.set('destination',contact.name+', '+contact.address+', '+contact.locality);return url.href;}
function telephone(value){const phone=String(value||'').replace(/[\s().-]/g,'');return /^\+\d{8,15}$/.test(phone)?'tel:'+phone:null;}
function website(value){try{const url=new URL(value);return url.protocol==='https:'&&!url.username&&!url.password?url.href:null;}catch(_){return null;}}
window.ACOBIJO_CONTACT_UTILS={approved,selectContacts,distance,directions,telephone,website};
document.addEventListener('DOMContentLoaded',()=>{
 const $=id=>document.getElementById(id),form=$('contactFilters');if(!form)return;
 const data=(window.ACOBIJO_CONTACTS||[]).filter(approved);
 const availableCategories=categories.filter(key=>data.some(c=>c.category===key));
 const copy=window.ACOBIJO_CONTACT_COPY;
 let lang='es',t=copy.es,position=null,locating=false,request=0,messageKey='';
 let place=Object.hasOwn(stays,$('stayPlace')?.value)?$('stayPlace').value:'oyambre';
 function element(tag,text,cls){const node=document.createElement(tag);if(text!=null)node.textContent=text;if(cls)node.className=cls;return node;}
 function options(id,values){const select=$(id),previous=select.value;select.replaceChildren(...values.map(([value,text])=>{const opt=element('option',text);opt.value=value;return opt;}));if(values.some(([value])=>value===previous))select.value=previous;}
 function card(row){
  const c=row.contact,name=localized(c.displayName,lang)||c.name,article=element('article',null,'card contact-card'+(c.recommendedByOwner===true?' contact-recommended':'')+(c.kind==='bus'?' contact-bus':''));
  const top=element('div',null,'contact-card-top');top.append(element('span',t[c.kind==='taxi-rank'?'taxiRank':c.kind]||t[categoryKeys[c.category]],'contact-category'));
  if(position&&row.km!==null)top.append(element('span',row.km.toLocaleString(lang,{maximumFractionDigits:1})+' km','contact-distance'));
  if(position&&row.km===null)top.append(element('span',t.distanceUnknown,'contact-distance'));
  article.append(top);
  if(c.recommendedByOwner===true)article.append(element('p',t.recommended,'contact-recommendation'));
  article.append(element('h3',name));
  const description=localized(c.description,lang);if(description)article.append(element('p',description,'contact-description'));
  article.append(element('p',[c.address,c.locality].filter(Boolean).join(', '),'contact-address'));
  if(c.kind==='taxi'&&!c.address)article.append(element('p',t.noFixedPoint,'contact-pickup'));
  if(c.notice)article.append(element('p',localized(c.notice,lang),'contact-notice'));
  const tel=telephone(c.phone),site=website(c.website),map=directions(c),actions=element('div',null,'contact-actions');
  if(tel){const callText=['health','police'].includes(c.category)?t.callGeneral:t.call;const call=element('a',callText+' · '+c.phone,'btn'+(!map?' primary':''));call.href=tel;call.setAttribute('aria-label',callText+' · '+name+' · '+c.phone);actions.append(call);}
  if(map){const route=element('a',t.directions+' ↗','btn primary');route.href=map;route.target='_blank';route.rel='noopener noreferrer';route.setAttribute('aria-label',t.directions+' · '+name);actions.append(route);}
  if(site){const link=element('a',(c.kind==='bus'?t.timetable:c.websiteLabel==='source'?t.source:t.officialWebsite)+' ↗','btn');link.href=site;link.target='_blank';link.rel='noopener noreferrer';actions.append(link);}
  article.append(actions);
  if(c.phoneVerification==='omitted_pending_confirmation')article.append(element('small',t.phonePending,'muted'));
  if(c.category==='pharmacy')article.append(element('small',t.pharmacyAvailability,'muted'));
  if(c.kind==='taxi')article.append(element('small',t.availability,'muted'));
  return article;
 }
 function render(){
  const ownPosition=position;
  const rows=selectContacts(data,{category:$('contactCategory').value,place:$('contactOrigin').value,search:$('contactSearch').value,position:ownPosition,radius:ownPosition?$('contactRadius').value:'',sort:ownPosition?$('contactSort').value:'name',lang});
  $('contactRadius').disabled=!ownPosition;$('contactSort').disabled=!ownPosition;
  if(!ownPosition)$('contactSort').value='name';
  $('contactLocate').disabled=locating||!data.length;
  $('contactLocate').textContent=locating?t.locating:ownPosition?t.stopLocation:t.locateButton;
  $('contactLocationStatus').textContent=messageKey?t[messageKey]:'';
  $('contactCount').textContent=data.length?(rows.length===1?t.resultsSingular:t.resultsPlural).replace('{count}',rows.length):'';
  $('contactResults').replaceChildren(...rows.map(card));
  $('contactEmpty').hidden=!!data.length;
  $('contactNoMatches').hidden=!data.length||!!rows.length;
  const emptyArea=!data.some(c=>c.stays.includes($('contactOrigin').value));
  $('contactNoMatchesTitle').textContent=emptyArea?t.noAreaContacts:t.noMatches;
  $('contactDistanceNote').hidden=!ownPosition;
  $('contactFiltersFields').disabled=!data.length;
 }
 function translate(){
  const next=(document.documentElement.lang||'es').slice(0,2);lang=Object.hasOwn(copy,next)?next:'es';t=copy[lang];
  document.querySelectorAll('[data-contact-copy]').forEach(el=>{if(t[el.dataset.contactCopy])el.textContent=t[el.dataset.contactCopy];});
  form.setAttribute('aria-label',t.title);$('contactSearch').placeholder=t.searchPlaceholder;
  options('contactCategory',[['',t.categoryAll],...availableCategories.map(key=>[key,t[categoryKeys[key]]])]);
  options('contactOrigin',Object.entries(stays));
  options('contactRadius',[['',t.rangeAll],['5',t.range5km],['10',t.range10km],['25',t.range25km]]);
  options('contactSort',[['distance',t.sortDistance],['name',t.sortName]]);
  render();
 }
 function clearPosition(){request++;locating=false;position=null;messageKey='';$('contactRadius').value='';}
 function reset(){
  clearPosition();
  $('contactSearch').value='';$('contactCategory').value='';$('contactRadius').value='';$('contactSort').value='distance';
  options('contactOrigin',Object.entries(stays));$('contactOrigin').value=place;render();
 }
 function locate(){
  if(locating||!data.length)return;
  if(position){clearPosition();render();return;}
  if(!navigator.geolocation){messageKey='locationUnsupported';render();return;}
  locating=true;messageKey='';const currentRequest=++request;render();
  navigator.geolocation.getCurrentPosition(result=>{
   if(currentRequest!==request)return;
   const value={lat:result.coords.latitude,lon:result.coords.longitude};
   locating=false;if(!validCoordinates(value)){messageKey='locationFailure';render();return;}
   position=value;$('contactSort').value='distance';render();
  },error=>{if(currentRequest!==request)return;locating=false;messageKey=error.code===1?'locationDenied':'locationFailure';render();},{enableHighAccuracy:false,timeout:12000,maximumAge:60000});
 }
 form.addEventListener('submit',e=>e.preventDefault());
 form.addEventListener('input',render);
 form.addEventListener('change',event=>{if(event.target.id==='contactOrigin')clearPosition();render();});
 form.addEventListener('reset',e=>{e.preventDefault();reset();});
 $('contactLocate').addEventListener('click',locate);
 $('contactEmptyReset').addEventListener('click',reset);
 document.addEventListener('acobijo:language',translate);
 document.addEventListener('acobijo:view',event=>{if(event.detail!=='contacts'){clearPosition();options('contactOrigin',Object.entries(stays));$('contactOrigin').value=place;render();}});
 window.addEventListener('acobijo:stay-tools',event=>{if(Object.hasOwn(stays,event.detail?.place)){const changed=place!==event.detail.place;place=event.detail.place;if(changed){clearPosition();$('contactOrigin').value=place;render();}}});
 document.querySelectorAll('[data-contacts-stay]').forEach(button=>button.addEventListener('click',reset));
 translate();$('contactOrigin').value=place;render();
});
})();
