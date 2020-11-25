var background1, background1image;
var door, doorimage, doorGroup;
var climber, climberImage, climbergroup;
var ghost, ghostImage;
var invisibleBlock, invisibleBlockGroup;
var gameState = "play";
var soundPlay


function preload() {
  background1image = loadImage("tower.png");
  doorimage = loadImage("door.png");
  climberimage = loadImage("climber.png");
  ghostImage = loadImage("ghost-standing.png");
  soundPlay = loadSound("spooky.wav");
}

function setup() {
  createCanvas(600, 600);
  background1 = createSprite(300, 300);
  background1.addImage(background1image, "tower.png");
  background1.velocityY = 5;

  ghost = createSprite(300, 400, 20, 20);
  ghost.addImage("ghost-standing.png", ghostImage);
  ghost.scale = 0.4;


  doorGroup = new Group();
  climberGroup = new Group();
  invisibleBlockGroup = new Group();

}

function draw() {

  if (gameState === "play") {
    drawSprites();
    soundPlay.play();
    if (background1.y > 400) {
      background1.y = background1.y / 2;
    }
    spawnDoors();
    if (keyDown("Right")) {
      ghost.x = ghost.x + 4
    }
    if (keyDown("left")) {
      ghost.x = ghost.x - 4
    }
    if (keyDown("space")) {
      ghost.velocityY = -5
    }
    ghost.velocityY = ghost.velocityY + 0.8;
    if (ghost.isTouching(climberGroup)) {
      ghost.velocityY = 0;
    }
    if (invisibleBlockGroup.isTouching(ghost) || ghost.y > 600) {
      ghost.destroy();
      gameState = "end"
    }
  }

  if (gameState === "end") {
    background("black")
    stroke("yellow");
    fill("yellow");
    textSize(30);
    text("Game Over", 230, 250)
  }


}

function spawnDoors() {
  if (frameCount % 200 === 0) {
    door = createSprite(random(150, 500), -50, 10, 10);
    door.addImage("door.png", doorimage);
    door.velocityY = 2;
    door.lifetime = 600;
    doorGroup.add(door);
    ghost.depth = door.depth;
    ghost.depth = ghost.depth + 1;

    climber = createSprite(door.x, 10, 5, 5);
    climber.addImage("climber.png", climberimage);
    climber.velocityY = 2;
    climber.lifetime = 600;
    climberGroup.add(climber);

    invisibleBlock = createSprite(climber.x, climber.y + 10, 100, 10);
    invisibleBlock.velocityY = climber.velocityY;
    invisibleBlock.visible = false;
    invisibleBlock.lifetime = 600;
    invisibleBlockGroup.add(invisibleBlock);



  }
}