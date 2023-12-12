class MovableObject extends DrawableObject {
  speed = 0.15;
  otherDirection = false;
  speedY = 0;
  acceleration = 1;
  life = 100;
  lastHit = 0;

  offset = {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  };

  /**
   * Applies gravity to the object's vertical position.
   */
  applyGravity() {
    setInterval(() => {
      if (this.isAboveGround() || this.speedY > 0) {
        this.y -= this.speedY;
        this.speedY -= this.acceleration;
      }
    }, 1000 / 25);
  }

  /**
   * Checks if the object is above the ground.
   * @returns {boolean} - True if the object is above the ground, false otherwise.
   */
  isAboveGround() {
    if (this instanceof ThrowableObject) {
      return true;
    } else {
      return this.y < 210;
    }
  }

  /**
   * Checks if the game is over for the object.
   * @returns {boolean} - True if the object's life is zero, false otherwise.
   */
  gameOver() {
    return this.life == 0;
  }

  /**
   * Inflicts damage on the object, reducing its life.
   */
  damage() {
    this.life -= 10;
    if (this.life < 0) {
      this.life = 0;
    } else {
      this.lastHit = new Date().getTime();
    }
  }

  /**
   * Checks if the object is hurt based on the time since the last hit.
   * @returns {boolean} - True if the object is hurt, false otherwise.
   */
  isHurt() {
    let timepassed = new Date().getTime() - this.lastHit;
    timepassed = timepassed / 1000;
    return timepassed < 1;
  }

  /**
   * Moves the object to the right.
   */
  moveRight() {
    this.x += this.speed;
  }

  /**
   * Moves the object to the left.
   */
  moveLeft() {
    this.x -= this.speed;
  }

  /**
   * Makes the object jump by setting its vertical speed.
   */
  jump() {
    this.speedY = 12.5;
  }

  /**
   * Plays an animation by changing the object's image.
   * @param {Array} images - An array of image paths for the animation.
   */
  playAnimation(images) {
    let i = this.currentImage % images.length;
    let path = images[i];
    this.img = this.imageCache[path];
    this.currentImage++;
  }

  /**
   * Checks if the object is colliding with another object.
   * @param {Object} object - The object to check for collision with.
   * @returns {boolean} - True if the objects are colliding, false otherwise.
   */
  isColliding(object) {
    return (
      this.x + this.width - this.offset.right > object.x + object.offset.left &&
      this.y + this.height - this.offset.bottom >
        object.y + object.offset.top &&
      this.x + this.offset.left <
        object.x + object.width - object.offset.right &&
      this.y + this.offset.top < object.y + object.height - object.offset.bottom
    );
  }

  /**
   * Checks if the object is on top of another object.
   * @param {Object} object - The object to check for being on top of.
   * @returns {boolean} - True if the object is on top of the other object, false otherwise.
   */
  isOnObject(object) {
    return this.x + this.width > object.x && this.y + this.height == object.y;
  }
}
