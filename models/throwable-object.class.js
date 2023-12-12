class ThrowableObject extends MovableObject {
  BOTTLE_ROTATION = [
    "img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png",
    "img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png",
    "img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png",
    "img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png",
  ];

  constructor(x, y) {
    super().loadImage(
      "img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png"
    );
    this.loadImages(this.BOTTLE_ROTATION);
    this.x = x;
    this.y = y;
    this.height = 60;
    this.width = 50;
    this.animate();
  }

  animate() {
    this.throw();
  }

  /**
   * If the bottle is thrown, plays an animation and the bottle moves.
   */
  throw() {
    this.speedY = 15;
    this.isAboveGround();
    this.applyGravity();
    setInterval(() => {
      this.x += 17;
    }, 55);
    setInterval(() => {
      this.playAnimation(this.BOTTLE_ROTATION);
    }, 200);
  }
}
