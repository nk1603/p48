 var bg,bgImg
 var shooterStandingImg,shooterShootingImg;
 var player;
 var zombie,zombieImg,zombieGroup
var bullet
var bulletCount = 30;
var FIGHT = 1
var END = 0
var gameState = FIGHT 
var bulletGroup;
var zombieKilled = 0;
var heart1Img,heart2Img,heart3Img;
var heart1,heart2,heart3;
var life = 3;


function preload() {
bgImg = loadImage("assets/bg.jpeg")
shooterStandingImg = loadImage("assets/shooter_2.png")
shooterShootingImg = loadImage("assets/shooter_3.png")
zombieImg = loadImage("assets/zombie.png")
heart1Img = loadImage("assets/heart_1.png") 
heart2Img = loadImage("assets/heart_2.png")
heart3Img = loadImage("assets/heart_3.png")
}

function setup () {
createCanvas(windowWidth,windowHeight)

bg = createSprite(windowWidth/2, windowHeight/2, 20,20)
bg.addImage(bgImg);
bg.scale = 1.1;
zombieGroup = new Group()
bulletGroup = new Group()

player = createSprite(displayWidth/2 - 300, displayHeight/2, 20,20)
player.addImage(shooterStandingImg);
player.scale = 0.5

heart1 = createSprite(displayWidth - 250, 50,30,30) 
heart1.addImage(heart1Img)
heart1.scale = 0.3
heart1.visible = false;

heart2 = createSprite(displayWidth - 250, 50,30,30) 
heart2.addImage(heart2Img)
heart2.scale = 0.3
heart2.visible = false;

heart3 = createSprite(displayWidth - 250, 50,30,30) 
heart3.addImage(heart3Img)
heart3.scale = 0.3
heart3.visible = false;
}


function draw() {
    
background (0)
if ( gameState === FIGHT ) {

    if (life === 3) {
    heart3.visible = true ;
    heart2.visible = false;
    heart1.visible = false;  
    }
    if (life === 2) {
        heart3.visible = false ;
        heart2.visible = true;
        heart1.visible = false;  
        }

        if (life === 1) {
            heart3.visible = false ;
            heart2.visible = false;
            heart1.visible = true;  
            }
            if (life === 0) {
                heart3.visible = false ;
                heart2.visible = false;
                heart1.visible = false; 
                gameState = END
            }

 if (keyDown ("UP_ARROW")) {
player.y = player.y -10

}


if (keyDown ("DOWN_ARROW")) {
    player.y = player.y +10
    
}
if (keyDown ("RIGHT_ARROW")) {
    player.x = player.x +10
    
}
if (keyDown ("LEFT_ARROW")) {
    player.x = player.x -10
    
    }
if (keyWentDown("SPACE")) {
    player.addImage(shooterShootingImg)
bullet = createSprite(player.x+85,player.y-35,20,5)
bulletGroup.add(bullet)
bullet.velocityX = 10
bullet.shapeColor = "yellow"
bulletCount = bulletCount - 1;

}

 else if (keyWentUp("SPACE")) {
     player.addImage(shooterStandingImg)
 }

 if (bulletCount === 0  ) {
     gameState = END
     
 }

spawnZombies();


if (zombieGroup.isTouching(bulletGroup)) {
for (var i = 0 ; i < zombieGroup.length; i++) {
    if (zombieGroup[i].isTouching(bulletGroup)) {
        zombieKilled = zombieKilled + 1
        zombieGroup[i].destroy()
        bulletGroup.destroyEach()
    }

}
}
if (zombieGroup.isTouching(player)) {
    for (var i = 0 ; i < zombieGroup.length; i++) {
    if (zombieGroup[i].isTouching(player)) {
        zombieGroup[i].destroy() 
        life = life-1;
        
    }
    }
}
}


 drawSprites();
 textSize(20)
 fill("red")
 
  text("Bullets: " + bulletCount,displayWidth-200,80)
 text("zombieKilled: " + zombieKilled,displayWidth-200,120)
 text("life: " + life,displayWidth-200,140)
 if (gameState === END && life === 0 ){
     textSize(40)
     text("zombies killed you ,you lost ",displayWidth/2,displayHeight/2)
     zombieGroup.destroyEach();

 }
 if (gameState === END && zombieKilled === 20 ){
    textSize(40)
    text("well done you killed all the zombies  ",displayWidth/2,displayHeight/2)
    zombieGroup.destroyEach();
}
if (gameState === END && bulletCount === 0 ){
    textSize(40)
    text(" oh oooh!!!  you ran out of bullets  ",displayWidth/2,displayHeight/2)
    zombieGroup.destroyEach();
    bulletGroup.destroyEach();
}
 

}



function spawnZombies() {
 if (frameCount % 100 === 0) {
  zombie = createSprite(random((windowWidth/2)+100,windowWidth),random(300,700),20,20)
  zombie.addImage(zombieImg);
  zombie.velocityX = -5
  zombie.scale = 0.2
  zombie.lifetime = 250
  zombieGroup.add(zombie)
 }



}







































