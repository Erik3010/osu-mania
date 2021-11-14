var x=Object.defineProperty,g=Object.defineProperties;var w=Object.getOwnPropertyDescriptors;var c=Object.getOwnPropertySymbols;var v=Object.prototype.hasOwnProperty,M=Object.prototype.propertyIsEnumerable;var u=(o,t,i)=>t in o?x(o,t,{enumerable:!0,configurable:!0,writable:!0,value:i}):o[t]=i,p=(o,t)=>{for(var i in t||(t={}))v.call(t,i)&&u(o,i,t[i]);if(c)for(var i of c(t))M.call(t,i)&&u(o,i,t[i]);return o},f=(o,t)=>g(o,w(t));const k=function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))e(s);new MutationObserver(s=>{for(const h of s)if(h.type==="childList")for(const a of h.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&e(a)}).observe(document,{childList:!0,subtree:!0});function i(s){const h={};return s.integrity&&(h.integrity=s.integrity),s.referrerpolicy&&(h.referrerPolicy=s.referrerpolicy),s.crossorigin==="use-credentials"?h.credentials="include":s.crossorigin==="anonymous"?h.credentials="omit":h.credentials="same-origin",h}function e(s){if(s.ep)return;s.ep=!0;const h=i(s);fetch(s.href,h)}};k();class b{constructor({ctx:t,start:i,end:e,color:s,width:h=1}){this.ctx=t,this.start=i,this.end=e,this.color=s,this.width=h}draw(){this.ctx.beginPath(),this.ctx.moveTo(this.start.x,this.start.y),this.ctx.lineTo(this.end.x,this.end.y),this.ctx.strokeStyle=this.color,this.ctx.lineWidth=this.width,this.ctx.stroke(),this.ctx.closePath()}}class d{constructor({ctx:t,x:i,y:e,width:s,height:h,color:a,hoverColor:n=null,isHover:r=!1,strokeColor:l=null}){this.ctx=t,this.x=i,this.y=e,this.width=s,this.height=h,this.color=a,this.hoverColor=n,this.isHover=r,this.strokeColor=l}draw(){this.ctx.save(),this.ctx.beginPath(),this.ctx.rect(this.x,this.y,this.width,this.height),this.ctx.fillStyle=this.isHover?this.hoverColor:this.color,this.ctx.fill(),this.strokeColor&&(this.ctx.strokeStyle=this.strokeColor,this.ctx.stroke()),this.ctx.closePath(),this.ctx.restore()}}class H{constructor({ctx:t,x:i,y:e,text:s,color:h,textAlign:a,textBaseline:n,fontFamily:r,fontSize:l}){this.ctx=t,this.x=i,this.y=e,this.text=s,this.color=h,this.textAlign=a,this.textBaseline=n,this.fontFamily=r,this.fontSize=l}draw(){this.ctx.beginPath(),this.ctx.font=`${this.fontSize}px ${this.fontFamily}`,this.ctx.textAlign=this.textAlign,this.ctx.textBaseline=this.textBaseline,this.ctx.fillStyle=this.color,this.ctx.fillText(this.text,this.x,this.y),this.ctx.closePath()}}class S extends d{constructor({ctx:t,x:i,y:e,width:s,height:h,color:a,hoverColor:n,isHover:r,key:l,onHitTile:y=()=>{}}){super({ctx:t,x:i,y:e,width:s,height:h,color:a,hoverColor:n,isHover:r});this.key=l,this.highlight=null,this.text==null,this.onHitTile=y,this.initText(),this.initHighlight(),this.listener()}draw(){super.draw(),this.text.draw(),this.isHover&&this.highlight.draw()}initText(){this.text=new H({ctx:this.ctx,x:this.x+this.width/2,y:this.y+this.height/2,text:this.key,color:"#fff",fontSize:24,fontFamily:"Arial",textAlign:"center",textBaseline:"middle"})}initHighlight(){const t={x:this.x,y:this.y-200,width:this.width,height:200-22},i=this.ctx.createLinearGradient(0,t.y,0,this.y);i.addColorStop(0,"transparent"),i.addColorStop(1,"#fff"),this.highlight=new d(f(p({},t),{ctx:this.ctx,color:i}))}listener(){window.addEventListener("keydown",this.keyDownHandler.bind(this)),window.addEventListener("keyup",this.keyUpHandler.bind(this))}keyDownHandler(t){!this.isValidKey(t.code)||(this.isHover=!0,this.onHitTile(this.key))}keyUpHandler(t){!this.isValidKey(t.code)||(this.isHover=!1)}isValidKey(t){return t===`Key${this.key}`}}class C extends d{constructor({ctx:t,x:i,y:e,width:s,height:h,color:a,strokeColor:n}){super({ctx:t,x:i,y:e,width:s,height:h,color:a,strokeColor:n})}}class L extends d{constructor({ctx:t,x:i,y:e,width:s,height:h,color:a,speed:n,hitAt:r,position:l}){super({ctx:t,x:i,y:e*-1,width:s,height:h,color:a});this.speed=n,this.hitAt=r,this.position=l,this.hitted=!1,this.passed=!1}draw(){super.draw()}update(t){this.draw(),this.y=this.hitAt+t*this.speed}}const T="/osu-mania/";class P{static async fetchSongMap(){return fetch(`${T}songs/1.unforgiving/map.json`).then(t=>t.json())}}class E{constructor({canvas:t,timeEl:i,scoreEl:e}){this.canvas=t,this.ctx=this.canvas.getContext("2d"),this.timeEl=i,this.scoreEl=e,this.song={},this.tiles=[],this.keys=[],this.lines=[],this.border=null,this.interval=null,this.fps=1e3/30,this.laneCount=4,this.pianoKeysPosition={width:this.canvas.width/this.laneCount,height:140},this.borderPosition={top:22,height:15},this.offsetHeight=this.canvas.height-this.pianoKeysPosition.height-this.borderPosition.height,this.keysMap=["D","F","J","K"],this.ms=0,this.start=0,this.speedModes={slow:.5,normal:1,hardcore:2},this.speed=this.speedModes.normal,this.hitTolerance=50,this.pause=!1,this.pauseStart=null}async init(t){this.speed=this.speedModes[t],this.start=Date.now(),this.song=await P.fetchSongMap(),this.initUI(),this.initTiles(),this.animate()}initUI(){this.initPianoKeys(),this.initLine(),this.initBorder()}initTiles(){const t=this.canvas.width/this.laneCount;this.song.hitObjects.forEach(i=>{const e=-i.hitAt*this.speed+this.offsetHeight,s=new L({ctx:this.ctx,x:(i.position-1)*t,y:e,hitAt:e,position:i.position-1,speed:this.speed,width:this.canvas.width/this.laneCount,height:30,color:"#ffb930"});this.tiles.push(s)})}initLine(){const{width:t,height:i}=this.pianoKeysPosition;Array(this.laneCount+1).fill("").forEach((e,s)=>{this.lines.push(new b({ctx:this.ctx,start:{x:s*t,y:0},end:{x:s*t,y:this.canvas.height-i-this.borderPosition.top},color:"#868686"}))})}initBorder(){const{height:t}=this.pianoKeysPosition;this.border=new C({ctx:this.ctx,x:0,y:this.canvas.height-t-this.borderPosition.top,width:this.canvas.width,height:this.borderPosition.height,color:"#363636",strokeColor:"#fff"})}initPianoKeys(){const{width:t,height:i}=this.pianoKeysPosition;this.keysArea=new d({ctx:this.ctx,x:0,y:this.canvas.height-i-this.borderPosition.height,width:this.canvas.width,height:this.canvas.height,color:"#0f0f17"}),this.keysMap.forEach((e,s)=>{this.keys.push(new S({height:i,key:e,ctx:this.ctx,x:s*t+2,y:this.canvas.height-i,width:t-4,color:"#ffb930",hoverColor:"#d69b27",onHitTile:this.hitTileHandler.bind(this)}))})}draw(){this.tiles.forEach(t=>!t.passed&&!t.hitted&&t.update(this.ms)),this.keysArea.draw(),this.keys.forEach(t=>t.draw()),this.lines.forEach(t=>t.draw()),this.border.draw(),this.timeEl.innerHTML=(this.ms/1e3).toFixed(2),this.scoreEl.innerHTML=`${this.score}%`}hitTileHandler(t){this.tiles.forEach(i=>{this.isTileHitted(i,t)&&(i.hitted=!0,i.passed=!0)})}vanishTiles(){this.tiles.forEach(t=>{t.y>this.offsetHeight+this.hitTolerance&&!t.hitted&&!t.passed&&(t.passed=!0)})}animate(){if(this.isFinish||this.pause){this.isFinish&&alert(`Your score: ${this.score}%`);return}this.ms=Date.now()-this.start,this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height),this.draw(),this.vanishTiles(),this.interval=setTimeout(this.animate.bind(this),this.fps)}isTileHitted(t,i){return t.y+t.height>=this.offsetHeight-this.hitTolerance&&t.y<=this.offsetHeight+this.hitTolerance&&!t.hitted&&!t.passed&&t.position===this.keysMap.indexOf(i)}pauseGame(){this.pause=!0,this.pauseStart=Date.now()}resumeGame(){this.pause=!1;const t=Date.now()-this.pauseStart;this.start+=t,this.interval=setTimeout(this.animate.bind(this),this.fps)}get score(){const t=this.tiles.filter(e=>e.hitted).length,i=this.tiles.filter(e=>e.passed).length;return(i?t/i*100:0).toFixed(2)}get isFinish(){return this.ms>=this.song.hitObjects[this.song.hitObjects.length-1].hitAt+1e3}}class m{constructor({modal:t,initialValue:i}){this.modal=t,this.modalContent=this.modal.querySelector(".modal"),this.isShowModal=i,this.resolveCallback=null}init(){this.isShowModal?this.openModal():this.closeModal(),this.listener()}listener(){this.modalContent.addEventListener("animationend",()=>{this.modal.style.display=this.isShowModal?"flex":"none",this.resolveCallback&&(this.resolveCallback(),this.resolveCallback=null)})}closeModal(){return new Promise(t=>{this.isShowModal=!1,this.modalContent.classList.add("hide-modal"),this.modalContent.classList.remove("show-modal"),this.resolveCallback=t})}openModal(){return new Promise(t=>{this.isShowModal=!0,this.modal.style.display="flex",this.modalContent.classList.remove("hide-modal"),this.modalContent.classList.add("show-modal"),this.resolveCallback=t})}}class G{constructor({game:t,startGameButton:i,resumeGameButton:e,speedLevelRadios:s}){var h;this.game=t,this.startModal=null,this.pauseModal=null,this.speedLevelRadios=s,this.selectedLevel=(h=this.speedLevelRadios.find(a=>a.checked))==null?void 0:h.value,this.startGameButton=i,this.resumeGameButton=e}async init(){this.initStartModal(),this.initPauseModal(),this.listener()}listener(){this.speedLevelRadios.forEach(t=>t.addEventListener("change",this.speedModeChangeHandler.bind(this))),window.addEventListener("keydown",this.pauseGameHandler.bind(this)),this.startGameButton.addEventListener("click",this.startGameHandler.bind(this)),this.resumeGameButton.addEventListener("click",this.resumeGameHandler.bind(this))}initStartModal(){this.startModal=new m({modal:document.querySelector("#start-modal"),initialValue:!0}),this.startModal.init()}initPauseModal(){this.pauseModal=new m({modal:document.querySelector("#pause-modal"),initialValue:!1}),this.pauseModal.init()}speedModeChangeHandler(t){!t.target.checked||(this.selectedLevel=t.target.value)}async startGameHandler(){await this.startModal.closeModal(),this.game.init(this.selectedLevel)}async pauseGameHandler(t){t.code!=="Escape"||this.game.ms===0||(this.game.pauseGame(),await this.pauseModal.openModal())}async resumeGameHandler(){await this.pauseModal.closeModal(),this.game.resumeGame()}}const A=document.querySelector("#canvas"),B=document.querySelector(".time-container span"),K=document.querySelector(".score-container span"),q=new E({canvas:A,timeEl:B,scoreEl:K}),F=new G({game:q,startGameButton:document.querySelector("#start-btn"),resumeGameButton:document.querySelector("#resume-btn"),speedLevelRadios:[...document.querySelectorAll(".speed-mode input[type=radio]")]});window.onload=async()=>await F.init();