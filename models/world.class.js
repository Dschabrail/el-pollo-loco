class World {
  character = new Character();
  statusBarHealth = new StatusBarHealth();
  statusBarCoin = new StatusBarCoin();
  statusBarBottle = new StatusBarBottle();
  statusBarEndboss = new StatusBarEndboss();
  gameOver = new GameOverImage();
  icon = new Icon();
  level = initLevel();
  endboss = new Endboss();
  ctx;
  bottles = 0;
  coins = 0;
  endbossLife = 100;
  canvas;
  keyboard;
  sounds;
  camera_x = 0;
  throwableObject = [];
  showStatusbar = false;
  lastThrowTime = 0;

  constructor(canvas, keyboard, sounds) {
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.sounds = sounds;
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
      this.checkCollisionWithEndboss();
    }, 100);
  }

  /**
   * Checks collisions with enemies and performs appropriate actions.
   */
  checkCollisionsEnemies() {
    this.level.enemies.forEach((enemy) => {
      this.onChicken(enemy);
      this.colldingWithChicken(enemy);
    });
  }

  /**
   * Handles collisions with an enemy when the character jumps on it.
   * @param {Object} enemy - The enemy object.
   */
  onChicken(enemy) {
    if (
      this.character.isColliding(enemy) &&
      this.character.isAboveGround() &&
      this.character.speedY < 0 &&
      enemy.life > 0
    ) {
      enemy.life--;
      this.spliceEnemie(enemy);
      this.character.jump();
      this.chickenAudio();
    }
  }

  /**
   * Handles collisions with an enemy when the character collides with it.
   * @param {Object} enemy - The enemy object.
   */
  colldingWithChicken(enemy) {
    if (
      this.character.isColliding(enemy) &&
      !this.character.isAboveGround() &&
      enemy.life > 0
    ) {
      this.character.damage();
      this.statusBarHealth.setPercentage(this.character.life);
    }
  }

  /**
   * Checks collisions with the end boss and handles them.
   */
  checkCollisionWithEndboss() {
    if (this.character.isColliding(this.endboss)) {
      this.character.damage();
      this.character.gameOver();
      this.statusBarHealth.setPercentage(this.character.life);
    }
  }

  /**
   * Plays the sound if the value is true.
   */
  collectingSound() {
    if (this.sounds.playSound == true) {
      this.sounds.collecting_sound.play();
      setTimeout(() => {
        this.sounds.collecting_sound.pause();
        this.sounds.collecting_sound.currentTime = 0;
      }, 400);
    }
  }

  /**
   * Checks collisions with bottles and updates the game state accordingly.
   */
  checkCollisionBottle() {
    this.level.bottles.forEach((bottle) => {
      if (this.character.isColliding(bottle)) {
        this.collectingSound();
        this.bottles++;
        this.level.bottles.splice(0, 1);
        this.statusBarBottle.setPercentageBottle(100 - this.bottles * 20);
      }
    });
  }

  /**
   * Checks collisions with coins and updates the game state accordingly.
   */
  checkCollisionCoin() {
    this.level.coins.forEach((coin) => {
      if (this.character.isColliding(coin)) {
        this.collectingSound();
        this.coins++;
        this.level.coins.splice(0, 1);
        this.statusBarCoin.setPercentageCoin(100 - this.coins * 20);
      }
    });
  }

  /**
   * Checks collisions between the end boss and throwable objects.
   */
  checkCollisionEndboss() {
    this.throwableObject.forEach((bottle) => {
      if (this.endboss.isColliding(bottle)) {
        this.endboss.damage();
        this.endboss.gameOver();
        setTimeout(() => {
          this.throwableObject.splice(0, 1);
        }, 150);
        this.statusBarEndboss.setPercentage(this.endboss.life);
      }
    });
  }

  /**
   * Checks if the player wants to throw an object and handles it.
   */
  checkThrowObject() {
    const currentTime = Date.now();
    const throwDelay = 1000;

    if (this.keyboard.throw && this.bottles > 0) {
      if (currentTime - this.lastThrowTime >= throwDelay) {
        this.checkThrowObjectTemplate(currentTime);
      }
    }
  }

  checkThrowObjectTemplate(currentTime) {
    let bottle = new ThrowableObject(
      this.character.x + 20,
      this.character.y + 100
    );
    this.throwableObject.push(bottle);
    this.bottles--;
    this.lastThrowTime = currentTime;
    this.statusBarBottle.setPercentageBottle(100 - this.bottles * 20);
  }

  /**
   * Removes an enemy from the enemies array after a delay.
   * @param {Object} enemy - The enemy object to be removed.
   */
  spliceEnemie(enemy) {
    setTimeout(() => {
      this.level.enemies.splice(this.level.enemies.indexOf(enemy), 1);
    }, 1000);
  }

  /**
   * Plays chicken audio and stops it after a delay.
   */
  chickenAudio() {
    if (this.sounds.playSound == true) {
      this.sounds.chicken_sound.play();
      setTimeout(() => {
        this.sounds.chicken_sound.pause();
        this.sounds.chicken_sound.currentTime = 0;
      }, 1200);
    }
  }

  /**
   * Sets the world reference for the character and end boss objects.
   */
  setWorld() {
    this.character.world = this;
    this.endboss.world = this;
  }

  /**
   * Main draw function for the game, responsible for rendering game elements.
   */
  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.translate(this.camera_x, 0);
    this.gameOverImage();
    this.addToMap(this.character);
    this.addToMap(this.endboss);
    this.addObjectsToMap(this.level.enemies);
    this.drawObjects();
    this.drawStatusbar();
    this.drawBackground();
    let self = this;
    requestAnimationFrame(function () {
      self.draw();
    });
  }

  /**
   * Draws various game objects including throwable objects, bottles, and coins.
   */
  drawObjects() {
    this.addObjectsToMap(this.throwableObject);
    this.addObjectsToMap(this.level.bottles);
    this.addObjectsToMap(this.level.coins);
  }

  /**
   * Draws the game's background elements.
   */
  drawBackground() {
    this.ctx.globalCompositeOperation = "destination-over";
    this.addObjectsToMap(this.level.clouds);
    this.addObjectsToMap(this.level.background);
    this.ctx.translate(-this.camera_x, 0);
  }

  /**
   * Draws the game's status bar elements.
   */
  drawStatusbar() {
    this.ctx.translate(-this.camera_x, 0);
    this.addToMap(this.statusBarHealth);
    this.addToMap(this.statusBarCoin);
    this.addToMap(this.statusBarBottle);
    this.showEndbossStatusbar();
    this.ctx.translate(this.camera_x, 0);
  }

  /**
   * Iterates over an array of objects and adds each object to the game map.
   * @param {Array} object - An array of objects to be added to the map.
   */
  addObjectsToMap(object) {
    object.forEach((o) => {
      this.addToMap(o);
    });
  }

  /**
   * Adds an object to the game map with an optional horizontal flip.
   * @param {Object} object - The object to be added to the map.
   */
  addToMap(object) {
    if (object.otherDirection) {
      this.flipImage(object);
    }
    object.draw(this.ctx);

    if (object.otherDirection) {
      this.flipImageBack(object);
    }
  }

  /**
   * Flips the image horizontally.
   * @param {Object} object - The object whose image needs to be flipped.
   */
  flipImage(object) {
    this.ctx.save();
    this.ctx.translate(object.width, 0);
    this.ctx.scale(-1, 1);
    object.x = object.x * -1;
  }

  /**
   * Reverts the image back to its original orientation after flipping.
   * @param {Object} object - The object whose image needs to be restored.
   */
  flipImageBack(object) {
    object.x = object.x * -1;
    this.ctx.restore();
  }

  /**
   * Shows the end boss status bar based on character position.
   */
  showEndbossStatusbar() {
    this.characterPosition();
    if (this.character.x > 2200 || this.showStatusbar) {
      this.addToMap(this.icon);
      this.addToMap(this.statusBarEndboss);
    }
  }

  /**
   * Tracks the character's position to determine when to show the end boss status bar.
   */
  characterPosition() {
    if (this.character.x > 2200) {
      this.showStatusbar = true;
    }
  }

  /**
   * Clears all intervals and stops all sounds.
   */
  clearAllIntervals() {
    this.sounds.stopAllSounds();
    for (let i = 1; i < 9999; i++) window.clearInterval(i);
  }

  /**
   * Displays the game over image and a restart button.
   */
  gameOverImage() {
    if (this.character.life == 0) {
      const canvasX = this.character.x - 100;
      this.gameOver.x = canvasX;
      this.addToMap(this.gameOver);
      this.restartButton();
    }
  }

  /**
   * Displays a restart button and handles the restart action.
   */
  restartButton() {
    let button = document.getElementById("start-button");
    button.innerHTML = "RESTART";
    button.classList.remove("d-none");
    button.addEventListener("click", () => {
      this.character.life = 100;
    });
  }

  /**
   * Handles game completion and displays the win screen.
   */
  winTheGame() {
    this.sounds.stopAllSounds();
    let canvas = document.getElementById("canvas");
    let container = document.getElementById("win-div");

    canvas.classList.add("d-none");
    container.classList.remove("d-none");
    this.restartButton();
    this.coinNumber();
  }

  /**
   * Displays the total number of collected coins.
   */
  coinNumber() {
    let number = document.getElementById("coins-number");
    number.innerHTML = `${this.coins}`;
  }
}
