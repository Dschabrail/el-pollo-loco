class World {
  character = new Character();
  statusbar = [new StatusBar(0), new StatusBar(100), new StatusBar(200)];
  level = level1;
  ctx;
  canvas;
  keyboard;
  camera_x = 0;
  throwableObject = [new ThrowableObject()];

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
      this.checkCollision();
      this.checkThrowObject();
    }, 200);
  }

  checkCollision() {
    this.level.enemies.forEach((enemy) => {
      if (this.character.isColliding(enemy)) {
        this.character.damage();
        console.log("character life", this.character.life);
        this.character.gameOver();
        this.level.statusbar.setPercentage(this.character.life);
      }
    });
  }

  checkThrowObject() {
    if (this.keyboard.trow) {
      let bottle = new ThrowableObject(this.character.x + 50, this.character.y + 100);
      this.throwableObject.push(bottle);
    }
  }

  setWorld() {
    this.character.world = this;
  }

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.ctx.translate(this.camera_x, 0);

    this.addToMap(this.character);
    this.addObjectsToMap(this.level.enemies);
    this.addObjectsToMap(this.throwableObject);

   // this.ctx.translate(-this.camera_x, 0);
    //this.addObjectsToMap(this.statusbar);
    //this.ctx.translate(this.camera_x, 0);

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
}
