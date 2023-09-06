class Clouds extends MovableObject {
  y = 0;
  width = 720;
  height = 480;
  speed = 0.25;
  

  constructor(x) {
    super().loadImage("img/5_background/layers/4_clouds/1.png");

    this.x = x;
    this.animate();
  }

  animate() {
    setInterval(() => {
      this.moveLeft()
      if (this.x < -720) {
        this.x = 3600;
      }
    }, 1000 / 60);
  }
}
