class DrawableObject {
  x = 120;
  y = 300;
  height = 160;
  width = 100;
  currentImage = 0;
  img;
  imageCache = {};

  /**
   * Loads an image from the given path.
   * @param {string} path - The path to the image file.
   */
  loadImage(path) {
    this.img = new Image();
    this.img.src = path;
  }

  /**
   * Loads multiple images from an array of file paths.
   * @param {Array} arr - An array of image file paths to load.
   */
  loadImages(arr) {
    arr.forEach((path) => {
      let img = new Image();
      img.src = path;
      this.imageCache[path] = img;
    });
  }

  /**
   * Draws the loaded image on the canvas context.
   * @param {CanvasRenderingContext2D} ctx - The canvas 2D rendering context.
   */
  draw(ctx) {
    try {
      ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    } catch (e) {
      console.warn("Error loading Image", e);
      console.log("Could not load Image", this.img);
    }
  }
}
