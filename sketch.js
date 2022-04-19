var score = 0;
var milleniumFalcon, imperialTroop, laser, bg, tatooine;
var mfImage, laserImage, imperialTroopImage, tatooineImage, backgroundImg;
var lasers = [];
var imperialTroops = [];
var life = 3;
var gameState = 0;
var heat = 0;
var rock;
var rockImg;
var rocks = [];
var mfImage2;
var mf2;
var laser2, laser2Image;
var laserSound, explosionSound, bgMusic;
var explosion, explosionImage;

function preload() {
  mfImage = loadImage("PC.png");
  laserImage = loadImage("laser.png");
  imperialTroopImage = loadImage("enemyShip.png");
  tatooineImage = loadImage("tatooine.png");
  backgroundImg = loadImage("bg2.avif");
  mfImage2 = loadImage("PCLevel4-6.png");
  rockImg = loadImage("rockObstacle.png");
  laser2Image = loadImage("laserTwo.png");
  explosionImage = loadImage("explosion.webp");

  laserSound = loadSound("TIE fighter fire 1.mp3");
  bgMusic = loadSound("Music  Asteroid chase.mp3");
  explosionSound = loadSound("XWing explode.mp3");
}
function setup() {
  createCanvas(windowWidth,windowHeight);

  bg = createSprite(width/2, height/2, width, height);
  bg.addImage(backgroundImg);
  bg.scale = 1.9;

  tatooine = createSprite(width+310,height/2,10,10);
  tatooine.addImage(tatooineImage);
  tatooine.scale = 5;
  tatooine.setCollider("rectangle", 0, 0, 130, height);

  milleniumFalcon = createSprite(width-280,height/2,30,30);
  milleniumFalcon.addImage(mfImage);
  milleniumFalcon.scale = 0.4;

  mf2 = createSprite(width/2,height-100,30,30);
  mf2.addImage(mfImage2);
  mf2.scale = 0.4;
  mf2.visible = false;
  bgMusic.play();
  bgMusic.loop();
}

function draw() {
  background("black"); 
  fill("gold");
  textSize(50);
  drawSprites();

  if (gameState == 0) {
    push();
    textSize(60);
    text("INSTRUCTIONS", width/2-250, 50);
    pop();
    push();
    textSize(35);
    text("LEVELS 1-3", width/2-130, 90)
    pop();
    push();
    textSize(20);
    text("1. Task: Eliminate The Imperial Troops.", width/2-250, 120);
    text("2. Total Lives: 3, A Life Is Lost When An Imperial Troop Touches The Planet Tatooine.", width/2-250, 150);
    text("3. Advance to the next level after achieving points that are divisible by 50.", width/2-250, 180);
    text("4. Overheat -- Take Breaks While Shooting, Shooting Alot Will Activate The Overheat Function.", width/2-250, 210);
    text("5. Controls: Space, Up and Down Arrow Keys.", width/2-250, 240);
    pop();
    push();
    textSize(35);
    text("LEVELS 4-6", width/2-130, 290);
    pop();
    push();
    textSize(20);
    text("1. Task: Avoid The Space Rocks And Reach HomeBase.", width/2-250, 320);
    text("2. Advance to the next level after achieveing points that are divisible by 100.", width/2-250, 350);
    text("3. Reach 500 Points To Finish The Game Succesfully.", width/2-250, 380);
    text("4. Controls: Up, Left and Right Arrow Keys.", width/2-250, 410);
    text("5. Total Lives: 3. A Life Is Lost When A Space Rock Hits You.", width/2-250, 440)
    pop();
    push();
    textSize(35);
    text("PRESS 'SPACE' TO START", width/2-200, 793)
    pop();
    milleniumFalcon.visible = false;
    tatooine.visible = false;

    if(keyDown("space") && heat < 100) {
      gameState = 1;
    }
  }

  if (gameState == 1) {
    milleniumFalcon.visible = true;
    tatooine.visible = true;
    text("Lives: "+life, width-300, 50);
    text("Score: "+score, width-300, 793); 

    push();
    fill("white");
    rect(50, 10, 100, 10);
    fill("gold");
    rect(50, 10, heat, 10);
    noStroke();
    pop();  

    if(heat == 100) {
      push();
      textSize(20);
      text("OVERHEAT", 50, 40);
      pop();
    }

    move();
    if(keyDown("space") && heat < 100) {
      shoot();
      heat += 5
    }
    if(score <= 50) {
      text("LEVEL 1", width/2-100, 50);
        if(frameCount % 60 == 0) {
          createEnemies();
        }
    }
    else if(score <= 100 && score > 50) {
      text("LEVEL 2", width/2-100, 50);
        if(frameCount % 30 == 0) {
          createEnemies();
        }
    }
    else if(score > 100 && score < 200) {
      text("LEVEL 3", width/2-100, 50);
        if(frameCount % 15 == 0 && score < 195) {
          createEnemies();
        }
    }
    else if(score >= 200) {
      gameState = 2;
    }

    if(frameCount % 20 == 0 && heat >= 0) {
      heat -= 5;
    }
    collideFunction();
    gameOverAndLifeReductionLevelOneToThree();
  }

  else if(gameState == 2) {
    text("Lives: "+life, width-300, 50);
    text("Score: "+score, width-300, 793); 

    for (var i = 0; i < imperialTroops.length; i++) {
      imperialTroops[i].destroy();
    }

    tatooine.destroy();
    milleniumFalcon.destroy();

    mf2.visible = true;
    if(bg.y >= height+20) {
      bg.y = height/2
    }
    if(frameCount % 10 == 0) {
      score += 1;
    }
    moveYes();
    push();
    textSize(50);
    text("AMMO OVER", 50, 40);
    text("RETREAT!", 50, 80);
    pop();
    
    if(score > 200 && score < 300) {
      text("LEVEL 4", width/2-100, 50);
      if(frameCount % 20 == 0) {
        createRocks();
      }
    }

    else if(score > 300 && score < 400) {
      text("LEVEL 5", width/2-100, 50);
      if(frameCount % 10 == 0) {
        createRocks();
      }
    }

    else if(score > 400 && score <= 500) {
      text("LEVEL 6", width/2-100, 50);
      if(frameCount % 10 == 0) {
        createRocks();
      }
    }
    WIN();
    gameOverAndLifeReductionLevelFourToSix();
  }

  else if(gameState == 3) {
    tatooine.destroy();
    milleniumFalcon.destroy();
    mf2.destroy();
  }

  else if(gameState == 4) {
    tatooine.destroy();
    milleniumFalcon.destroy();
    mf2.destroy();
  }
}

