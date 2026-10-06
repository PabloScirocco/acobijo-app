(function(){
'use strict';
const marker='acobijo-navigation-v1',places=['oyambre','ramales','ruiloba','cardeo','verdemar'];
window.ACOBIJO_NAV={create({render,getPlace,setPlace}){
 const positions=new Map();
 let current=null,saveFrame=0,restoreFrame=0,restoreTimer=0,observer=null,restoring=false,started=false;
 const byId=id=>document.getElementById(id);
 const validView=view=>!!byId('view-'+view);
 const sectionFor=(view,place,section)=>view==='stay'&&(section==='notifications'||(section==='restaurant'&&['oyambre','ramales'].includes(place)))?section:null;
 const valid=state=>state&&state.app===marker&&typeof state.id==='string'&&validView(state.view)&&places.includes(state.place)&&Number.isInteger(state.depth)&&state.depth>=0;
 const newId=()=>Date.now().toString(36)+'-'+Math.random().toString(36).slice(2,10);
 const y=()=>Math.max(0,window.scrollY||0);
 function urlFor(entry){const url=new URL(location.href);url.searchParams.set('nav',entry.view);url.searchParams.set('focus',entry.place);url.searchParams.delete('flush');url.searchParams.delete('section');url.hash='';if(entry.section)url.searchParams.set('section',entry.section);return url.pathname+url.search+url.hash;}
 function write(replace,entry){try{history[replace?'replaceState':'pushState'](entry,'',urlFor(entry));}catch(_){/* In-memory navigation remains usable in restricted browsers. */}}
 function save(){cancelAnimationFrame(saveFrame);saveFrame=0;if(!current||restoring)return;current.scroll=y();positions.set(current.id,current.scroll);if(history.state?.id===current.id)write(true,current);}
 function cancelRestore(){cancelAnimationFrame(restoreFrame);clearTimeout(restoreTimer);observer?.disconnect();observer=null;restoring=false;}
 function chrome(){
  const lang=localStorage.getItem('lang')||'es',copy=window.ACOBIJO_NAV_COPY[lang]||window.ACOBIJO_NAV_COPY.es;
  document.querySelectorAll('[data-navigation-copy]').forEach(n=>n.textContent=copy[n.dataset.navigationCopy]);
  byId('navigationBack').hidden=current.depth===0&&current.view==='home';
  document.querySelectorAll('.drawer [data-nav],.navbar [data-nav]').forEach(n=>{const selected=n.dataset.nav===current.view;n.classList.toggle('active',selected);if(selected)n.setAttribute('aria-current','page');else n.removeAttribute('aria-current');});
 }
 function show(entry){
  document.querySelectorAll('dialog[open]').forEach(d=>d.close());
  if(getPlace()!==entry.place)setPlace(entry.place);
  render(entry.view);chrome();
 }
 function focusHeading(){if(current.section==='notifications')return;const heading=byId('view-'+current.view)?.querySelector('h2');if(heading){heading.setAttribute('tabindex','-1');heading.focus({preventScroll:true});}}
 function sectionTarget(entry){
  if(entry.section==='restaurant')return byId(entry.place+'Restaurant');
  if(entry.section==='notifications'){const summary=byId('stayNotificationsDisclosureTitle');return summary&&!summary.closest('[hidden]')?summary:null;}
  return null;
 }
 function restore(entry,anchor=false){
  cancelRestore();restoring=true;let sectionFocused=false;
  const apply=()=>{if(current.id!==entry.id)return;let top=Number.isFinite(entry.scroll)?Math.max(0,entry.scroll):0;
   const target=sectionTarget(entry);
   if(target&&entry.section==='notifications'&&!sectionFocused&&!target.closest('[inert]')){target.focus({preventScroll:true});sectionFocused=true;}
   if(anchor&&target)top=y()+target.getBoundingClientRect().top-(document.querySelector('.topbar')?.getBoundingClientRect().height||0)-12;
   window.scrollTo({top,behavior:'instant'});
  };
  apply();restoreFrame=requestAnimationFrame(()=>{apply();restoreFrame=requestAnimationFrame(apply);});
  if(typeof ResizeObserver!=='undefined'){observer=new ResizeObserver(apply);observer.observe(document.querySelector('main'));}
  restoreTimer=setTimeout(()=>{cancelRestore();save();},1200);
 }
 function go(view,options={}){
  if(!started)return;view=validView(view)?view:'home';const place=places.includes(options.place)?options.place:getPlace();
  const section=sectionFor(view,place,options.section);
  if(current.view===view&&current.place===place&&current.section===section){byId('drawer').classList.remove('open');if(section==='notifications'){show(current);restore(current,true);}else chrome();return;}
  cancelRestore();save();
  current={app:marker,id:newId(),view,place,section,depth:options.replace?current.depth:current.depth+1,scroll:0};
  write(!!options.replace,current);show(current);focusHeading();restore(current,!!section);
 }
 function back(){cancelRestore();save();if(current.depth>0&&history.state?.id===current.id)history.back();else go('home',{replace:true});}
 function start(){
  if(started)return;started=true;
  const params=new URLSearchParams(location.search),saved=history.state;
  if(valid(saved)){current={...saved};show(current);restore(current);}
  else{const place=places.includes(params.get('focus'))?params.get('focus'):getPlace();const section=sectionFor('stay',place,params.get('section'));
   current={app:marker,id:newId(),view:section?'stay':validView(params.get('nav'))?params.get('nav'):'home',place,section,depth:0,scroll:0};write(true,current);show(current);restore(current,!!section);
  }
 }
 window.addEventListener('popstate',event=>{if(!valid(event.state))return;cancelRestore();cancelAnimationFrame(saveFrame);saveFrame=0;current={...event.state};if(positions.has(current.id))current.scroll=positions.get(current.id);show(current);focusHeading();restore(current);});
 window.addEventListener('scroll',()=>{if(!current||restoring)return;current.scroll=y();positions.set(current.id,current.scroll);if(!saveFrame)saveFrame=requestAnimationFrame(save);},{passive:true});
 // Never fight a guest who starts scrolling while late content settles.
 ['wheel','touchstart','pointerdown','keydown'].forEach(type=>window.addEventListener(type,()=>{if(restoring){cancelRestore();save();}},{passive:true}));
 window.addEventListener('pagehide',()=>{cancelRestore();save();});
 document.addEventListener('visibilitychange',()=>{if(document.hidden)save();});
 document.addEventListener('acobijo:language',()=>{if(current)chrome();});
 document.addEventListener('click',event=>{if(event.target?.closest?.('[data-open-notifications]')){event.preventDefault();go('stay',{section:'notifications'});}});
 // A direct link may load beneath the welcome screen; focus only after it closes.
 byId('welcomeEnter')?.addEventListener('click',()=>{if(current?.section==='notifications')restore(current,!current.scroll);});
 byId('navBack').addEventListener('click',back);
 try{history.scrollRestoration='manual';}catch(_){}
 return {start,go,back,save,currentView:()=>current?.view||'home'};
}};
})();
