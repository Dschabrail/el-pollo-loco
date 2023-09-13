class DrawableObject {
  x = 120;
  y = 300;
  height = 160;
  width = 100;
  currentImage = 0;
  img;
  imageCache = {};

  loadImage(path) {
    this.img = new Image();
    this.img.src = path;
  }

  loadImages(arr) {
    arr.forEach((path) => {
      let img = new Image();
      img.src = path;
      this.imageCache[path] = img;
    });
  }

  draw(ctx) {
    try {
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    } catch(e){
      console.warn('Error loading Image', e);
      console.log('Could not load Image', this.img)
    }
  }
}
