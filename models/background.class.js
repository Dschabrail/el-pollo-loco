class Background extends MovableObject {
  y = 0;
  width = 720;
  height = 480;

  constructor(ImagePath, x) {
    super().loadImage(ImagePath);

    this.x = x;
  }
}
