(() => {
const scene=document.querySelector('#deck-scene');
if(!scene)return;
const cards=[
 {title:'Build Market Intelligence',tag:'01 / DEFINE',icon:'◎',items:['ICP Refinement','Category Positioning','Competitive Battlecards','Messaging'],foot:'Founder sprints, independent research and real ICP conversations.'},
 {title:'Brand Building',tag:'02 / ALIGN',icon:'◈',items:['Consistent Look & Feel','Content Arcs','Website Copy','Sales Assets','Investor Pitch Decks'],foot:'A consistent identity and narrative across every buyer touchpoint.'},
 {title:'GTM Automation',tag:'03 / ACTIVATE',icon:'↗',items:['ICP Builder','Pipeline Generation','Outreach','Engagement','Conversion'],foot:'Build, run, refine and hand over workflows for repeatable pipeline.'}
];
const nodes=cards.map((c,i)=>{
 const el=document.createElement('article');
 el.className='deck-card';
 el.innerHTML=`<div class="deck-card-head"><span class="deck-symbol" aria-hidden="true">${c.icon}</span><div><div class="deck-kicker">${c.tag}</div><h3>${c.title}</h3></div></div><ul class="deck-points">${c.items.map(item=>`<li>${item}</li>`).join('')}</ul><div class="deck-card-foot">${c.foot}</div>`;
 scene.appendChild(el);return el;
});
const dots=[...document.querySelectorAll('.deck-dot')],pause=document.querySelector('#deck-pause');
let current=0,playing=!matchMedia('(prefers-reduced-motion: reduce)').matches,timer=null;
function render(){
 nodes.forEach((n,i)=>{const depth=(i-current+3)%3;n.dataset.depth=depth;n.setAttribute('aria-hidden',depth===0?'false':'true')});
 dots.forEach((d,i)=>d.setAttribute('aria-current',i===current?'true':'false'));
}
function next(){current=(current+1)%3;render()}
function stop(){if(timer)clearInterval(timer);timer=null}
function start(){stop();if(playing)timer=setInterval(next,4600)}
dots.forEach((d,i)=>d.addEventListener('click',()=>{current=i;render();start()}));
pause.addEventListener('click',()=>{playing=!playing;pause.textContent=playing?'Ⅱ':'▶';pause.setAttribute('aria-label',playing?'Pause card animation':'Play card animation');start()});
scene.addEventListener('mouseenter',stop);
scene.addEventListener('mouseleave',start);
scene.addEventListener('focusin',stop);
scene.addEventListener('focusout',start);
document.addEventListener('visibilitychange',()=>document.hidden?stop():start());
render();start();
})();