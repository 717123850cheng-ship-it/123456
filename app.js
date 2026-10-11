const steps = [
  {title:"打开装备商店", text:"在《王者荣耀》内手动打开装备商店，确认当前金币和装备栏。"},
  {title:"选择要替换的装备", text:"确认哪件装备可以出售或替换。注意：出售装备会改变当前出装，不要在不确定时操作。"},
  {title:"购买复活甲", text:"在游戏商店中手动找到并购买复活甲（贤者的庇护），确认购买成功。"},
  {title:"确认装备栏", text:"关闭商店或回到对局，确认装备图标和栏位正确。"},
  {title:"记录后续换装", text:"复活甲触发或无法继续使用时，手动记录状态并按自己的预设方案调整装备。"}
];
let current=-1, timerId=null, remaining=0;
const title=document.getElementById('stepTitle'), text=document.getElementById('stepText'), bar=document.getElementById('progressBar');
const list=document.getElementById('stepList');
steps.forEach((s,i)=>{const li=document.createElement('li');li.textContent=s.title;li.dataset.i=i;list.appendChild(li)});
function renderStep(){
  if(current<0){title.textContent="准备换装";text.textContent="先在游戏内打开装备商店。准备好后，按下面按钮逐步查看操作。";bar.style.width="0%";}
  else if(current>=steps.length){title.textContent="流程已查看完毕";text.textContent="请在游戏内自行确认每一步是否完成。需要重新查看时点击“重置流程”。";bar.style.width="100%";}
  else {title.textContent=steps[current].title;text.textContent=steps[current].text;bar.style.width=((current+1)/steps.length*100)+"%";}
  [...list.children].forEach((li,i)=>li.classList.toggle('active',i===current));
  document.getElementById('nextBtn').textContent=current<0?"开始流程":current>=steps.length-1?"完成流程":"下一步";
}
document.getElementById('nextBtn').addEventListener('click',()=>{if(current<steps.length)current++;renderStep()});
document.getElementById('resetBtn').addEventListener('click',()=>{current=-1;renderStep()});
document.querySelectorAll('.chip').forEach(btn=>btn.addEventListener('click',()=>{
  document.querySelectorAll('.chip').forEach(b=>b.classList.toggle('selected',b===btn));
  document.getElementById('gearStatus').textContent='当前记录：'+btn.dataset.state;
}));
const timerDisplay=document.getElementById('timerDisplay');
function stopTimer(){if(timerId)clearInterval(timerId);timerId=null;remaining=0;timerDisplay.textContent='未启动'}
document.querySelectorAll('[data-seconds]').forEach(btn=>btn.addEventListener('click',()=>{
  stopTimer();remaining=Number(btn.dataset.seconds);timerDisplay.textContent=remaining+' 秒';
  timerId=setInterval(()=>{remaining--;timerDisplay.textContent=remaining>0?remaining+' 秒':'时间到';if(remaining<=0){clearInterval(timerId);timerId=null;if(navigator.vibrate)navigator.vibrate([150,80,150]);}},1000);
}));
document.getElementById('stopTimer').addEventListener('click',stopTimer);
renderStep();