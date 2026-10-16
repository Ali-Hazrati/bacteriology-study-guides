(() => {
  document.documentElement.classList.add('js');
  const PREFS='bacteriology-haji-khani-reader-v1';
  let preferences={size:100,theme:'light'};
  try{const saved=JSON.parse(localStorage.getItem(PREFS));if(saved){if(Number.isFinite(saved.size))preferences.size=Math.max(80,Math.min(140,saved.size));if(['light','dark'].includes(saved.theme))preferences.theme=saved.theme;}}catch(e){}
  const save=()=>{try{localStorage.setItem(PREFS,JSON.stringify(preferences));}catch(e){}};
  const applyPreferences=()=>{
    document.documentElement.style.setProperty('--text-scale',preferences.size/100);
    document.documentElement.dataset.theme=preferences.theme;
    document.getElementById('text-size-value').textContent=preferences.size.toLocaleString('fa-IR')+'٪';
    document.getElementById('text-smaller').disabled=preferences.size<=80;
    document.getElementById('text-larger').disabled=preferences.size>=140;
    document.getElementById('theme-toggle').setAttribute('aria-checked',String(preferences.theme==='dark'));
  };
  document.getElementById('text-smaller').addEventListener('click',()=>{preferences.size=Math.max(80,preferences.size-10);applyPreferences();save();});
  document.getElementById('text-larger').addEventListener('click',()=>{preferences.size=Math.min(140,preferences.size+10);applyPreferences();save();});
  document.getElementById('theme-toggle').addEventListener('click',()=>{preferences.theme=preferences.theme==='dark'?'light':'dark';applyPreferences();save();});
  applyPreferences();
  const dock=document.querySelector('.reader-dock');
  const updateOffset=()=>document.documentElement.style.setProperty('--reader-offset',(dock.getBoundingClientRect().height+20)+'px');
  if('ResizeObserver' in window)new ResizeObserver(updateOffset).observe(dock);
  updateOffset();

  const tabs=[...document.querySelectorAll('[role="tab"]')];
  const panels=[...document.querySelectorAll('.tab-panel')];
  const activate=(id,updateHash=false)=>{
    if(!panels.some(p=>p.id===id))return;
    panels.forEach(p=>{p.hidden=p.id!==id;});
    tabs.forEach(t=>{const selected=t.getAttribute('aria-controls')===id;t.setAttribute('aria-selected',String(selected));t.tabIndex=selected?0:-1;});
    if(updateHash){history.replaceState(null,'','#'+id);document.getElementById(id).scrollIntoView({block:'start'});}
  };
  const followHash=()=>{
    let id;try{id=decodeURIComponent(location.hash.slice(1));}catch(e){return;}
    const target=document.getElementById(id);
    if(!target){activate('panel-lessons');return;}
    const panel=target.closest('.tab-panel');
    if(panel){activate(panel.id);if(target.tagName==='DETAILS')target.open=true;for(let parent=target.parentElement;parent&&parent!==panel;parent=parent.parentElement){if(parent.tagName==='DETAILS')parent.open=true;}}
    else if(id==='top')activate('panel-lessons');
  };
  tabs.forEach((tab,index)=>{
    tab.addEventListener('click',()=>activate(tab.getAttribute('aria-controls'),true));
    tab.addEventListener('keydown',event=>{
      let next;
      if(event.key==='ArrowLeft')next=(index+1)%tabs.length;
      if(event.key==='ArrowRight')next=(index-1+tabs.length)%tabs.length;
      if(event.key==='Home')next=0;
      if(event.key==='End')next=tabs.length-1;
      if(next!==undefined){event.preventDefault();tabs[next].focus();activate(tabs[next].getAttribute('aria-controls'),true);}
    });
  });
  activate('panel-lessons');followHash();
  window.addEventListener('hashchange',()=>{followHash();const target=document.getElementById(location.hash.slice(1));if(target)target.scrollIntoView({block:'start'});});
  document.addEventListener('click',event=>{
    const link=event.target.closest('a[href^="#"]');if(!link)return;
    const target=document.getElementById(link.getAttribute('href').slice(1));if(!target)return;
    const panel=target.closest('.tab-panel');if(panel)activate(panel.id);
    if(target.tagName==='DETAILS')target.open=true;
    for(let parent=target.parentElement;parent;parent=parent.parentElement){if(parent.tagName==='DETAILS')parent.open=true;}
  });

  const cards=[...document.querySelectorAll('.flashcard')];
  let deck=cards,cardIndex=0;
  const renderCard=()=>{
    cards.forEach(card=>{card.hidden=true;card.querySelector('details').open=false;});
    if(deck[cardIndex])deck[cardIndex].hidden=false;
    document.getElementById('flash-position').textContent=(cardIndex+1).toLocaleString('fa-IR')+' از '+deck.length.toLocaleString('fa-IR');
    document.getElementById('flash-previous').disabled=cardIndex===0;
    document.getElementById('flash-next').disabled=cardIndex>=deck.length-1;
  };
  document.getElementById('flash-lesson').addEventListener('change',event=>{deck=cards.filter(card=>!event.target.value||card.dataset.flashLesson===event.target.value);cardIndex=0;renderCard();});
  document.getElementById('flash-previous').addEventListener('click',()=>{if(cardIndex>0){cardIndex--;renderCard();}});
  document.getElementById('flash-next').addEventListener('click',()=>{if(cardIndex<deck.length-1){cardIndex++;renderCard();}});
  renderCard();
})();
