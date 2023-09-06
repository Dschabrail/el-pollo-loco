class Chick extends MovableObject {
    height = 50;
    width = 50;
    y = 375;
  
    IMAGES_WALKING = [
      "img/3_enemies_chicken/chicken_small/1_walk/1_w.png",
      "img/3_enemies_chicken/chicken_small/1_walk/2_w.png",
      "img/3_enemies_chicken/chicken_small/1_walk/3_w.png",
    ];
  
    constructor(x) {
      super().loadImage("img/3_enemies_chicken/chicken_small/1_walk/1_w.png");
  
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
        this.playAnimation(this.IMAGES_WALKING);
      }, 150);
    }
  }
  