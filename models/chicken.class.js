class Chicken extends MovableObject {
  height = 70;
  width = 70;
  y = 355;
  speed = 10;
  life = 1;

  IMAGES_WALKING = [
    "img/3_enemies_chicken/chicken_normal/1_walk/1_w.png",
    "img/3_enemies_chicken/chicken_normal/1_walk/2_w.png",
    "img/3_enemies_chicken/chicken_normal/1_walk/3_w.png",
  ];

  chicken_sound = new Audio("audio/chicken.mp3");

  constructor(x) {
    super().loadImage("img/3_enemies_chicken/chicken_normal/1_walk/1_w.png");

    this.x = x;
    this.loadImages(this.IMAGES_WALKING);
    this.animate();
    this.speed = 0.15 + Math.random() * 0.5;
  }

  animate() {
    setInterval(() => {
      this.moveLeft();
    }, 1000 / 60);

    setInterval(() => {
      if (this.life == 0) {
        this.speed = 0;
        this.loadImage("img/3_enemies_chicken/chicken_normal/2_dead/dead.png");
        this.chickenAudio();
      } else {
        this.playAnimation(this.IMAGES_WALKING);
      }
    }, 150);
  }

  chickenAudio() {
    this.chicken_sound.play();
    setTimeout(() => {
      this.chicken_sound.pause();
      this.chicken_sound.currentTime = 0;
    }, 1200);
  }
}
