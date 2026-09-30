(function(){
'use strict';
// Public forecast used by the official Portus locations widget. Requests are
// direct, credential-free and uncached; the source remains available as fallback.
const ALLOWED_CODES=new Set([31137,31136,31138,31121]);
const DAY=86400000;
function codeFor(beach){
 const value=typeof beach==='object'&&beach!==null?(beach.portusCode??beach.code??beach.id):beach;
 const code=Number(value);
 if(!ALLOWED_CODES.has(code))throw new Error('Unsupported marine location');
 return code;
}
function number(value){
 if(value===null||value===undefined||typeof value==='boolean'||String(value).trim()==='')return null;
 const n=Number(value);return Number.isFinite(n)?n:null;
}
function epoch(value){const n=number(value);return n!==null&&n>0&&n<8640000000000?n*1000:null;}
function parse(payload,now=new Date()){
 const retrieved=now instanceof Date?now:new Date(now);
 if(!Number.isFinite(retrieved.getTime()))throw new Error('Invalid marine retrieval date');
 if(!payload||Array.isArray(payload)||typeof payload!=='object')throw new Error('Invalid marine forecast');
 const tides=[],waves=[],days=[],seen=new Set();
 for(const [key,rows] of Object.entries(payload)){
  const start=epoch(key);
  // The feed is grouped into UTC calendar days, with one summary per day.
  if(start===null||start%DAY!==0||!Array.isArray(rows)||!rows.length)continue;
  const row=rows[0];if(!row||typeof row!=='object'||Array.isArray(row))continue;
  days.push(start);
  for(const type of ['high','low'])for(const n of [1,2]){
   const at=epoch(row[type+'_tide'+n+'_date']);
   if(at===null||at<start||at>=start+DAY)continue;
   const identity=type+':'+at;if(seen.has(identity))continue;seen.add(identity);
   const item={at:new Date(at).toISOString(),type};
   const height=number(row[type+'_tide'+n+'_level']);
   if(height!==null)item.height=height;
   tides.push(item);
  }
  const heightM=number(row.mt_hm0);
  if(heightM!==null&&heightM>=0)waves.push({at:new Date(start).toISOString(),heightM,dayUTC:new Date(start).toISOString().slice(0,10),until:new Date(start+DAY).toISOString(),aggregation:'daily-max-significant'});
 }
 if(!days.length||(!tides.length&&!waves.length))throw new Error('Empty marine forecast');
 tides.sort((a,b)=>Date.parse(a.at)-Date.parse(b.at));
 waves.sort((a,b)=>Date.parse(a.at)-Date.parse(b.at));
 const today=Math.floor(retrieved.getTime()/DAY)*DAY;
 return {retrievedAt:retrieved.toISOString(),tides,waves,coverageFrom:new Date(Math.min(...days)).toISOString(),coverageUntil:new Date(Math.max(...days)+DAY).toISOString(),isStale:!days.includes(today)||!tides.some(t=>Date.parse(t.at)>retrieved.getTime()),timeBasis:'UTC',tideDatum:'local-mean-sea-level',tideIncludesWeather:true,waveAggregation:'daily-max-significant',waveLocation:'open-water-model'};
}
async function load(beach,signal){
 const code=codeFor(beach);
 const sourceUrl='https://movil.puertos.es/simo/seastate/city/'+code+'/daily_extended';
 const response=await fetch(sourceUrl,{method:'GET',mode:'cors',credentials:'omit',cache:'no-store',signal,headers:{Accept:'application/json'}});
 if(!response.ok)throw new Error('Marine forecast unavailable ('+response.status+')');
 const result=parse(await response.json());
 return Object.assign(result,{code,sourceUrl,sourcePage:'https://portus.puertos.es/#/locationsWidget?code='+code+'&locale=es'});
}
window.ACOBIJO_MARINE_API={load,parse};
})();
