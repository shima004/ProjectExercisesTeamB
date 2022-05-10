"use strict";
$("btn1").on("click",function(){
class Rectangle{
    constructor(x,y,width,height){
        this.mWidth = MAG * 4;
        this.mHeight = MAG * 4;
    }

    get pCX(){
        return(this.mX + this.mWidth/2);
    }
    set pCX(value){
        this.mX = value - this.mWidth/2;
    }
    get pCY(){
        return(this.mY + this.mHeight/2);
    }
    set pCY(value){
        this.mY = value - this.mHeight/2;
    }
}

const WIDTH = 720;
const HEIGHT = 540;
const MESH = 24;
const MAG = 3;
const COLUMN = 14;
const ROW = 8;

var gScore = 0;
var gLife = 3;

class Ball extends Rectangle{
    constructor(){
        super(0, 0, MAG * 4, MAG * 4);
    }
    draw(g){
        g.fillStyle="#ffffff";
        g.fillRect(this.mX,this.mY,this.mWidth,this.mHeight);
    }
    
    start()
    {
        this.pCX = WIDTH/2;
        this.pCY = MESH * 12;
    }
}
var gBall = new Ball();

class Player extends Rectangle{

    constructor(){
        super(0, 0, MESH, MESH);
    }

    draw(g){
        g.fillStyle="#00ffff";
        g.fillRect(this.mX,this.mY,MESH,MESH);
    }

    start(){
        this.pCX = WIDTH / 2;
        this.pCY = HEIGHT - MESH * 3;
    }

    tick(){
        this.mX = Math.max(MESH        ,this.mX-gKey[37]*MAG*2);
        this.mX = Math.min(WIDTH-MESH*2,this.mX+gKey[39]*MAG*2);
        this.mY = Math.max(MESH        ,this.mY-gKey[38]*MAG*2);
        this.mY = Math.min(HEIGHT-MESH*2,this.mY+gKey[40]*MAG*2);
    }
}

var gPlayer = new Player();

function DrawBlock(g,x,y){
    g.fillStyle = "#ffff00";
    g.fillRect(x+MAG,y+MAG,MESH*2-MAG*2,MESH-MAG*2);
}

function draw(){
    let g = document.getElementById("main").getContext("2d");

        g.fillStyle="#ffffff";
        g.fillRect(0,0,WIDTH,HEIGHT);
        g.fillStyle = "#000000";
        g.fillRect(MESH-MAG,MESH-MAG,WIDTH-MESH*2+MAG*2,HEIGHT-MESH+MAG*2);

        for(let y=0;y<ROW;y++){
            for(let x = 0; x<COLUMN;x++){
                DrawBlock(g,MESH*(x*2+1),(y+3)*MESH);
            }
        }

        gPlayer.draw(g);

        g.font="36px monospace";
        g.fillStyle="#ffffff";
        g.fillText("SCORE "+gScore,MESH*2,MESH*2.5);
        g.fillText("LIFE "+gLife,MESH*23,MESH*2.5);

        if(gLife <= 0){
            g.fillText("GAME OVER" ,WIDTH/2-MESH*3,HEIGHT/2);
        }

        gBall.draw(g);
}

function start(){
    gPlayer.start();
    gBall.start();
}

function tick(){
    gPlayer.tick();
}

// ========================= 01_avoid ==================================

const TIMER_INTERVAL = 33;

var gKey = new Uint8Array( 0x100 );
var gTimer;

//描画イベント
function onPaint(){
    console.log("onPaint" + gTimer);
    if(!gTimer){
        gTimer = performance.now()
    }
    if(gTimer + TIMER_INTERVAL<performance.now()){
        gTimer+=TIMER_INTERVAL;
        tick();
        draw();
    }
    requestAnimationFrame(onPaint);
}
//キーを押した時のイベント
window.onkeydown = function(ev){
    gKey[ev.keyCode]=1;
}
//キーを離した時のイベント
window.onkeyup = function(ev){
    gKey[ev.keyCode]=0;
}
//起動時のイベント
window.onload=function(){
    start();

    requestAnimationFrame(onPaint);
}
});