class Chicken extends MovableObject {
  height = 70;
  width = 70;
  y = 355;

  IMAGES_WALKING = [
    "img/3_enemies_chicken/chicken_normal/1_walk/1_w.png",
    "img/3_enemies_chicken/chicken_normal/1_walk/2_w.png",
    "img/3_enemies_chicken/chicken_normal/1_walk/3_w.png",
  ];

  constructor() {
    super().loadImage("img/3_enemies_chicken/chicken_normal/1_walk/1_w.png");

    this.x = 200 + Math.random() * 500;
    this.loadImages(this.IMAGES_WALKING);
    this.animate();
    this.speed = 0.15 + Math.random() * 0.5;
  }

  animate() {
    setInterval(() => {
      this.moveLeft();
      if (this.x + this.width < 0) {
        this.x = 720;
      }
    }, 1000 / 60);

    setInterval(() => {
      this.playAnimation(this.IMAGES_WALKING);
    }, 150);
  }
}
