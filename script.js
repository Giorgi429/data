const symbols=['💗','💕','💖','🌹','💐'];
const bg=document.getElementById('floatBg');
for(let i=0;i<18;i++){
  const el=document.createElement('div');
  el.className='fbi'; el.textContent=symbols[Math.floor(Math.random()*symbols.length)];
  el.style.left=Math.random()*100+'vw';
  el.style.animationDuration=(9+Math.random()*10)+'s';
  el.style.animationDelay=(Math.random()*10)+'s';
  el.style.fontSize=(14+Math.random()*16)+'px';
  bg.appendChild(el);
}

function goTo(n){
  document.querySelectorAll('.step').forEach((s,i)=> s.classList.toggle('active', i===n-1));
  document.querySelectorAll('.dot').forEach((d,i)=> d.classList.toggle('on', i<=n-1));
  if(n===2) setupHunt();
  if(n===3) setupScratch();
}

function setupHunt(){
  const area=document.getElementById('huntArea');
  if(area.dataset.done) return;
  area.dataset.done='1';
  const total=6; let found=0;
  for(let i=0;i<total;i++){
    const h=document.createElement('div');
    h.className='hunt-heart'; h.textContent='💗';
    h.style.left=(8+Math.random()*80)+'%';
    h.style.top=(8+Math.random()*75)+'%';
    h.onclick=()=>{
      if(h.classList.contains('found')) return;
      h.classList.add('found'); found++;
      document.getElementById('foundCount').textContent=found;
      if(found===total) document.getElementById('huntBtn').disabled=false;
    };
    area.appendChild(h);
  }
}

function setupScratch(){
  const canvas=document.getElementById('scratchCanvas');
  if(canvas.dataset.done) return;
  canvas.dataset.done='1';
  const ctx=canvas.getContext('2d');
  ctx.fillStyle='#e0567c';
  ctx.fillRect(0,0,canvas.width,canvas.height);
  ctx.fillStyle='#ffffff';
  ctx.font='bold 18px sans-serif';
  ctx.textAlign='center';
  ctx.fillText('გაფხიკე აქ ✨', canvas.width/2, canvas.height/2);

  let drawing=false, clearedPixels=0;
  function pos(e){
    const rect=canvas.getBoundingClientRect();
    const cx = e.touches ? e.touches[0].clientX : e.clientX;
    const cy = e.touches ? e.touches[0].clientY : e.clientY;
    return { x:(cx-rect.left)*(canvas.width/rect.width), y:(cy-rect.top)*(canvas.height/rect.height) };
  }
  function scratch(e){
    const p=pos(e);
    ctx.globalCompositeOperation='destination-out';
    ctx.beginPath(); ctx.arc(p.x,p.y,22,0,Math.PI*2); ctx.fill();
    checkProgress();
  }
  function checkProgress(){
    clearedPixels++;
    if(clearedPixels>28) document.getElementById('scratchBtn').disabled=false;
  }
  canvas.addEventListener('mousedown',e=>{drawing=true; scratch(e);});
  canvas.addEventListener('mousemove',e=>{ if(drawing) scratch(e);});
  window.addEventListener('mouseup',()=>drawing=false);
  canvas.addEventListener('touchstart',e=>{drawing=true; scratch(e); e.preventDefault();},{passive:false});
  canvas.addEventListener('touchmove',e=>{ if(drawing) scratch(e); e.preventDefault();},{passive:false});
  canvas.addEventListener('touchend',()=>drawing=false);
}

function pick(btn){
  document.querySelectorAll('.qopt').forEach(b=>b.classList.remove('picked'));
  btn.classList.add('picked');
  document.getElementById('finalBtn').disabled=false;
}
