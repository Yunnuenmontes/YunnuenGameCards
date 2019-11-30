let players={
  p1:150,
  p1Live:true,
  p1Score:0,
  p2:150,
  p2Live:true,
  p2Score:0

}
let gameOver=false;
let roundTime=10;
let maxRadius=400;
let interval;

let canvasMini,ctxMini,raf2;
let image=new Image(250,250);
let Boom1=new Image(250,250);
let Boom2=new Image(250,250);
let Boom3=new Image(250,250);
let goku1=new Image(250,250);
let goku2=new Image(250,250);
let boo1=new Image(250,250);
let boo2=new Image(250,250);
let linea=new Image(100,250);
let tnt=new Image(250,250);

window.addEventListener('load',function(){
  loadImages().then(()=>{console.log("imagenes listas")})
})

function loadImages(){
  return new Promise((resolve,reject)=>{
    try{
      image.src='./assets/miniGame/snorlax1.png';
      Boom1.src='./assets/miniGame/snorlax2.png';
      Boom2.src='./assets/miniGame/snorlax3.png';
      Boom3.src='./assets/miniGame/snorlax4.png';
      goku1.src='./assets/miniGame/go1.png';
      goku2.src='./assets/miniGame/go3.png';
      boo1.src='./assets/miniGame/bo1.png';
      boo2.src='./assets/miniGame/bo3.png';
      linea.src='./assets/miniGame/linea.png';
      tnt.src='./assets/miniGame/tnt.png'
      image.addEventListener('loadend',(e)=>{
            console.log('load image')
            ball1.image=image;
            ball2.image=image;
            goku1.addEventListener('loadend',()=>{
              console.log("goku1 listo")
              person1.image=goku1;

              //AQUI
              //goku2
            })

        })
      goku2.addEventListener('loadend',()=>{
          console.log("goku2 listo");
          resolve();
        })
      boo1.addEventListener('loadend',()=>{
        console.log("boo1 ok")
      })
      boo2.addEventListener('loadend',()=>{
        console.log("boo2 ok")
      })
      linea.addEventListener('loadend',()=>{
        console.log("linea ok")
      })
      Boom1.addEventListener('loadend',(e)=>{

          ball1.boom.push(Boom1);
          ball2.boom.push(Boom1);
          console.log("load Boom")
        })
      Boom2.addEventListener('loadend',(e)=>{
          ball1.boom.push(Boom2);
          ball2.boom.push(Boom2);
          console.log("load Boom")
        })
      Boom3.addEventListener('loadend',(e)=>{
        ball1.boom.push(Boom2);
        ball2.boom.push(Boom2);
        console.log("load Boom")
      })
    }catch(ex){
      console.log(ex);
      reject();
    }


  })
}


function initMini(){

  canvasMini=document.getElementById('miniCanvas')
  ctxMini = canvasMini.getContext('2d');
  raf2=window.requestAnimationFrame(drawMini);

}

let person1={
  x:80,
  y:400,
  img:0,
  image:null,
  draw:function(){
    if(this.img==0){
        ctxMini.drawImage(goku1, this.x, this.y);
    }else{
        ctxMini.drawImage(goku2, this.x, this.y);
    }

  }
}
let person2={
  x:400,
  y:400,
  img:0,
  image:null,
  draw:function(){
    if(this.img==0){
        ctxMini.drawImage(boo1, this.x, this.y);
    }else{
        ctxMini.drawImage(boo2, this.x, this.y);
    }

  }
}
var ball2 = {
  x: 400,
  y: 200,
  radius: players.p1,
  image:null,
  color: 'red',
  boom:[],
  out:null,
  draw: function() {
      if(this.out==null){
        var w=this.radius+5;
        var h=this.radius;

        ctxMini.drawImage(this.image, this.x, this.y,w,h);

      }else{
        ctxMini.drawImage(this.boom[this.out], this.x, this.y,500,500);
      }
    }
};
var ball1 = {
  x: 80,
  y: 200,
  radius: players.p2,
  color: 'blue',
  image:null,
  boom:[],
  out:null,
  draw: function() {
      if(this.out==null){

        var w=this.radius+5;
        var h=this.radius;
        ctxMini.drawImage(this.image, this.x, this.y,w,h);
      }else{
        ctxMini.drawImage(this.boom[this.out], this.x, this.y,500,500);
      }
    }
};
window.addEventListener('keyup',(event)=>{
if(!gameOver){
  if(event.key=="a" || event.key=="A"){
    var x=ball1.radius+10;
    ball1.radius=x;
    if(players.p1Live){
      var t=players.p1Score+(2*ball1.radius);
        players.p1Score=t;

        if(person1.img==0){

          person1.img=1;
        }else if(person1.img==1){

          person1.img=0;
        }
    }

  }
  if(event.key=="+"){
    var x=ball2.radius+10;
    ball2.radius=x;
    if(players.p2Live){
      var t=players.p2Score+(2*ball2.radius);
        players.p2Score=t;

        if(person2.img==0){

          person2.img=1;
        }else if(person2.img==1){

          person2.img=0;
        }
    }
  }
}else{
  console.log("ya no se lanza evento")
}
})



