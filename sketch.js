var END =0;
var PLAY =1;
var gameState = PLAY;

var mortis, playSt;

var ghost, ghostAnim, ghostCollided;
var candy, lolipop, pumpkin;
var candyG, lolipopG, pumpkinG;
var enemy1img, enemy2img;
var enemy1G, enemy2G;
var streetImg, street;

var score = 0;
var gameOver, gameOverImg;

function preload(){
ghostAnim = loadAnimation("ghost1.png","ghost2.png");
ghostCollided = loadAnimation("ghost3.png");

candy = loadImage("candy.png");
lolipop = loadImage("lolipop.png");
pumpkin = loadImage("pumpkin.png");

enemy1img = loadImage("Enemy1-Smile.png");
enemy2img = loadImage("Enemy2-Duck.png");

streetImg = loadAnimation("street.png");
gameOverImg = loadImage("GameOver.png");

mortis = loadSound("Mortis.mp3");
playSt = loadSound("Play St.mp3");
}

function setup() {
  createCanvas(300,300);
  
  street = createSprite(150,30,20,20);
  street.addAnimation("street", streetImg);
  street.velocityY = 2;
  street.scale = 2.5;
  
  ghost = createSprite(150,255,20,20);
  ghost.addAnimation("ghost", ghostAnim);
  ghost.scale = 2.5;

  gameOver = createSprite(150,150,20,20);
  gameOver.addImage(gameOverImg);
  gameOver.scale = 1.5;

  candyG = new Group();
  lolipopG = new Group();
  pumpkinG = new Group();

  enemy1G = new Group();
  enemy2G = new Group();
}

function draw() {
 background("gray");

 textSize(20);
 fill("white")
 text("Doces: " + score, 5,20)

 if(gameState === PLAY){
//----------------------------------------GAME STATE PLAY----------------------------------------//
if(street.y > 255){
  street.y = 30;
}
gameOver.visible = false;


//--------------------------------IF's---------------------------------------//
if (candyG.isTouching(ghost)){
  candyG.destroyEach();
  score=score+1;
}
if (lolipopG.isTouching(ghost)){
  lolipopG.destroyEach();
  score=score+2;
}
if (pumpkinG.isTouching(ghost)){
  pumpkinG.destroyEach();
  score=score+3;
}
if (enemy1G.isTouching(ghost)||enemy2G.isTouching(ghost)){
  gameState = END;
  candyG.destroyEach();
  lolipopG.destroyEach();
  pumpkinG.destroyEach();

  enemy1G.destroyEach();
  enemy2G.destroyEach();
}



  ghost.x = World.mouseX;

  console.log(score);

  if (frameCount % 60 === 0) {
  var rand = Math.round(random(1,3));
  switch(rand){
      case 1: candyF();
              break;
      case 2: lolipopF();
              break;
      case 3: pumpkinF();
              break;
      default: break;
  }
  }

  if (frameCount % 100 === 0) {
    var rand = Math.round(random(1,3));
    switch(rand){
        case 1: enemy1F();
                break;
        case 2: enemy2F();
                break;
        default: break;
    }
    }
//------------------------------GAME STATE PLAY (FIM)-----------------------//
 }

if (gameState === END){
 street.velocityY = 0;

 gameOver.visible = true;

 ghost.addAnimation("ghost", ghostCollided);
}
  drawSprites();
}

function candyF(){
  var candy1 = createSprite(Math.round(random(30,270), 1, 10, 10));
  candy1.addImage(candy);
  candy1.velocityY = 5;
  candy1.lifetime = 150;
  candy1.scale = 1.5;
  candyG.add(candy1);
  // console.log(candy1.y)
}

function lolipopF(){
  var candy2 = createSprite(Math.round(random(30,270), 1, 10, 10));
  candy2.addImage(lolipop);
  candy2.velocityY = 5;
  candy2.lifetime = 150;
  candy2.scale = 1.5;
  lolipopG.add(candy2);
}

function pumpkinF(){
  var candy3 = createSprite(Math.round(random(30,270), 1, 10, 10));
  candy3.addImage(pumpkin);
  candy3.velocityY = 5;
  candy3.lifetime = 150;
  candy3.scale = 1.5;
  pumpkinG.add(candy3);
}

function enemy1F(){
  var enemy1 = createSprite(Math.round(random(30,270), 1, 10, 10));
  enemy1.addImage(enemy1img);
  enemy1.velocityY = 6;
  enemy1.lifetime = 150;

  enemy1G.add(enemy1);
}

function enemy2F(){
  var enemy2 = createSprite(Math.round(random(30,270), 1, 10, 10));
  enemy2.addImage(enemy2img);
  enemy2.velocityY = 6;
  enemy2.lifetime = 150;
  enemy2G.add(enemy2);
}
