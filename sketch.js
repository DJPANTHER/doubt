var score=0
var trex ,trex_running;
var play =1
var end =0
var gameState= play;
var restart,restart_image
var gameover,gameover_image
function preload()
{
trex_running= loadAnimation("trex1.png","trex3.png","trex4.png")
trex_collided=loadAnimation("trex_collided.png")
ground_image=loadImage("ground2.png")
cloud_image=loadImage("cloud.png")
obstacle1=loadImage("obstacle1.png")
obstacle2=loadImage("obstacle2.png")
obstacle3=loadImage("obstacle3.png")
obstacle4=loadImage("obstacle4.png")
obstacle5=loadImage("obstacle5.png")
obstacle6=loadImage("obstacle6.png")
restart_image=loadImage("restart.png")
gameover_image=loadImage("gameOver.png")
checkpoint= loadSound("checkpoint.mp3")
die = loadSound("die.mp3")
jump= loadSound("jump.mp3")
}

function setup()
{
  createCanvas(800,400)
trex= createSprite(40,365)
 trex.addAnimation("dj",trex_running)
 trex.scale=0.65
 trex.debug=true;
 trex.addAnimation("dj2",trex_collided)
 ground=createSprite(400,370,800,10)
 ground.addImage(ground_image)
 ground2=createSprite(400,400,800,61)
 ground2.shapeColor="#9A7B4F"
 //ground2.visible=false
 obstaclesGroup=new Group()
 cloudsGroup= new Group()
}

function draw()
{
  background("#63C5DA")
  text("Score:"+score,500,50);
  if (gameState == play)
  {
    score = score + Math.round(getFrameRate()/60)
    if(score % 1000==0 && score>0)
    {
      checkpoint.play()
    }
    ground.velocityX=-(5 + 3*score/100)
    if(keyDown("space") && trex.y > 350)
    {
      trex.velocityY=-25
      jump.play()
    }
    trex.velocityY=trex.velocityY+1
    if(ground.x < 20)
    {
      ground.x=ground.width/2
    }
    textSize(20);
    text("YoYoYoYoYoYoYoYoYo This is trex game",230,200)
    spawnClouds()
    spawnObstacles()
    if(trex.isTouching(obstaclesGroup))
    {
      die.play()
      gameState=end
    }
  }
  else if (gameState == end)
 {
  ground.velocityX=0
  obstaclesGroup.setVelocityXEach(0)
  cloudsGroup.setVelocityXEach(0)
  restart=createSprite(400,200)
  gameover=createSprite(400,140)
  restart.addImage(restart_image)
  gameover.addImage(gameover_image)
  gameover.scale=1.5
  trex.changeAnimation("dj2",trex_collided)
obstaclesGroup.setLifetimeEach(-5)
cloudsGroup.setLifetimeEach(-5)
trex.velocityY=0
if(mousePressedOver(restart))
{
reset()
}
 }
 trex.collide(ground2)
  drawSprites()
}

function reset()
{
  gameState=play
  obstaclesGroup.destroyEach()
  cloudsGroup.destroyEach()
  trex.changeAnimation("dj",trex_running)
  score=0
  gameover.visible=false
  restart.visible=false
}
function spawnClouds()
{
  if(frameCount%60==0)
  {
  cloud= createSprite(800,100,50,20)
  cloud.velocityX = -(5+2*score/100)
  cloud.addImage(cloud_image)
  cloud.scale=1.5
  cloud.y=Math.round(random(20,150))
  cloud.lifetime=200;
  trex.depth = cloud.depth +1;
  cloudsGroup.add(cloud)
  }
}

function spawnObstacles()
{
if(frameCount%150 ==0)
  {
    cactus= createSprite(800,360)
  cactus.velocityX=-(4 +2*score/200)
  cactus.lifetime=160
  cactus.scale=0.7
  var number= Math.round(random(1,6))
  switch(number)
  {
    case 1: cactus.addImage(obstacle1)
    break
    case 2: cactus.addImage(obstacle2)
    break
    case 3: cactus.addImage(obstacle3)
    break
    case 4: cactus.addImage(obstacle4)
    break
    case 5: cactus.addImage(obstacle5)
    break
    case 6: cactus.addImage(obstacle6)
    break
    default:
    break
  }
  obstaclesGroup.add(cactus)
  }
}