function drawMini(par){

  if(!gameOver){
  ctxMini.globalCompositeOperation = 'destination-over';
  ctxMini.clearRect(0,0,1200,800);
  ball1.draw();
  ball2.draw();
  ctxMini.save();
  timer();
  ctxMini.font = "bold 45px Arial";
  ctxMini.fillStyle = "#2f74b7";

  ctxMini.fillText(`Score:`, 300, 50);
  ctxMini.fillText(`player1: ${players.p1Score}`, 330, 90);
  ctxMini.fillText(`player2: ${players.p2Score}`, 330, 130);
  ctxMini.fillStyle = "white";
  ctxMini.fillText(`p1`, 30, 400);
  ctxMini.fillText(`p2`, 460, 400);
  ctxMini.drawImage(linea, 80,200,100,300);
  ctxMini.drawImage(tnt, 100,450,50,50);
  ctxMini.drawImage(linea, 380,200,100,300);
  ctxMini.drawImage(tnt, 400,450,50,50);
  person1.draw();
  person2.draw();
  if(ball1.radius>maxRadius){
    console.log('se revienta1');
    players.p2Live=false;
    if(ball1.out==null){
      ball1.out=0;
      ball1.draw();
    }else{
        ball1.out++;
        if(ball1.out<ball1.boom.length){
          ball1.draw();
        }else{
          endGame()
        }
      }
    }
  if(ball2.radius>maxRadius){
      console.log('se revienta2');
      players.p1Live=false;
      if(ball2.out==null){
        ball2.out=0;
        ball2.draw();
      }else{
          ball2.out++;
          if(ball2.out<ball2.boom.length){
            ball2.draw();
          }else{
            endGame()
          }
        }
  }
  raf2 = window.requestAnimationFrame(drawMini);
  }
}



function timer(){

  if(ball1.radius>players.p1){
    var x=ball1.radius-0.5
    ball1.radius=x;
  }
  if(ball2.radius>players.p2){
    var x=ball2.radius-0.5;
        ball2.radius=x;
  }

}


function loadMiniGame(){

  document.getElementById("reset").addEventListener('click',()=>{
    console.log("reset")
    Reset();
  })
  document.getElementById("back").addEventListener('click',()=>{
    document.getElementById('root').style.display= 'flex';
    document.getElementById('root2').style.display= 'none';
    document.getElementById('tituloGeneral').innerText="¿Le EnTrAs o Te RaJaS?";
    audioElement.pause();
    audioElement.currentTime = 0;
  })

  Reset()
}

function endGame(){
  gameOver=true;
  ctxMini.globalCompositeOperation = 'destination-over';
  ctxMini.clearRect(0,0,1200,800); // limpiar canvas
  if(players.p1Live==true && players.p2Live==false){
    ctxMini.font = "30px Arial";
    ctxMini.fillStyle = "#d9e009";
    ctxMini.fillText(`player 1 Wins!!!`, 300, 300);
    ctxMini.fillText(`Score : ${players.p1Score}`, 300, 350);


  }
  if(players.p1Live==false && players.p2Live==true){
    ctxMini.font = "30px Arial";
    ctxMini.fillStyle = "#d9e009";
    ctxMini.fillText(`player 2 Wins!!!`, 300, 300);
    ctxMini.fillText(`Score : ${players.p2Score}`, 300, 350);

  }
  if(players.p1Live==false && players.p2Live==false){
    ctxMini.font = "30px Arial";
    ctxMini.fillStyle = "#d9e009";
    ctxMini.fillText(`Draw!!!`, 300, 300);

  }
  if(players.p1Live==true && players.p2Live==true){

    ctxMini.font = "30px Arial";
    ctxMini.fillStyle = "#d9e009";
    if(players.p1Score>players.p2Score){
      ctxMini.fillText(`player 1 Wins!!!`, 300, 300);
      ctxMini.fillText(`Score : ${players.p1Score}`, 300, 350);
    }
    if(players.p1Score<players.p2Score){
      ctxMini.fillText(`player 2 Wins!!!`, 300, 300);
      ctxMini.fillText(`Score : ${players.p2Score}`, 300, 350);
    }
    if(players.p1Score==players.p2Score){
      ctxMini.fillText(`Draw!!!`, 300, 300);
    }


  }
  clearInterval(interval);


  window.cancelAnimationFrame(raf2);
}
function Reset(){
  clearInterval(interval);
  players={
    p1:150,
    p1Live:true,
    p1Score:0,
    p2:150,
    p2Live:true,
    p2Score:0
  }
  ball1.out=null;
  ball2.out=null;
  ball1.radius=150;
  ball2.radius=150;
  gameOver=false;
  roundTime=10;

  initMini();
}
