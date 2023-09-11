class World {
  character = new Character();
  statusBarHealth = new StatusBarHealth();
  statusBarCoin = new StatusBarCoin();
  statusBarBottle = new StatusBarBottle();
  statusBarEndboss = new StatusBarEndboss();
  icon = new Icon();
  level = initLevel();
  endboss = new Endboss();
  ctx;
  bottles = 0;
  coins = 0;
  endbossLife = 100;
  canvas;
  keyboard;
  camera_x = 0;
  throwableObject = [];
  showStatusbar = false;

  constructor(canvas, keyboard) {
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.draw();
    this.setWorld();
    this.run();
  }

  run() {
    setInterval(() => {
      this.checkCollisionsEnemies();
      this.checkCollisionBottle();
      this.checkCollisionCoin();
      this.checkThrowObject();
      this.checkCollisionEndboss();
    }, 100);
  }

  checkCollisionsEnemies() {
    this.level.enemies.forEach((enemy) => {
      if (
        this.character.isColliding(enemy) &&
        this.character.isAboveGround() &&
        enemy.life > 0
      ) {
        enemy.life--;
        this.character.jump();
        this.spliceEnemie(enemy);
      } else if (
        this.character.isColliding(enemy) &&
        !this.character.isAboveGround() &&
        enemy.life > 0
      ) {
        this.character.damage();
        this.statusBarHealth.setPercentage(this.character.life);
      }
    });
  }

  checkCollisionBottle() {
    this.level.bottles.forEach((bottle) => {
      if (this.character.isColliding(bottle)) {
        this.bottles++;
        this.level.bottles.splice(0, 1);
        this.statusBarBottle.setPercentageBottle(100 - this.bottles * 20);
      }
    });
  }

  checkCollisionCoin() {
    this.level.coins.forEach((coin) => {
      if (this.character.isColliding(coin)) {
        this.coins++;
        this.level.coins.splice(0, 1);
        this.statusBarCoin.setPercentageCoin(100 - this.coins * 20);
      }
    });
  }

  checkCollisionEndboss() {
    this.throwableObject.forEach((bottle) => {
      if (this.endboss.isColliding(bottle)) {
        this.endboss.damage();
        this.endboss.gameOver();
        this.statusBarEndboss.setPercentage(this.endboss.life);
      }
    });
  }

  checkThrowObject() {
    if (this.keyboard.trow && this.bottles > 0) {
      let bottle = new ThrowableObject(
        this.character.x + 20,
        this.character.y + 100
      );
      this.throwableObject.push(bottle);
      this.bottles--;
      this.statusBarBottle.setPercentageBottle(100 - this.bottles * 20);
    }
  }

  spliceEnemie(enemy) {
    setTimeout(() => {
      this.level.enemies.splice(this.level.enemies.indexOf(enemy), 1);
    }, 1000);
    
  }

  setWorld() {
    this.character.world = this;
    this.endboss.world = this;
  }

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.ctx.translate(this.camera_x, 0);

    this.addToMap(this.character);
    this.addToMap(this.endboss);
    this.addObjectsToMap(this.level.enemies);
    this.addObjectsToMap(this.throwableObject);
    this.addObjectsToMap(this.level.bottles);
    this.addObjectsToMap(this.level.coins);

    this.ctx.translate(-this.camera_x, 0);
    this.addToMap(this.statusBarHealth);
    this.addToMap(this.statusBarCoin);
    this.addToMap(this.statusBarBottle);
    this.showEndbossStatusbar();
    this.ctx.translate(this.camera_x, 0);

    this.ctx.globalCompositeOperation = "destination-over";
    this.addObjectsToMap(this.level.clouds);
    this.addObjectsToMap(this.level.background);

    this.ctx.translate(-this.camera_x, 0);

    let self = this;
    requestAnimationFrame(function () {
      self.draw();
    });
  }

  addObjectsToMap(object) {
    object.forEach((o) => {
      this.addToMap(o);
    });
  }

  addToMap(object) {
    if (object.otherDirection) {
      this.flipImage(object);
    }

    object.draw(this.ctx);
    object.drawFrame(this.ctx);

    if (object.otherDirection) {
      this.flipImageBack(object);
    }
  }

  flipImage(object) {
    this.ctx.save();
    this.ctx.translate(object.width, 0);
    this.ctx.scale(-1, 1);
    object.x = object.x * -1;
  }

  flipImageBack(object) {
    object.x = object.x * -1;
    this.ctx.restore();
  }

  showEndbossStatusbar() {
    this.characterPosition();
    if (this.character.x > 2200 || this.showStatusbar) {
      this.addToMap(this.icon);
      this.addToMap(this.statusBarEndboss);
    }
  }

  characterPosition() {
    if (this.character.x > 2200) {
      this.showStatusbar = true;
    }
  }

  clearAllIntervals() {
    for (let i = 1; i < 9999; i++) window.clearInterval(i);
  }
}