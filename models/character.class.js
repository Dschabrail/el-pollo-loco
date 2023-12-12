class Character extends MovableObject {
  y = 210;
  height = 220;
  speed = 5;
  width = 120;
  world;
  idleTime = 0;
  idleInterval = null;

  offset = {
    top: 85,
    right: 20,
    bottom: 5,
    left: 20,
  };

  IMAGES_WALKING = [
    "img/2_character_pepe/2_walk/W-21.png",
    "img/2_character_pepe/2_walk/W-22.png",
    "img/2_character_pepe/2_walk/W-23.png",
    "img/2_character_pepe/2_walk/W-24.png",
    "img/2_character_pepe/2_walk/W-25.png",
    "img/2_character_pepe/2_walk/W-26.png",
  ];

  IMAGES_JUMPING = [
    "img/2_character_pepe/3_jump/J-31.png",
    "img/2_character_pepe/3_jump/J-32.png",
    "img/2_character_pepe/3_jump/J-33.png",
    "img/2_character_pepe/3_jump/J-34.png",
    "img/2_character_pepe/3_jump/J-35.png",
    "img/2_character_pepe/3_jump/J-36.png",
    "img/2_character_pepe/3_jump/J-37.png",
    "img/2_character_pepe/3_jump/J-38.png",
    "img/2_character_pepe/3_jump/J-39.png",
  ];

  IMAGES_DEAD = [
    "img/2_character_pepe/5_dead/D-51.png",
    "img/2_character_pepe/5_dead/D-52.png",
    "img/2_character_pepe/5_dead/D-53.png",
    "img/2_character_pepe/5_dead/D-54.png",
    "img/2_character_pepe/5_dead/D-55.png",
    "img/2_character_pepe/5_dead/D-56.png",
    "img/2_character_pepe/5_dead/D-57.png",
  ];

  IMAGES_HURT = [
    "img/2_character_pepe/4_hurt/H-41.png",
    "img/2_character_pepe/4_hurt/H-42.png",
    "img/2_character_pepe/4_hurt/H-43.png",
  ];

  IMAGES_IDLE = [
    "img/2_character_pepe/1_idle/idle/I-1.png",
    "img/2_character_pepe/1_idle/idle/I-2.png",
    "img/2_character_pepe/1_idle/idle/I-3.png",
    "img/2_character_pepe/1_idle/idle/I-4.png",
    "img/2_character_pepe/1_idle/idle/I-5.png",
    "img/2_character_pepe/1_idle/idle/I-6.png",
    "img/2_character_pepe/1_idle/idle/I-7.png",
    "img/2_character_pepe/1_idle/idle/I-8.png",
    "img/2_character_pepe/1_idle/idle/I-9.png",
    "img/2_character_pepe/1_idle/idle/I-10.png",
  ];

  IMAGES_LONG_IDLE = [
    "img/2_character_pepe/1_idle/long_idle/I-11.png",
    "img/2_character_pepe/1_idle/long_idle/I-12.png",
    "img/2_character_pepe/1_idle/long_idle/I-13.png",
    "img/2_character_pepe/1_idle/long_idle/I-14.png",
    "img/2_character_pepe/1_idle/long_idle/I-15.png",
    "img/2_character_pepe/1_idle/long_idle/I-16.png",
    "img/2_character_pepe/1_idle/long_idle/I-17.png",
    "img/2_character_pepe/1_idle/long_idle/I-18.png",
    "img/2_character_pepe/1_idle/long_idle/I-19.png",
    "img/2_character_pepe/1_idle/long_idle/I-20.png",
  ];

  constructor() {
    super().loadImage("img/2_character_pepe/1_idle/idle/I-1.png");
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_JUMPING);
    this.loadImages(this.IMAGES_DEAD);
    this.loadImages(this.IMAGES_HURT);
    this.loadImages(this.IMAGES_IDLE);
    this.loadImages(this.IMAGES_LONG_IDLE);
    this.animate();
    this.applyGravity();
  }

  animate() {
    this.walkingSound();
    this.move();
    this.walkingImages();
    this.hurtImages();
    this.jumpingImages();
    this.gameOverAnimation();
    this.idleAnimation();
  }

  /**Plays the running sound, if the query matches.*/
  walkingSound() {
    setInterval(() => {
      this.world.sounds.walking_sound.pause();
      if (this.world.keyboard.right || this.world.keyboard.left) {
        if (this.world.sounds.playSound == true) {
          this.world.sounds.walking_sound.play();
        }
      }
    }, 200);
  }

  /** Changes the dead images, when the value is true. */
  gameOverAnimation() {
    setInterval(() => {
      if (this.gameOver()) {
        this.playAnimation(this.IMAGES_DEAD);
        setTimeout(() => {
          this.world.clearAllIntervals();
        }, 350);
      }
    }, 100);
  }

  /**
   * If the character is not moving, play the idle animation.
   */
  idleAnimation() {
    setInterval(() => {
      if (!this.isAboveGround() && this.world.keyboard.nothing) {
        this.playAnimation(this.IMAGES_IDLE);
        this.startIdleTimer();
      } else {
        this.stopIdleTimer();
      }
    }, 350);
  }

  /**
   * Starts monitoring for inactivity.
   */
  startIdleTimer() {
    if (!this.idleInterval) {
      this.idleInterval = setInterval(() => {
        this.idleTime += 0.2;
        if (this.idleTime >= 2.6) {
          this.longIdleAnimation();
        }
      }, 200);
    }
  }

  /**
   * Stops monitoring for inactivity and resets idleTime.
   */
  stopIdleTimer() {
    if (this.idleInterval) {
      clearInterval(this.idleInterval);
      this.idleInterval = null;
      this.idleTime = 0;
    }
  }

  /**
   * The long idle animation plays after 4 seconds of inactivity.
   */
  longIdleAnimation() {
    if (!this.isAboveGround() && this.world.keyboard.nothing) {
      this.playAnimation(this.IMAGES_LONG_IDLE);
    }
  }

  /**
   * The value of the x changes, when the key are pressed.
   */
  move() {
    setInterval(() => {
      if (!this.gameOver()) {
        if (this.world.keyboard.right && this.x < this.world.endboss.x) {
          this.moveRight();
          this.otherDirection = false;
        }
        if (this.world.keyboard.left && this.x > 100) {
          this.moveLeft();
          this.otherDirection = true;
        }
        if (this.world.keyboard.jump && !this.isAboveGround()) {
          this.jump();
        }
        this.world.camera_x = -this.x + 100;
      }
    }, 1000 / 60);
  }

  /**
   * Changes the walking images, when the key are pressed.
   */
  walkingImages() {
    setInterval(() => {
      if (this.world.keyboard.right || this.world.keyboard.left) {
        this.playAnimation(this.IMAGES_WALKING);
      }
    }, 100);
  }

  /** Changes the hurt images and adds sound, when the value is true. */
  hurtImages() {
    setInterval(() => {
      if (this.isHurt()) {
        this.playAnimation(this.IMAGES_HURT);
        if (this.world.sounds.playSound == true) {
          this.world.sounds.hurt_sound.play();
          setTimeout(() => {
            this.world.sounds.hurt_sound.pause();
            this.world.sounds.hurt_sound.currentTime = 0;
          }, 400);
        }
      }
    }, 200);
  }

  /**
   * Changes the jumping images, when the key are pressed.
   */
  jumpingImages() {
    setInterval(() => {
      if (this.isAboveGround() || this.speedY > 0) {
        this.playAnimation(this.IMAGES_JUMPING);
      }
    }, 200);
  }
}
