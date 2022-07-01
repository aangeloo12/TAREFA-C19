var PLAY = 1;
var END = 0;
var gameState = PLAY;

var homem, homem_running, homem_collided;
var chão, invisibleGround, chãoImage
var fundo, fundoImage

var obstaculosGroup, obstaculo1, refri


var saude=0;

var gameOver, restart;


function preload(){
    homem_running  =   loadAnimation("animação 1.png","animeção 2.png");
    homem_collided  = loadAnimation("morto.png");
    fundoImage = loadImage("fundo.png")
    chãoImage = loadImage("chao.png")
    
    
    obstaculo1 = loadImage("cone.png");
    obstaculo2 = loadImage("lixo.png");
   
    
    gameOverImg = loadImage("gameOver.png");
    restartImg = loadImage("restart.png");
}

function setup() {
    createCanvas(600,400);
  
    fundo=createSprite(100,200);
    fundo.addImage(fundoImage);
    fundo.velocityX = -5;
    fundo.scale=1;

    chão = createSprite(200,340,400,20);
    chão.addImage("ground",chãoImage);
    chão.velocityY -6

    homem = createSprite(50,330,20,50);
    homem.addAnimation("running", homem_running);
    homem.addAnimation("morto", homem_collided);
    homem.scale = 0.12;
    homem.depth = homem.depth +1

   invisibleGround = createSprite(200,410,400,20);
    invisibleGround.visible = false;

   
   obstaculosGroup = new Group();
  
   
   
  } 
  
function draw() {
 if(gameState===PLAY){
 
  background("white")
 if((touches.lenght>0 || keyDown("space")) && homem.y >= 200) {
  homem.velocityY = -19;
  
  }
 homem.velocityY = homem.velocityY + 0.8
 
 if(fundo.x < 150){
    fundo.x = fundo.width/2;
  } 
   homem.collide(invisibleGround)
   
   
   createObstaculos()
    fim()
    acabando()
    drawSprites()
    if(gameState === END){
      stroke("red")
      fill("red")
      textSize(30)
      text("Game Over", 200,100)
    }
}  
}

function createObstaculos() {
  
  if(frameCount % 280 === 0){
 
   var obstaculo = createSprite(200,350)
   obstaculo.addImage(obstaculo1)
   obstaculo.x = Math.round(random(400,340))
   obstaculo.velocityX = -6
   obstaculo.scale = 0.02
   obstaculosGroup.add(obstaculo)
   obstaculo.depth = obstaculo.depth +1 
  }
 
  if(frameCount % 410 === 0){
   var lixeira = createSprite(200,350)
   lixeira.addImage(obstaculo2)
   lixeira.x = Math.round(random(400,370))
   lixeira.velocityX = -6
   lixeira.scale = 0.08
   obstaculosGroup.add(lixeira)
   lixeira.depth = lixeira.depth +1
 }  
}

function fim(){
 if(gameState === END){
  homem.addImage(homem_collided)
  chão.velocityX = 0
  obstaculosGroup.destroyEach()
   

}
}

function acabando(){
  if(obstaculosGroup.isTouching(homem)){
  gameState = END
  console.log(gameState)
 
 }
}
