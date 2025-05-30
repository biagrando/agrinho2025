let player;
let objects = [];
let score = 0;
let gameOver = false;

function setup() {
  createCanvas(600, 400);
  player = new Player();
  noStroke();
}

function draw() {
  background(220);

  if (gameOver) {
    textSize(32);
    textAlign(CENTER, CENTER);
    fill(0);
    text("FIM DE JOGO", width / 2, height / 2);
    textSize(24);
    text("Pontos: " + score, width / 2, height / 2 + 40);
    return;
  }

  player.update();
  player.show();

  
  if (frameCount % 60 === 0) {
    let obj = new FallingObject();
    objects.push(obj);
  }

  
  for (let i = objects.length - 1; i >= 0; i--) {
    objects[i].update();
    objects[i].show();

    
    if (objects[i].captured(player)) {
      objects.splice(i, 1);
      score++;
    }

    
    if (objects[i].y > height) {
      gameOver = true;
    }
  }

  
  fill(0);
  textSize(16);
  text("Pontos: " + score, 10, 20);
}

class Player {
  constructor() {
    this.x = width / 2;
    this.y = height - 30;
    this.size = 40;
    this.speed = 5;
  }

  update() {
    if (keyIsDown(LEFT_ARROW)) {
      this.x -= this.speed;
    }
    if (keyIsDown(RIGHT_ARROW)) {
      this.x += this.speed;
    }

    this.x = constrain(this.x, 0, width - this.size);
  }

  show() {
    fill(0, 150, 255);
    rect(this.x, this.y, this.size, this.size);
  }
}

class FallingObject {
  constructor() {
    this.x = random(width);
    this.y = 0;
    this.size = 20;
    this.speed = 4;
  }

  update() {
    this.y += this.speed;
  }

  show() {
    fill(255, 0, 0);
    ellipse(this.x, this.y, this.size, this.size);
  }

  captured(player) {
    return (
      player.x < this.x + this.size / 2 &&
      player.x + player.size > this.x - this.size / 2 &&
      player.y < this.y + this.size / 2 &&
      player.y + player.size > this.y - this.size / 2
    );
  }
}





