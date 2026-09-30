(function(){
'use strict';
const zone='Europe/Madrid',favoriteKey='acobijo_favorite_beach_v1';
function localDay(date=new Date()){return new Intl.DateTimeFormat('en-CA',{timeZone:zone,year:'numeric',month:'2-digit',day:'2-digit'}).format(date);}
function dayAfter(day,n){const d=new Date(day+'T12:00:00Z');d.setUTCDate(d.getUTCDate()+n);return d.toISOString().slice(0,10);}
function nextTide(tides,now=Date.now()){return tides.filter(x=>Date.parse(x.at)>now&&['high','low'].includes(x.type)).sort((a,b)=>Date.parse(a.at)-Date.parse(b.at))[0]||null;}
function currentWave(waves,now=Date.now()){return waves.find(x=>Date.parse(x.at)<=now&&now<Date.parse(x.at)+86400000&&Number.isFinite(x.heightM)&&x.heightM>=0)||null;}
function validFavorite(value,beaches){return beaches.some(b=>b.id===value)?value:null;}
window.ACOBIJO_MARINE_UTILS={localDay,dayAfter,nextTide,currentWave,validFavorite};
document.addEventListener('DOMContentLoaded',()=>{
 const $=id=>document.getElementById(id),section=$('view-sea');if(!section)return;
 const beaches=window.ACOBIJO_BEACHES||[],copy=window.ACOBIJO_MARINE_COPY,defaults=window.ACOBIJO_BEACH_DEFAULTS;
 const el=(tag,text,cls)=>{const n=document.createElement(tag);if(text!=null)n.textContent=text;if(cls)n.className=cls;return n;};
 const read=key=>{try{return localStorage.getItem(key);}catch(_){return null;}};
 let lang='es',t=copy.es,favorite=validFavorite(read(favoriteKey),beaches),selected=favorite||defaults[read('stay_place')]||'oyambre';
 let data=null,loading=false,error='',request=0,controller,lastAttempt=0,ticker;
 const active=()=>section.classList.contains('active')&&!document.hidden;
 const beach=()=>beaches.find(b=>b.id===selected)||beaches[0];
 const time=at=>new Intl.DateTimeFormat(lang,{timeZone:zone,hour:'2-digit',minute:'2-digit',hour12:false}).format(new Date(at));
 const fullDate=at=>new Intl.DateTimeFormat(lang,{timeZone:zone,day:'numeric',month:'short',hour:'2-digit',minute:'2-digit',hour12:false}).format(new Date(at));
 const dateLabel=day=>new Intl.DateTimeFormat(lang,{timeZone:zone,weekday:'short',day:'numeric',month:'short'}).format(new Date(day+'T12:00:00Z'));
 const number=value=>Number(value).toLocaleString(lang,{minimumFractionDigits:1,maximumFractionDigits:2});
 function externalLink(node,url){node.href=url;node.target='_blank';node.rel='noopener';}
 function sourceUrl(url){const u=new URL(url);if(u.hash)u.hash=u.hash.replace(/locale=\w+/,'locale='+(lang==='es'?'es':'en'));else u.searchParams.set('locale',lang==='es'?'es':'en');return u.href;}
 function recentData(){return data&&!data.isStale&&Date.parse(data.coverageUntil)>Date.now()&&(data.waves.some(w=>w.dayUTC===new Date().toISOString().slice(0,10))||data.tides.some(x=>x.at.slice(0,10)===new Date().toISOString().slice(0,10)));}
 function renderFavorites(){
  const saved=favorite===selected;$('seaSave').textContent=(saved?'♥ ':'♡ ')+(saved?t.saved:t.save);$('seaSave').setAttribute('aria-pressed',String(saved));$('seaSave').setAttribute('aria-label',(saved?t.remove:t.save)+' · '+beach().name);
  const name=beaches.find(b=>b.id===favorite)?.name;$('seaHomeFavorite').hidden=!name;$('seaHomeFavorite').textContent=name?t.favoriteHome.replace('{beach}',name):'';
 }
 function renderSun(){
  const sun=window.ACOBIJO_SUN_TIMES.calculate(localDay(),beach().lat,beach().lon);
  $('seaSunset').textContent=sun.sunset?time(sun.sunset):'—';$('seaSunrise').textContent=sun.sunrise?t.sunrise+' · '+time(sun.sunrise):'';
  $('seaSunDate').textContent=dateLabel(localDay());
 }
 function renderTides(){
  const tides=recentData()?data.tides:[],next=nextTide(tides);
  $('seaNextTime').textContent=next?time(next.at):'—';$('seaNextKind').textContent=next?(next.type==='high'?t.high:t.low)+' · '+dateLabel(localDay(new Date(next.at))):t.noNext;
  if(next){const minutes=Math.ceil((Date.parse(next.at)-Date.now())/60000),h=Math.floor(minutes/60),m=minutes%60;$('seaCountdown').textContent=t.inTime.replace('{time}',(h?h+' '+t.hours+' ':'')+m+' '+t.minutes);}else $('seaCountdown').textContent='';
  $('seaTideRows').replaceChildren();
  if(!recentData())return;
  [0,1,2].forEach(offset=>{const day=dayAfter(localDay(),offset),row=el('tr');row.append(el('th',dateLabel(day)));row.firstChild.scope='row';for(const type of ['high','low']){const cell=el('td'),values=tides.filter(x=>x.type===type&&localDay(new Date(x.at))===day);if(!values.length)cell.append(el('span',t.emptyTide,'muted'));else values.forEach(x=>{const stamp=el('time',time(x.at),'sea-tide-time');stamp.dateTime=x.at;cell.append(stamp);});row.append(cell);}$('seaTideRows').append(row);});
 }
 function renderWaves(){
  const waves=recentData()?data.waves:[],wave=currentWave(waves);
  $('seaWaveHeight').textContent=wave?number(wave.heightM)+' m':'—';$('seaWavePeriod').textContent=wave?fullDate(wave.at)+' – '+fullDate(new Date(Date.parse(wave.at)+86400000)):'';
  $('seaWaveBars').replaceChildren();
  const maximum=Math.max(1,...waves.map(w=>w.heightM));
  waves.forEach(w=>{const item=el('li',null,'sea-wave-row');const labels=el('div',null,'sea-wave-row-labels');labels.append(el('span',fullDate(w.at)+' – '+fullDate(new Date(Date.parse(w.at)+86400000))),el('strong',number(w.heightM)+' m'));const track=el('div',null,'sea-wave-track');track.setAttribute('aria-hidden','true');const bar=el('span');bar.style.width=(w.heightM/maximum*100)+'%';track.append(bar);item.append(labels,track);$('seaWaveBars').append(item);});
 }
 function render(){
  renderFavorites();renderSun();renderTides();renderWaves();
  $('seaCoverage').textContent=recentData()?t.forecastPeriod+': '+fullDate(data.coverageFrom)+' – '+fullDate(data.coverageUntil):'';
  $('seaReference').textContent=t.modelPoint.replace('{lat}',beach().wavePoint.lat.toLocaleString(lang,{minimumFractionDigits:3,maximumFractionDigits:3})).replace('{lon}',beach().wavePoint.lon.toLocaleString(lang,{minimumFractionDigits:3,maximumFractionDigits:3}));
  $('seaDataStatus').textContent=loading?t.loading:error?(error==='stale'?t.stale:t.unavailable):data?t.retrieved.replace('{time}',fullDate(data.retrievedAt)):'';
  $('seaDataStatus').classList.toggle('sea-data-error',!!error);$('seaRefresh').disabled=loading;$('seaRefresh').textContent=error?t.retry:t.refresh;
  $('seaNativeForecast').hidden=!recentData();$('seaForecastEmpty').hidden=!!recentData()||loading;$('seaForecastEmpty').textContent=error==='stale'?t.stale:t.unavailable;
  externalLink($('seaOfficial'),sourceUrl(beach().officialUrl));
  externalLink($('seaOfficialGraphs'),sourceUrl(beach().officialUrl.replace('/locationsWidget?','/locationsGraphsWidget?')+'&locationType=Playa&name='+encodeURIComponent(beach().name)));
  const map=new URL('https://www.google.com/maps/dir/');map.searchParams.set('api','1');map.searchParams.set('destination',beach().lat+','+beach().lon);externalLink($('seaDirections'),map.href);
  $('seaExternalLanguage').hidden=['es','en'].includes(lang);
 }
 async function load(force=false){
  if(!active())return;
  if(!force&&Date.now()-lastAttempt<15*60000&&recentData()){render();return;}
  controller?.abort();controller=new AbortController();const current=++request;lastAttempt=Date.now();loading=true;error='';data=null;render();
  const timeout=setTimeout(()=>{if(current===request){request++;controller.abort();loading=false;data=null;error='network';render();}},15000);
  try{const result=await window.ACOBIJO_MARINE_API.load(beach(),controller.signal);if(current!==request)return;data=result;error=result.isStale?'stale':'';}
  catch(e){if(current!==request||e.name==='AbortError')return;data=null;error='network';}
  finally{clearTimeout(timeout);if(current===request){loading=false;render();}}
 }
 function changeBeach(id){if(!beaches.some(b=>b.id===id))return;selected=id;$('seaBeach').value=id;request++;controller?.abort();loading=false;data=null;error='';lastAttempt=0;render();load(true);}
 function translate(){lang=Object.hasOwn(copy,read('lang'))?read('lang'):'es';t=copy[lang];document.querySelectorAll('[data-sea-copy]').forEach(n=>n.textContent=t[n.dataset.seaCopy]);const previous=selected;$('seaBeach').replaceChildren(...beaches.map(b=>{const option=el('option',b.name);option.value=b.id;return option;}));$('seaBeach').value=previous;render();}
 function enter(){clearInterval(ticker);if(!active())return;load();ticker=setInterval(()=>{render();if(Date.now()-lastAttempt>=15*60000)load(true);},60000);}
 function leave(){clearInterval(ticker);request++;controller?.abort();loading=false;}
 $('seaBeach').addEventListener('change',e=>changeBeach(e.target.value));$('seaRefresh').addEventListener('click',()=>load(true));
 $('seaSave').addEventListener('click',()=>{const next=favorite===selected?null:selected;try{if(next)localStorage.setItem(favoriteKey,next);else localStorage.removeItem(favoriteKey);favorite=next;$('seaSaveStatus').textContent='';renderFavorites();}catch(_){$('seaSaveStatus').textContent=t.saveError;}});
 window.addEventListener('storage',e=>{if(e.key===favoriteKey){favorite=validFavorite(read(favoriteKey),beaches);renderFavorites();}});
 document.addEventListener('acobijo:language',translate);
 document.addEventListener('acobijo:view',e=>{if(e.detail==='sea')enter();else leave();});
 document.addEventListener('visibilitychange',()=>{if(document.hidden)leave();else enter();});window.addEventListener('online',()=>{if(active())load(true);});window.addEventListener('offline',()=>{if(active()){request++;controller?.abort();loading=false;data=null;error='network';render();}});
 document.querySelectorAll('[data-sea-stay]').forEach(n=>n.addEventListener('click',()=>changeBeach(favorite||defaults[read('stay_place')]||'oyambre')));
 translate();enter();
});
})();
