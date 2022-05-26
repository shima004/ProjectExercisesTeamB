"use strict";

// class Rectangle{
//     constructor(x,y,width,height){
//         this.mWidth = width;
//         this.mHeight = height;
//     }
//     contains(x,y){
//         return(this.mX<x&&x<this.mX+this.mWidth&&this.mY<y&&y<this.mY+this.mHeight);
//     }
//     get pCX(){
//         return(this.mX + this.mWidth/2);
//     }
//     set pCX(value){
//         this.mX = value - this.mWidth/2;
//     }
//     get pCY(){
//         return(this.mY + this.mHeight/2);
//     }
//     set pCY(value){
//         this.mY = value - this.mHeight/2;
//     }
// }

// const WIDTH = 720;
// const HEIGHT = 540;
// const MESH = 24;
// const MAG = 3;
// const COLUMN = 14;
// const ROW = 8;
// const PALETTE = ["#ff0000","#ff00ff","#00ff00","#ffff00"];

// var gBreak = [];
// var gScore = 0;
// var gLife = 3;
// var gWait;
// var gSE = [];

// class Ball extends Rectangle{
//     constructor(){
//         super(0, 0, MAG * 4, MAG * 4);
        
//     }
//     draw(g){
//         g.fillStyle="#ffffff";
//         g.fillRect(this.mX,this.mY,this.mWidth,this.mHeight);
//     }
    
//     move(){
//         this.mX += this.mDX;
//         this.mY += this.mDY;

//         if(gPlayer.contains(this.mX,this.mY)){
//             let a = Math.atan2(this.pCY - gPlayer.pCY,this.pCX-gPlayer.pCX);
//             this.mDX = Math.cos(a);
//             this.mDY = Math.sin(a);
//             this.mDY = Math.min(this.mDY,-0.25);
//             this.mY += this.mDY;
//         }

//         let x=Math.floor((this.pCX - MESH) / (MESH * 2));
//         let y=Math.floor((this.pCY - MESH * 3) / MESH);

//         if(x>=0&&x<COLUMN&&
//             y>=0&&y<ROW){
//                 let i=y*COLUMN+x;
//                 if(!gBreak[i]){
//                     gBreak[i] = 1;
//                     gScore++;
//                     let dx = Math.abs(this.pCX - (x + 1)*MESH*2);
//                     let dy = Math.abs(this.pCY - (y + 3.5) * MESH);
//                     if(dx<dy*2){
//                         this.mDY = -this.mDY;
//                     } else {
//                         this.mDX = -this.mDX;
//                     }
//                 }
//             }
//         if(this.pCX<MESH||this.pCX>WIDTH - MESH){
//             this.mDX = -this.mDX;
//         }
//         if(this.pCY<MESH){
//             this.mDY = -this.mDY;
//         }
//     }

//     start(){
//         this.pCX = WIDTH/2;
//         this.pCY = MESH * 12;
//         this.mDX = Math.random()/5-0.1;
//         this.mDY = 1;
//         this.mSpeed = 32;
//     }

//     tick(){
//         for(let i = 0; i<this.mSpeed/4;i++){
//             this.move();
//         }
//         if(this.mY>HEIGHT){
//             if(!--gLife){
//                 return;
//             }
//             start();
//         }
//     }
// }
// var gBall = new Ball();

// class Player extends Rectangle{

//     constructor(){
//         super(0, 0, MESH*2, MESH);
//     }

//     draw(g){
//         DrawBlock(g,this.mX,this.mY,"#00ffff");
//     }

//     start(){
//         this.pCX = WIDTH / 2;
//         this.pCY = HEIGHT - MESH * 2;
//     }

//     tick(){
//         this.mX = Math.max(MESH        ,this.mX-gKey[37]*MAG*4);
//         this.mX = Math.min(WIDTH-MESH*2,this.mX+gKey[39]*MAG*4);
//         //this.mY = Math.max(MESH        ,this.mY-gKey[38]*MAG*4);
//         //this.mY = Math.min(HEIGHT-MESH*2,this.mY+gKey[40]*MAG*4);
//     }
// }

