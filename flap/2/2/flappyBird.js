var cvs = document.getElementById("canvas");
var ctx = cvs.getContext("2d");

// load images

var bird = new Image();
var bg = new Image();
var fg = new Image();
var flap = new Image();
var pipeNorth = new Image();
var pipeSouth = new Image();

bird.src = "images/bird2.png";
flap.src="images/flap.png";
pipeNorth.src = "images/pipeNorth.png";
pipeSouth.src = "images/pipeSouth.png";


var gap = 200 ; // ช่องกว่าง Gap
var constant;

var bX = 150; // spawn X
var bY = 130; // spawn Y

var gravity = 0;

var score = 0;
var check = 0;
// audio files

var fly = new Audio();
var scor = new Audio();

fly.src = "sounds/fly.mp3";
scor.src = "sounds/score.mp3";

// on key down
this.keydownHandler = function (event) {
      if (event.keyCode === 13) {
        draw();
      }
      window.removeEventListener("keydown", this.keydownHandler, false);
    };

document.onkeydown = function(e) {
   // var del = 
    switch (e.keyCode) {
        case 13:
            document.getElementById('test').style.display="none"; //Edit
            return draw();
        case 38:
            return moveUp();
        case 40:
            return moveDown();
        case 32:
            location.reload();
    }}
function moveUp(){

    bY -= 25;
    fly.play();
}
function moveDown(){
    bY += 25;
    fly.play();
}

clearScreen = function () {
    this.ctx.clearRect(0, 0, 900, 500);
  };
  
   

        
        

    


// pipe coordinates

var pipe = [];

pipe[0] = {
    x : cvs.width,
    y : -100
};
        
        
        ctx.fillStyle = "white";
        ctx.font = "15pt Arial";
        ctx.fillText("Press enter to play!", 360, 400);
        ctx.restore();
        

function draw(){

    
   
    clearScreen();
    
    for(var i = 0; i < pipe.length; i++){

        constant = pipeNorth.height+gap; //ความกว้าง Gap
        ctx.drawImage(pipeNorth,pipe[i].x,pipe[i].y);
        ctx.drawImage(pipeSouth,pipe[i].x,pipe[i].y+constant);
        if (score < 3){
          pipe[i].x-=2;
        }
       
        else if ( score <= 25){
          pipe[i].x-=5;
        }
        else {
          pipe[i].x-=10;
        }
        if( pipe[i].x == 400 ){
            pipe.push({
                x : cvs.width,
                y : Math.floor(Math.random()*pipeNorth.height)-pipeNorth.height
            });
        }

        // detect collision

        if( bX + bird.width >= pipe[i].x && bX <= pipe[i].x + pipeNorth.width && (bY <= pipe[i].y + pipeNorth.height || bY+bird.height >= pipe[i].y+constant) || bY + bird.height >=  cvs.height - fg.height){
            ctx.drawImage(bird,bX,bY);
            gameOver();
            i=pipe.length
            ctx.fillStyle = "#fff";
    ctx.font = "20px Verdana";
    ctx.fillText("Score : "+score,10,cvs.height-20)

        }

        if(pipe[i].x == 250){
            score++;
            scor.play();
        }


    }

    ctx.drawImage(fg,0,cvs.height - fg.height);

    ctx.drawImage(bird,bX,bY);

    bY += gravity;

    ctx.fillStyle = "#fff";
    ctx.font = "20px Verdana";
    ctx.fillText("Score : "+score,10,cvs.height-20);

    requestAnimationFrame(draw);

}

function gameOver(){
    clearInterval(this.intervalID);

    this.ctx.save();
    this.ctx.fillStyle = "white";
    this.ctx.font = "40pt Arial";
    this.ctx.fillText("GAME OVER", 300, 300);
    this.ctx.font = "15pt Arial";
    this.ctx.fillText("Press spacebar to play again!", 350, 350);
    this.ctx.restore();

    document.addEventListener("keydown", document.onkeydown, false);
}
ctx.drawImage(bird,bX,bY);

