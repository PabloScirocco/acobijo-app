(function(root){
'use strict';
const KEY='acobijo.mythology.v1';
function validFigures(data){
 const ids=new Set(),hashes=new Set();
 return data.figures.filter(f=>{
  const valid=f&&typeof f.id==='string'&&f.id.length>0&&f.active===true&&f.commonAreaApproved===true&&typeof f.location==='string'&&f.location.trim()&&Object.hasOwn(data.campings,f.camping)&&data.creatures.some(c=>c.id===f.creature)&&/^[a-f0-9]{64}$/.test(f.tokenHash)&&!ids.has(f.id)&&!hashes.has(f.tokenHash);
  if(valid){ids.add(f.id);hashes.add(f.tokenHash);}return valid;
 });
}
function sanitize(raw,data){
 const result={version:1,discoveries:{}};
 if(!raw||raw.version!==1||!raw.discoveries||typeof raw.discoveries!=='object')return result;
 for(const figure of validFigures(data)){
  const d=raw.discoveries[figure.id];
  if(d&&d.camping===figure.camping&&d.creature===figure.creature&&typeof d.foundAt==='string'&&Number.isFinite(Date.parse(d.foundAt)))result.discoveries[figure.id]={camping:d.camping,creature:d.creature,foundAt:d.foundAt};
 }
 return result;
}
function read(storage,data){try{return {state:sanitize(JSON.parse(storage.getItem(KEY)),data),persistent:true};}catch(_){return {state:sanitize(null,data),persistent:false};}}
function resolve(hash,camping,creature,data){return validFigures(data).find(f=>f.tokenHash===hash&&f.camping===camping&&f.creature===creature)||null;}
function collect(state,figure,data,now=new Date().toISOString()){
 const next=sanitize(state,data),valid=validFigures(data).find(f=>f.id===figure.id&&f.tokenHash===figure.tokenHash);
 if(!valid)return next;
 if(!Object.hasOwn(next.discoveries,valid.id))next.discoveries[valid.id]={camping:valid.camping,creature:valid.creature,foundAt:now};
 return next;
}
function found(state,camping){return new Set(Object.values(state.discoveries).filter(d=>d.camping===camping).map(d=>d.creature));}
async function digest(token){if(typeof token!=='string'||token.length<24||token.length>256)return null;const bytes=await root.crypto.subtle.digest('SHA-256',new TextEncoder().encode(token));return Array.from(new Uint8Array(bytes),b=>b.toString(16).padStart(2,'0')).join('');}
const api={KEY,validFigures,sanitize,read,resolve,collect,found,digest};
if(typeof module!=='undefined'&&module.exports)module.exports=api;else root.ACOBIJO_MYTH_CORE=api;
})(globalThis);