// var gPlayer = new Player();

// function DrawBlock(g,x,y,style){
//     g.fillStyle = style;
//     g.fillRect(x+MAG,y+MAG,MESH*2-MAG*2,MESH-MAG*2);
// }

// function draw(){
//     let g = document.getElementById("main").getContext("2d");
//         g.font = "bold" + MESH * MAG + "px monospace";
//         g.fillStyle="#ffffff";
//         g.fillRect(0,0,WIDTH,HEIGHT);
//         g.fillStyle = "#000000";
//         g.fillRect(MESH-MAG,MESH-MAG,WIDTH-MESH*2+MAG*2,HEIGHT-MESH+MAG*2);

//         for(let y=0;y<ROW;y++){
//             for(let x = 0; x<COLUMN;x++){
//                 if(!gBreak[y*COLUMN+x]){
//                     DrawBlock(g,MESH*(x*2+1),(y+3)*MESH,PALETTE[y>>1]);
//                 }
//             }
//         }

//         gPlayer.draw(g);

//         g.font="36px monospace";
//         g.fillStyle="#ffffff";
//         g.fillText("SCORE "+gScore,MESH*2,MESH*2.5);
//         g.fillText("LIFE "+gLife,MESH*23,MESH*2.5);

//         if(gLife <= 0){
//             g.fillText("GAME OVER" ,WIDTH/2-MESH*3,HEIGHT/2+MESH);
//         }
//         if(gScore % (COLUMN * ROW)==0){
//             for(let y=0;y<ROW;y++){
//                 for(let x=0;x<COLUMN;x++){
//                     gBreak[y*COLUMN+x]=0;
//                 }
//             }
//         }

//         gBall.draw(g);
// }

// function start(){
//     gWait = 60;
//     gPlayer.start();
//     gBall.start();
// }

// function tick(){
//     if(!gLife){
//         return;
//     }
    
//     gPlayer.tick();
//     if(gWait){
//         gWait--;
//         return;
//     }
//     gBall.tick();
// }

// // ========================= 01_avoid ==================================
// const TIMER_INTERVAL = 33;

// var gKey = new Uint8Array( 0x100 );
// var gTimer;

// //描画イベント
// function onPaint(){
//     console.log("onPaint" + gTimer);
//     if(!gTimer){
//         gTimer = performance.now()
//     }
//     if(gTimer + TIMER_INTERVAL<performance.now()){
//         gTimer+=TIMER_INTERVAL;
//         tick();
//         draw();
//     }
//     requestAnimationFrame(onPaint);
// }
// //キーを押した時のイベント
// window.onkeydown = function(ev){
//     gKey[ev.keyCode]=1;
// }
// //キーを離した時のイベント
// window.onkeyup = function(ev){
//     gKey[ev.keyCode]=0;
// }
// //起動時のイベント
// window.onload=function(){
//     start();

//     requestAnimationFrame(onPaint);
// }

var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var x = canvas.width/2;
var y = canvas.height-30;
var dx = Math.random()*2+2;
var dy = (Math.random()*2+2)*-1;
var ballRadius = 10;
var paddleHeight = 10;
var paddleWidth = 75;
var paddleX = (canvas.width-paddleWidth)/2;
var rightPressed = false;
var leftPressed = false;
var brickRowCount = 5;
var brickColumnCount = 7;
var brickWidth = 60;
var brickHeight = 20;
var brickPadding = 10;
var brickOffsetTop = 60;
var brickOffsetLeft = 50;
var score = 0;
var lives = 3;
var level = 1;
var a = 0;
var gamestart = 0;
var breakcount = 0;
var bricks = [];
for(var c=0; c<brickColumnCount; c++) {
    bricks[c] = [];
    for(var r=0; r<brickRowCount; r++) {
        bricks[c][r] = { x: 0, y: 0, status: 1 };
    }
}
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
document.addEventListener("mousemove", mouseMoveHandler, false);