function createEnemies() {
  imperialTroop = createSprite(0, random(83, 760), 10, 10);
  imperialTroop.addImage(imperialTroopImage);
  imperialTroop.scale = 0.2;
  imperialTroop.velocityX = 10;
  imperialTroops.push(imperialTroop);
}

function shoot() {
  laser = createSprite(width-280,height,30,30)
  laser.y = milleniumFalcon.y;
  laser.x = milleniumFalcon.x - 100;
  laser.addImage(laserImage);
  laser.scale = 0.2;
  laser.velocityX = -30;
  laser.lifetime = 200;
  lasers.push(laser);
  laserSound.play();
}

function move() {
  if(keyDown("UP") && milleniumFalcon.y >= 83) {
    milleniumFalcon.y -= 10;
  }
  if(keyDown("DOWN") && milleniumFalcon.y <= 760) {
    milleniumFalcon.y += 10;
  }
}

function collideFunction() {
  for(var i = 0; i<imperialTroops.length; i++) {
    for(var x = 0; x<lasers.length; x++) {
      if(imperialTroops[i].isTouching(lasers[x])) {
        score += 5;
        explosionSound.play();
        lasers[x].destroy();
        imperialTroops[i].addImage(explosionImage);
        imperialTroops[i].lifetime = 10;
        imperialTroops[i].setCollider("circle", 2000000, 2000000, 2);
        imperialTroops[i].scale = 0.7;
      }
    }
  }
}

function gameOverAndLifeReductionLevelOneToThree() {
  if (life > 0) {
    for(var i = 0; i<imperialTroops.length; i++) {
      if(imperialTroops[i].isTouching(tatooine)) {
        imperialTroops[i].destroy();
        life -= 1;
      }
    }
  }

  else if (life == 0) {
    gameState = 3;
      swal({
        title: `Game Over!`,
        text: "you lost, loser.",
        text: "score: " + score,
        imageUrl: "https://cdn.shopify.com/s/files/1/1061/1924/products/Thumbs_Down_Sign_Emoji_Icon_ios10_grande.png",
        imageSize: "100x100",
        confirmButtonText: "press to retry" 
      },
      function(isConfirm) {
        if (isConfirm) {
          location.reload();
        }
      })
  }
}

function createRocks() {
  rock = createSprite(random(0, width), 0, 10, 10);
  rock.addImage(rockImg);
  rock.scale = 0.2;
  rock.velocityY = 10;
  rocks.push(rock);
}

function moveYes() {
  if(keyDown("UP") && mf2.y >= 83) {
    bg.y += 4;
  }
  if(keyDown("LEFT") && mf2.x >= 30) {
    mf2.x -= 10;
  }
  if(keyDown("RIGHT") && mf2.x <= width-30) {
    mf2.x += 10;
  }
}

function gameOverAndLifeReductionLevelFourToSix() {
  if (life > 0) {
    for(var i = 0; i<rocks.length; i++) {
      if(rocks[i].isTouching(mf2)) {
        rocks[i].destroy();
        life -= 1;
        explosionSound.play();
      }
    }
  }

  else if (life == 0) {
    gameState = 3;
      swal({
      title: `Game Over!`,
      text: "you lost, loser.",
      text: "score: " + score,
      imageUrl: "https://cdn.shopify.com/s/files/1/1061/1924/products/Thumbs_Down_Sign_Emoji_Icon_ios10_grande.png",
      imageSize: "100x100",
      confirmButtonText: "press to retry" 
    },
    function(isConfirm) {
      if (isConfirm) {
        location.reload();
      }
    })
  }
}

function WIN() {
  if (life > 0 && score >= 500) {
    gameState = 4;
      swal({
      title: `Game Over!`,
      text: "congrats! you won!",
      confirmButtonText: "press to play again!" 
    },
    function(isConfirm) {
      if (isConfirm) {
        location.reload();
      }
    }
    )
  }
}