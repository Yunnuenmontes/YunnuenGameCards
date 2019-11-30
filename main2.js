let Game={
  jugadores:[],
  cartas:[],
  retos:[],
  lastGame:null,
  index:null,
  selected:null
};
let tapa,question;
let canvas,ctx,raf,ctx2;
let audioElement;

function images(){
ctx2=document.getElementById('canvasInte').getContext('2d');
console.log(ctx2)
  return new Promise((resolve)=>{

    question=new Image(250,250);
    question.addEventListener('loadend',()=>{
      ctx2.drawImage(question,50,0,400,400)
      resolve();
    })
    question.src="./assets/miniGame/qm.png";
  })
}
function init(){

  audioElement= document.getElementById("audio");
  document.getElementById('divButton').addEventListener('click',function(){
    triggerMini();
  });

  canvas=document.getElementById('myCanvas')
  ctx = canvas.getContext('2d');
  canvas.addEventListener('click',(event)=>{
    if(Game.selected==null){
      let rand=Math.floor((Math.random() * Game.cartas.length) + 0);
      Game.selected=Game.cartas[rand];
      Game.index=rand;
    }
    else{
      Game.selected=null;
      document.getElementById('tituloAlerta').innerText="";
      document.getElementById('alerta').innerText="";
      document.getElementById('modalTop').style.visibility= 'hidden';
      document.getElementById('modalBottom').style.visibility= 'visible';
      document.getElementById('divButton').style.visibility= 'hidden';
      Game.cartas.splice(Game.index,1);
      if(Game.cartas.length==0){

      }
    }
    console.log("clicked")
  },false )
  raf=window.requestAnimationFrame(draw);

}



function draw(){
  ctx.globalCompositeOperation = 'destination-over';
  ctx.clearRect(0,0,400,500);

  if(Game.selected==null){
      ctx.drawImage(tapa,0, 0,300,400);

      document.getElementById('modalTop').style.visibility= 'hidden';
      document.getElementById('modalBottom').style.visibility= 'visible';
  }else{
    Game.selected.draw();

    document.getElementById('modalTop').style.visibility= 'visible';
    document.getElementById('modalBottom').style.visibility= 'hidden';
    document.getElementById('tituloAlerta').innerText=Game.selected.game
    document.getElementById('alerta').innerText=Game.selected.info;
    document.getElementById('alerta2').innerText=Game.selected.alert;
    if(Game.selected.value=='A' || Game.selected.value=='5' ){
        document.getElementById('divButton').style.visibility= 'visible';
    }else{
      document.getElementById('divButton').style.visibility= 'hidden';
    }
  }
  ctx.save();
  raf=window.requestAnimationFrame(draw);
}

async function create(){
  await images();
  console.log(MisJuegos);
  let count=0;
  for(var i in imgCard){
    for(var e in Map){
      count++;
      console.log(e)
      Game.cartas.push(
        {
        id:count,
        value:e,
        palo:imgCard[i].palo,
        color:imgCard[i].color,
        img:'./assets/Cards/'+e+imgCard[i].palo+".PNG",
        game:Map[e].key,
        info:(MisJuegos[Map[e].key]!=undefined)?MisJuegos[Map[e].key].desc:"",
        alert:(MisJuegos[Map[e].key]!=undefined)?MisJuegos[Map[e].key].alert:"",
        draw:function(){
            var tmp=new Image();
            tmp.src=this.img;
            ctx.drawImage(tmp,0, 0,300,400);
          }
        }
      )
    }
  }
  tapa=new Image();
  tapa.src="./assets/Cards/tapa.PNG";
  count=0;
  console.log(Game.cartas);
  init()
}


let track;
function triggerMini(){

  document.getElementById('root').style.display= 'none';
  document.getElementById('root2').style.display= 'flex';

  loadMiniGame()
  document.getElementById('tituloGeneral').innerText="Snorlax's Ballons";


}
