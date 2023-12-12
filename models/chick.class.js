class Chick extends MovableObject {
  height = 50;
  width = 50;
  y = 375;
  life = 1;

  IMAGES_WALKING = [
    "img/3_enemies_chicken/chicken_small/1_walk/1_w.png",
    "img/3_enemies_chicken/chicken_small/1_walk/2_w.png",
    "img/3_enemies_chicken/chicken_small/1_walk/3_w.png",
  ];

  IMAGE_DEAD = ["img/3_enemies_chicken/chicken_small/2_dead/dead.png"];

  constructor(x) {
    super().loadImage("img/3_enemies_chicken/chicken_small/1_walk/1_w.png");
    this.x = x;
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGE_DEAD);
    this.animate();
    this.speed = 0.15 + Math.random() * 0.5;
  }

  animate() {
    this.move();
    this.dead();
  }

  /**
   * Plays animation if the chicken is dead.
   */
  dead() {
    setInterval(() => {
      if (this.life == 0) {
        this.speed = 0;
        this.playAnimation(this.IMAGE_DEAD);
      } else {
        this.playAnimation(this.IMAGES_WALKING);
      }
    }, 150);
  }

  /**
   * The object moves left.
   */
  move() {
    setInterval(() => {
      this.moveLeft();
    }, 1000 / 60);
  }
}