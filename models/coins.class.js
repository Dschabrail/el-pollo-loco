class Coins extends MovableObject {
  height = 90;
  width = 90;

  offset = {
    top: 25,
    right: 25,
    bottom: 25,
    left: 25
  };

  IMAGES = ["img/8_coin/coin_1.png", "img/8_coin/coin_2.png"];

  constructor(x, y) {
    super().loadImage("img/8_coin/coin_1.png");
    this.loadImages(this.IMAGES);
    this.x = x;
    this.y = y;
    this.animate();
  }

  animate() {
    setInterval(() => {
      this.playAnimation(this.IMAGES);
    }, 1000);
  }
}
