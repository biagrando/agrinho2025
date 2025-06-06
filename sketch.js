let player;
let fruits = [];
let money = 0;
let isInCity = false;

function setup() {
  createCanvas(800, 600);
  player = new Player();

  // Criando 5 frutas no campo
  for (let i = 0; i < 5; i++) {
    fruits.push(new Fruit(random(100, 300), random(100, 400)));
  }
}

function draw() {
  background(200);

  if (isInCity) {
    drawCity();
  } else {
    drawField();
  }

  // Mostrar o personagem
  player.show();
  player.move();

  // Mostrar as frutas
  for (let i = 0; i < fruits.length; i++) {
    fruits[i].show();
  }

  // Mostrar o dinheiro
  displayMoney();
}

function keyPressed() {
  if (keyCode === 67) { // 'C' para mudar entre campo e cidade
    isInCity = !isInCity;
  }

  if (keyCode === 32) { // 'Espaço' para pegar fruta
    if (!isInCity) {
      for (let i = fruits.length - 1; i >= 0; i--) {
        let fruit = fruits[i];
        if (player.intersects(fruit)) {
          fruits.splice(i, 1); // Remove a fruta do campo
        }
      }
    } else {
      // Vende frutas na cidade
      let fruitsCollected = 5 - fruits.length; // Quantas frutas foram coletadas
      money += fruitsCollected * 10; // Cada fruta vale 10 moedas
      fruits = []; // Esvazia as frutas após a venda
    }
  }
}

function drawField() {
  fill(0, 255, 0);
  rect(0, 0, width, height); // Campo (verde)

  fill(0);
  textSize(24);
  text("Campo: Colete frutas", 50, 50);
}

function drawCity() {
  fill(150, 150, 150);
  rect(0, 0, width, height); // Cidade (cinza)

  fill(0);
  textSize(24);
  text("Cidade: Venda frutas", 50, 50);
}

function displayMoney() {
  fill(0);
  textSize(20);
  text("Dinheiro: " + money + " moedas", 600, 50);
}

class Player {
  constructor() {
    this.x = 50;
    this.y = height / 2;
    this.size = 30;
    this.speed = 5;
  }

  show() {
    fill(255, 0, 0);
    rect(this.x, this.y, this.size, this.size);
  }

  move() {
    if (keyIsDown(LEFT_ARROW)) {
      this.x -= this.speed;
    }
    if (keyIsDown(RIGHT_ARROW)) {
      this.x += this.speed;
    }
    if (keyIsDown(UP_ARROW)) {
      this.y -= this.speed;
    }
    if (keyIsDown(DOWN_ARROW)) {
      this.y += this.speed;
    }
  }

  intersects(fruit) {
    let d = dist(this.x, this.y, fruit.x, fruit.y);
    return d < this.size / 2 + fruit.size / 2;
  }
}

class Fruit {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = 30;
  }

  show() {
    fill(255, 165, 0);
    ellipse(this.x, this.y, this.size);
  }
}





