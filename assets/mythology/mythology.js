(function(){
'use strict';
const initial=new URL(location.href),scan=initial.searchParams.get('figure');
// Remove the bearer code before navigation, analytics and outbound links see it.
if(scan!==null){initial.searchParams.delete('figure');history.replaceState(history.state,'',initial.pathname+initial.search+initial.hash);}
document.addEventListener('DOMContentLoaded',()=>{
 const root=document.getElementById('mythRoot'),data=window.ACOBIJO_MYTH_DATA,core=window.ACOBIJO_MYTH_CORE;
 if(!root||!data)return;
 let storage;try{storage=localStorage;}catch(_){}
 let loaded=core.read(storage,data),state=loaded.state,persistent=loaded.persistent,lang='es',t=window.ACOBIJO_MYTH_COPY.es,message='',confirming=false;
 const el=(tag,text,cls)=>{const n=document.createElement(tag);if(text!==null&&text!==undefined)n.textContent=text;if(cls)n.className=cls;return n;};
 const button=(text,action,cls='btn')=>{const b=el('button',text,cls);b.type='button';b.addEventListener('click',action);return b;};
 const route=()=>history.state?.view==='mythology'?history.state:{place:initial.searchParams.get('focus'),creature:initial.searchParams.get('creature'),mythMode:initial.searchParams.get('mythMode')};
 const camping=()=>Object.hasOwn(data.campings,route().place)?route().place:'oyambre';
 function go(options={}){confirming=false;document.dispatchEvent(new CustomEvent('acobijo:navigate',{detail:{view:'mythology',place:camping(),...options}}));}
 function href(id,place=camping()){const url=new URL(location.pathname,location.origin);url.searchParams.set('nav','mythology');url.searchParams.set('focus',place);if(id)url.searchParams.set('creature',id);return url.pathname+url.search;}
 function link(id,label){const a=el('a',label,'btn');a.href=href(id);a.addEventListener('click',e=>{if(e.button===0&&!e.metaKey&&!e.ctrlKey&&!e.shiftKey&&!e.altKey){e.preventDefault();go({creature:id});}});return a;}
 function art(c){if(!c.image){const n=el('div',t.imagePending,'myth-art-pending');return n;}const img=el('img');img.src=c.image;img.alt=c.name;img.width=1600;img.height=1131;img.loading='lazy';img.className='myth-art';return img;}
 function textContent(c){return c.content[lang]||c.content.es;}
 function reset(){
  const latest=core.read(storage,data);if(latest.persistent)state=latest.state;
  for(const [id,d] of Object.entries(state.discoveries))if(d.camping===camping())delete state.discoveries[id];
  try{storage.setItem(core.KEY,JSON.stringify(state));persistent=true;}catch(_){persistent=false;}
  confirming=false;message='resetDone';render();
 }
 function render(){
  try{lang=storage.getItem('lang')||document.documentElement.lang||'es';}catch(_){lang=document.documentElement.lang||'es';}
  t=window.ACOBIJO_MYTH_COPY[lang]||window.ACOBIJO_MYTH_COPY.es;
  document.querySelectorAll('[data-myth-copy]').forEach(n=>n.textContent=t[n.dataset.mythCopy]);
  const r=route(),camp=camping(),collection=r.mythMode==='collection',found=core.found(state,camp);
  root.replaceChildren();
  const hero=el('header',null,'myth-hero');hero.append(el('p',t.subtitle,'eyebrow'),el('h2',t.title),el('p',t.intro));hero.querySelector('h2').id='mythTitle';root.append(hero);
  const modes=el('nav',null,'myth-modes');modes.setAttribute('aria-label',t.nav);
  for(const [label,mode] of [[t.library,null],[t.collection,'collection']]){const b=button(label,()=>go({mythMode:mode}));if((mode==='collection')===collection&&!r.creature)b.setAttribute('aria-current','page');modes.append(b);}root.append(modes);
  if(message){const notice=el('p',t[message],'myth-notice');notice.setAttribute('role','status');root.append(notice);}
  if(!persistent){const notice=el('p',t.temporary,'myth-notice');notice.setAttribute('role','status');root.append(notice);}
  if(r.creature){
   const c=data.creatures.find(c=>c.id===r.creature);
   if(!c){root.append(el('p',t.notFound),button(t.back,()=>go()));return;}
   const content=textContent(c),article=el('article',null,'myth-detail');
   const heading=el('h3',c.name);heading.tabIndex=-1;heading.id='mythCreatureTitle';article.setAttribute('aria-labelledby',heading.id);
   article.append(art(c));const body=el('div',null,'myth-detail-body');body.append(heading);
   if(c.aliases.length)body.append(el('p',c.aliases.join(' · '),'muted small'));
   if(!c.content[lang])body.append(el('p',t.translation,'myth-notice'));
   const intro=el('p',content.intro,'myth-intro');intro.lang=c.content[lang]?lang:'es';body.append(intro);
   for(const [key,title] of [['description',t.description],['legend',t.legend],['facts',t.facts],['variants',t.variants]]){
    body.append(el('h4',title));const block=el(key==='facts'?'ul':'p');block.lang=c.content[lang]?lang:'es';
    if(key==='facts')content.facts.forEach(f=>block.append(el('li',f)));else block.textContent=content[key];body.append(block);
   }
   body.append(el('h4',t.sources));const refs=el('ul');for(const id of c.sources){const source=data.sources[id],li=el('li'),a=el('a',source.title);a.href=source.url;a.target='_blank';a.rel='noopener noreferrer';li.append(a);refs.append(li);}body.append(refs,el('p',t.tradition,'muted small'));
   const permanent=el('a',t.permalink,'text-link');permanent.href=href(c.id);body.append(permanent,button(t.back,()=>go(),'btn myth-back'));article.append(body);root.append(article);return;
  }
  if(collection){
   const panel=el('div',null,'myth-collection');const label=el('label',t.camping+' '),select=el('select');select.className='select';select.id='mythCamping';
   for(const [id,name] of Object.entries(data.campings)){const o=el('option',name);o.value=id;select.append(o);}select.value=camp;label.append(select);panel.append(label);
   select.addEventListener('change',()=>{message='';go({place:select.value,mythMode:'collection'});});
   const progressText=t.progress.replace('{count}',found.size).replace('{total}',data.creatures.length);panel.append(el('p',progressText,'myth-progress-text'));const progress=el('progress');progress.max=data.creatures.length;progress.value=found.size;progress.setAttribute('aria-label',progressText);panel.append(progress,el('p',t.instructions),el('p',t.privacy,'muted small'));
   if(!core.validFigures(data).some(f=>f.camping===camp))panel.append(el('p',t.pending,'myth-notice'));
   if(found.size){panel.append(button(t.reset,()=>{confirming=true;render();}));if(confirming){const confirm=el('div',null,'myth-notice');confirm.append(el('p',t.confirmReset),button(t.reset,reset),button(t.cancel,()=>{confirming=false;render();}));panel.append(confirm);}}
   root.append(panel);
  }
  const grid=el('div',null,'myth-grid');
  for(const c of data.creatures){const card=el('article',null,'myth-card'),body=el('div',null,'myth-card-body');card.append(art(c));body.append(el('h3',c.name));if(collection)body.append(el('p',found.has(c.id)?'✓ '+t.found:'○ '+t.locked,'myth-badge'));const intro=el('p',textContent(c).intro);intro.lang=c.content[lang]?lang:'es';body.append(intro,link(c.id,t.read));card.append(body);grid.append(card);}root.append(grid,el('p',t.credit,'muted small'));
  if(lang!=='es')root.insertBefore(el('p',t.translation,'myth-notice'),grid);
 }
 document.addEventListener('acobijo:view',e=>{if(e.detail==='mythology'){confirming=false;render();}});
 document.addEventListener('acobijo:language',render);
 window.addEventListener('storage',e=>{if(e.key===core.KEY||e.key===null){loaded=core.read(storage,data);state=loaded.state;persistent=loaded.persistent;render();}});
 render();
 if(scan!==null){(async()=>{
  let figure=null;try{figure=core.resolve(await core.digest(scan),initial.searchParams.get('focus'),initial.searchParams.get('creature'),data);}catch(_){}
  if(initial.searchParams.get('nav')!=='mythology'||!figure){message='invalid';render();return;}
  const latest=core.read(storage,data);if(latest.persistent)state=latest.state;
  const already=Object.hasOwn(state.discoveries,figure.id);state=core.collect(state,figure,data);
  try{storage.setItem(core.KEY,JSON.stringify(state));persistent=true;}catch(_){persistent=false;}
  message=already?'repeat':'success';render();
 })();}
});
})();