function mouseMoveHandler(e) {
    var relativeX = e.clientX - canvas.offsetLeft;
    if(relativeX > 0 && relativeX < canvas.width) {
        paddleX = relativeX - paddleWidth/2;
    }
}


function keyDownHandler(e) {
    if(e.key == "Right" || e.key == "ArrowRight") {
        rightPressed = true;
    }
    else if(e.key == "Left" || e.key == "ArrowLeft") {
        leftPressed = true;
    }
}

function keyUpHandler(e) {
    if(e.key == "Right" || e.key == "ArrowRight") {
        rightPressed = false;
    }   
    else if(e.key == "Left" || e.key == "ArrowLeft") {
        leftPressed = false;
    }
}
function GameStart(){
    gamestart = 1;
}
function GameReset(){
    document.location.reload();
}

function collisionDetection() {//衝突判定
    for(var c=0; c<brickColumnCount; c++) {
        for(var r=0; r<brickRowCount; r++) {
            var b = bricks[c][r];
            if(b.status == 1) {
                if(x > b.x && x < b.x+brickWidth && y > b.y && y < b.y+brickHeight) {
                    dy = -dy;
                    b.status=0;
                    breakcount++;
                    score=score+level;
                    if(breakcount%(brickRowCount*brickColumnCount)==0) {//ブロック復活
                        for(var c=0;c<brickColumnCount;c++){
                            for(var r=0;r<brickRowCount;r++){
                                bricks[c][r].status=1;
                            }
                        }
                        if(paddleWidth>20){//パドル大きさ変更
                            paddleWidth=paddleWidth-5;
                        }
                        level++;
                        if(dx>=0){
                            dx++;
                        } else {
                            dx--;
                        }
                        if(dy>=0){
                            dy++;
                        } else {
                            dy--;
                        }
                    }
                }
            } 
        }
    }
}

function drawScore() {
    ctx.font = "32px Arial";
    ctx.fillStyle = "#ff0000";
    ctx.fillText("Score: "+score, 8, 40);
}

function drawLives() {
    ctx.font = "32px Arial";
    ctx.fillStyle = "#00ff00";
    ctx.fillText("Lives: "+lives, canvas.width-150, 40);
}

function drawBall() {
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI*2);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}

function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddleX, canvas.height-paddleHeight, paddleWidth, paddleHeight);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}

function drawBricks() {
    for(var c=0; c<brickColumnCount; c++) {
        for(var r=0; r<brickRowCount; r++) {
            if(bricks[c][r].status == 1) {
                var brickX = (c*(brickWidth+brickPadding))+brickOffsetLeft;
                var brickY = (r*(brickHeight+brickPadding))+brickOffsetTop;
                bricks[c][r].x = brickX;
                bricks[c][r].y = brickY;
                ctx.beginPath();
                ctx.rect(brickX, brickY, brickWidth, brickHeight);
                ctx.fillStyle = "#ff0000";
                ctx.fill();
                ctx.closePath();
            }
        }
    }
}

function draw() {
    if(gamestart == 1){
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawBricks();
        drawBall();
        drawPaddle();
        drawScore();
        drawLives();
        collisionDetection();
        x += dx;
        y += dy;
    }
    else if(gamestart==-1){
        ctx.font = "32px Arial";
        ctx.fillStyle = "#ff0000";
        ctx.fillText("GAME OVER", 8, 40);
    }
    if(x + dx > canvas.width-ballRadius || x + dx < ballRadius) {
        dx = -dx;
    }
    if(y + dy < ballRadius) {
        dy = -dy;
    } else if(y + dy > canvas.height-ballRadius) {
        if(x > paddleX && x < paddleX + paddleWidth) {
            dy = -dy;
        }
        else {
            lives--;
            if(!lives) {
                postCoin(score);
                a=-1;
            }
            /*if(a==1){
                document.location.reload();
             }*/
            else {
                x = canvas.width/2;
                y = canvas.height-30;
                if(dy>=0){
                    dy = -dy;  
                }
                paddleX = (canvas.width-paddleWidth)/2;
            }
        }
    }
}


var interval = setInterval(draw, 10);