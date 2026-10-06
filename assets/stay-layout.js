(function(){
  'use strict';
  const copy={
    es:{essential:'Lo esencial',photos:'Fotos y alojamientos',information:'Información',tabs:'Apartados de tu estancia',hours:'Horarios completos',restaurant:'Restaurante',notifications:'Avisos en tu móvil',outings:'Descubre los alrededores',moreContact:'Contacta con el alojamiento',awards:'Premios y reconocimientos'},
    en:{essential:'Essentials',photos:'Photos & accommodation',information:'Information',tabs:'Your stay sections',hours:'Full opening hours',restaurant:'Restaurant',notifications:'Notifications on your phone',outings:'Explore the area',moreContact:'Contact your accommodation',awards:'Awards and recognition'},
    fr:{essential:'L’essentiel',photos:'Photos et hébergements',information:'Informations',tabs:'Rubriques de votre séjour',hours:'Tous les horaires',restaurant:'Restaurant',notifications:'Des notifications sur votre mobile',outings:'Découvrez les environs',moreContact:'Contactez votre hébergement',awards:'Prix et distinctions'},
    de:{essential:'Das Wichtigste',photos:'Fotos & Unterkünfte',information:'Informationen',tabs:'Bereiche Ihres Aufenthalts',hours:'Alle Öffnungszeiten',restaurant:'Restaurant',notifications:'Benachrichtigungen auf Ihrem Smartphone',outings:'Die Umgebung entdecken',moreContact:'Kontakt zur Unterkunft',awards:'Preise und Auszeichnungen'},
    nl:{essential:'Het belangrijkste',photos:'Foto’s en accommodaties',information:'Informatie',tabs:'Onderdelen van je verblijf',hours:'Alle openingstijden',restaurant:'Restaurant',notifications:'Meldingen op je telefoon',outings:'Ontdek de omgeving',moreContact:'Neem contact op met je accommodatie',awards:'Prijzen en erkenningen'}
  };
  window.ACOBIJO_STAY_LAYOUT_COPY=copy;
  const keys=['essential','photos','information'];
  const remembered=new Map(),buttons=new Map(),panes=new Map(),disclosures=[];
  let ready=false,view,tablist,place='oyambre',selected='essential',outingsTitle,moreContactTitle;
  const byId=id=>document.getElementById(id);
  function language(){
    const value=(document.documentElement.lang||'es').slice(0,2).toLowerCase();
    return copy[value]?value:'es';
  }
  function currentPlace(){return byId('stayPlace')?.value||'oyambre';}
  function make(tag,classes){const node=document.createElement(tag);if(classes)node.className=classes;return node;}
  function move(target,node){if(node)target.append(node);}
  function selectTab(key,options={}){
    if(!ready||!keys.includes(key))return;
    const changed=selected!==key;
    selected=key;remembered.set(place,key);
    keys.forEach(name=>{
      const active=name===key,button=buttons.get(name),pane=panes.get(name);
      button.setAttribute('aria-selected',String(active));button.tabIndex=active?0:-1;
      button.classList.toggle('active',active);pane.hidden=!active;
    });
    if(options.focus)buttons.get(key).focus({preventScroll:true});
    if(changed)document.dispatchEvent(new CustomEvent('acobijo:stay-layout',{detail:{place,tab:key}}));
  }
  function disclosure(node,kind,id,titleId){
    if(!node)return null;
    const wrapper=make('details','stay-disclosure');wrapper.id=id;wrapper.dataset.stayDisclosure=kind;
    const summary=make('summary','stay-disclosure-title');summary.id=id+'Title';
    wrapper.setAttribute('aria-labelledby',summary.id);wrapper.append(summary,node);
    disclosures.push({wrapper,node,summary,kind,titleId});
    return wrapper;
  }
  function syncDisclosures(){
    const words=copy[language()];
    disclosures.forEach(item=>{
      const hidden=item.node.hidden;
      if(item.wrapper.hidden!==hidden)item.wrapper.hidden=hidden;
      // Labels come from the existing translated headings where available.
      const heading=item.titleId&&byId(item.titleId);
      item.summary.textContent=heading?.textContent?.trim()||words[item.kind];
    });
  }
  function translate(){
    if(!ready)return;
    const words=copy[language()];tablist.setAttribute('aria-label',words.tabs);
    keys.forEach(key=>{buttons.get(key).textContent=words[key];});
    if(outingsTitle)outingsTitle.textContent=words.outings;
    if(moreContactTitle)moreContactTitle.textContent=words.moreContact;
    syncDisclosures();
  }
  function openRestaurantLink(){
    if(!ready)return;
    const params=new URLSearchParams(window.location.search);
    if(params.get('section')!=='restaurant'||(params.get('nav')&&params.get('nav')!=='stay'))return;
    const target=params.get('focus')||place;
    if(!['oyambre','ramales'].includes(target)||target!==place)return;
    const item=disclosures.find(entry=>entry.node.id===target+'Restaurant');
    if(item&&!item.node.hidden){selectTab('essential');item.wrapper.open=true;}
  }
  function syncPlace(){
    if(!ready)return;
    const next=currentPlace();
    if(next!==place){place=next;selectTab(remembered.get(place)||'essential');}
    translate();
  }
  function start(){
    if(ready)return;
    view=byId('view-stay');
    const selector=byId('stayPlace');
    if(!view||!selector)return;
    const contacts=selector.closest('.grid');
    const hero=byId('stayHero')||byId('stayPhoto');
    if(!contacts||!hero||!view.contains(contacts))return;
    place=currentPlace();
    contacts.classList.add('stay-contact-bar');
    // Move the existing nodes rather than cloning: all their listeners survive.
    view.insertBefore(contacts,hero);
    tablist=make('div','stay-tabs');tablist.setAttribute('role','tablist');
    const panelGroup=make('div','stay-panes');
    keys.forEach(key=>{
      const tab=make('button','stay-tab');tab.type='button';tab.id='stayTab-'+key;
      tab.setAttribute('role','tab');tab.setAttribute('aria-controls','stayPane-'+key);
      const panel=make('section','stay-pane');panel.id='stayPane-'+key;panel.setAttribute('role','tabpanel');
      panel.setAttribute('aria-labelledby',tab.id);panel.tabIndex=0;
      tab.addEventListener('click',()=>selectTab(key));
      tab.addEventListener('keydown',event=>{
        const index=keys.indexOf(key);let next;
        if(event.key==='ArrowRight')next=keys[(index+1)%keys.length];
        else if(event.key==='ArrowLeft')next=keys[(index+keys.length-1)%keys.length];
        else if(event.key==='Home')next=keys[0];else if(event.key==='End')next=keys[keys.length-1];
        if(next){event.preventDefault();selectTab(next,{focus:true});}
      });
      buttons.set(key,tab);panes.set(key,panel);tablist.append(tab);panelGroup.append(panel);
    });
    hero.after(tablist,panelGroup);
    const essential=panes.get('essential'),photos=panes.get('photos'),information=panes.get('information');
    const outings=make('nav','stay-outings');outingsTitle=make('h3');outingsTitle.id='stayOutingsTitle';
    outings.setAttribute('aria-labelledby',outingsTitle.id);outings.append(outingsTitle);
    const outingButtons=Array.from(view.querySelectorAll('[data-sea-stay],[data-contacts-stay],[data-routes-stay]'));
    outingButtons.forEach(node=>outings.append(node));
    move(essential,byId('stayTools'));
    const hours=byId('stayHours')?.closest('.card');
    move(essential,disclosure(hours,'hours','stayHoursDisclosure','t-stay-hours'));
    ['oyambre','ramales'].forEach(name=>{
      const wrapper=disclosure(byId(name+'Restaurant'),'restaurant','stay-'+name+'-restaurant-disclosure',name==='oyambre'?'restaurantTitle':'ramalesRestaurantTitle');
      move(essential,wrapper);
    });
    const weather=byId('stayWeather');if(weather)weather.classList.add('stay-weather-compact');move(essential,weather);
    if(outingButtons.length)essential.append(outings);
    move(photos,byId('stayGallery'));move(photos,view.querySelector('.gallery-guide'));move(photos,byId('hotelStayInfo'));
    const moreContact=make('nav','stay-more-contact'),contactActions=make('div','row');
    moreContactTitle=make('h3');moreContactTitle.id='stayMoreContactTitle';
    moreContact.setAttribute('aria-labelledby',moreContactTitle.id);
    move(contactActions,byId('stayWeb'));move(contactActions,byId('stayEmail'));
    moreContact.append(moreContactTitle,contactActions);move(moreContact,byId('t-stay-hint'));
    information.append(moreContact);
    move(information,disclosure(byId('pushPanel'),'notifications','stayNotificationsDisclosure','pushTitle'));
    move(information,byId('stayConditions'));move(information,disclosure(byId('stayAwards'),'awards','stayAwardsDisclosure'));
    const quick=byId('stayQuick');if(quick)quick.hidden=true;
    ready=true;selectTab(remembered.get(place)||'essential');translate();openRestaurantLink();
    // Only watch original roots. Wrapper changes cannot trigger this observer.
    if(typeof MutationObserver!=='undefined'){
      const observer=new MutationObserver(syncDisclosures);
      disclosures.forEach(item=>observer.observe(item.node,{attributes:true,attributeFilter:['hidden']}));
    }
  }
  window.addEventListener('acobijo:stay-tools',syncPlace);
  document.addEventListener('acobijo:language',()=>{syncPlace();translate();});
  document.addEventListener('acobijo:view',event=>{if(event.detail==='stay'){syncPlace();openRestaurantLink();}});
  // visual.js and interactions.js construct their nodes during DOMContentLoaded.
  // The next task lets every existing initializer finish before moving anything.
  const deferStart=()=>setTimeout(start,0);
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',deferStart);
  else deferStart();
})();
