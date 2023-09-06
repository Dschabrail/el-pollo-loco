class Character extends MovableObject {
  y = 210;
  height = 220;
  speed = 5;
  width = 120;

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
    "img/2_character_pepe/4_hurt/H-43.png"
  ];

  world;
  walking_sound = new Audio("audio/running.mp3");

  constructor() {
    super().loadImage("img/2_character_pepe/1_idle/idle/I-1.png");
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_JUMPING);
    this.loadImages(this.IMAGES_DEAD);
    this.loadImages(this.IMAGES_HURT);
    this.animate();
    this.moveRight();
    this.applyGravity();
  }

  animate() {
    /**
     * Plays the running sound, if the query matches.
     */
    setInterval(() => {
      this.walking_sound.pause();
      if (this.world.keyboard.right && this.x < this.world.level.level1_end_x) {
        this.walking_sound.play();
      }
      if (this.world.keyboard.left && this.x > 100) {
        this.walking_sound.play();
      }
    }, 500);

    /**
     * The value of the x changes, when the key are pressed.
     */
    setInterval(() => {
      if (this.world.keyboard.right && this.x < this.world.level.level1_end_x) {
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
    }, 1000 / 60);

    /**
     * Changes the walking images, when the key are pressed.
     */
    setInterval(() => {
      if (this.world.keyboard.right || this.world.keyboard.left) {
        this.playAnimation(this.IMAGES_WALKING);
      }
    }, 100);

    /**
     * Changes the jumping images, when the key are pressed.
     */
    setInterval(() => {
      if (this.isAboveGround() || this.speedY > 0) {
        this.playAnimation(this.IMAGES_JUMPING);
      }
    }, 200);

    /** Changes the dead images, when the value is true. */
    setInterval(() => {
      if (this.gameOver()) {
        this.playAnimation(this.IMAGES_DEAD);
      }
    }, 200);

    /** Changes the hurt images, when the value is true. */
    setInterval(() => {
      if (this.isHurt()) {
        this.playAnimation(this.IMAGES_HURT);
      }
    }, 200);
  }
}
