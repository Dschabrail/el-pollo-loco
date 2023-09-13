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
    left: 0
  };

  applyGravity() {
    setInterval(() => {
      if (this.isAboveGround() || this.speedY > 0) {
        this.y -= this.speedY;
        this.speedY -= this.acceleration;
      }
    }, 1000 / 25);
  }

  isAboveGround() {
    if (this instanceof ThrowableObject) {
      return true;
    } else {
      return this.y < 210;
    }
  }

  gameOver() {
    return this.life == 0;
  }

  damage() {
    this.life -= 10;
    if (this.life < 0) {
      this.life = 0;
    } else {
      this.lastHit = new Date().getTime();
    }
  }

  isHurt() {
    let timepassed = new Date().getTime() - this.lastHit;
    timepassed = timepassed / 1000;
    return timepassed < 1;
  }

  moveRight() {
    this.x += this.speed;
  }

  moveLeft() {
    this.x -= this.speed;
  }

  jump() {
    this.speedY = 17;
  } 

  playAnimation(images) {
    let i = this.currentImage % images.length;
    let path = images[i];
    this.img = this.imageCache[path];
    this.currentImage++;
  }

  isColliding(object) {
    return (
      this.x + this.width - this.offset.right > object.x + object.offset.left &&
      this.y + this.height - this.offset.bottom > object.y + object.offset.top &&
      this.x + this.offset.left < object.x + object.width - object.offset.right &&
      this.y + this.offset.top < object.y + object.height - object.offset.bottom
    );
  }

  isOnObject(object) {
    return (
      this.x + this.width > object.x &&
      this.y + this.height == object.y 
    )
  }
}
