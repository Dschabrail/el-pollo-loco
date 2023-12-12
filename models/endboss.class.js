class Endboss extends MovableObject {
  height = 280;
  width = 280;
  y = 165;
  x = 2800;
  hadFirstContact = false;
  i = 0;
  speed = 1.5;
  world;

  offset = {
    top: 50,
    right: 15,
    bottom: 5,
    left: 15,
  };

  IMAGES_WALKING = [
    "img/4_enemie_boss_chicken/1_walk/G1.png",
    "img/4_enemie_boss_chicken/1_walk/G2.png",
    "img/4_enemie_boss_chicken/1_walk/G3.png",
    "img/4_enemie_boss_chicken/1_walk/G4.png",
  ];

  IMAGES_ALERT = [
    "img/4_enemie_boss_chicken/2_alert/G5.png",
    "img/4_enemie_boss_chicken/2_alert/G6.png",
    "img/4_enemie_boss_chicken/2_alert/G7.png",
    "img/4_enemie_boss_chicken/2_alert/G8.png",
    "img/4_enemie_boss_chicken/2_alert/G9.png",
    "img/4_enemie_boss_chicken/2_alert/G10.png",
    "img/4_enemie_boss_chicken/2_alert/G11.png",
    "img/4_enemie_boss_chicken/2_alert/G12.png",
  ];

  IMAGES_ATTACK = [
    "img/4_enemie_boss_chicken/3_attack/G13.png",
    "img/4_enemie_boss_chicken/3_attack/G14.png",
    "img/4_enemie_boss_chicken/3_attack/G15.png",
    "img/4_enemie_boss_chicken/3_attack/G16.png",
    "img/4_enemie_boss_chicken/3_attack/G17.png",
    "img/4_enemie_boss_chicken/3_attack/G18.png",
    "img/4_enemie_boss_chicken/3_attack/G19.png",
    "img/4_enemie_boss_chicken/3_attack/G20.png",
  ];

  IMAGES_HURT = [
    "img/4_enemie_boss_chicken/4_hurt/G21.png",
    "img/4_enemie_boss_chicken/4_hurt/G22.png",
    "img/4_enemie_boss_chicken/4_hurt/G23.png",
  ];

  IMAGES_DEAD = [
    "img/4_enemie_boss_chicken/5_dead/G24.png",
    "img/4_enemie_boss_chicken/5_dead/G25.png",
    "img/4_enemie_boss_chicken/5_dead/G26.png",
  ];

  constructor() {
    super().loadImage("img/4_enemie_boss_chicken/1_walk/G1.png");
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_ALERT);
    this.loadImages(this.IMAGES_ATTACK);
    this.loadImages(this.IMAGES_HURT);
    this.loadImages(this.IMAGES_DEAD);
    this.animate();
  }

  animate() {
    this.firstContact();
    this.deadAnimation();
    this.hurt();
    this.attack();
  }

  /**
   * Initiates the first contact behavior, switching between alert and walking animations.
   */
  firstContact() {
    setInterval(() => {
      if (this.i < 10) {this.playAnimation(this.IMAGES_ALERT);} 
      else {this.playAnimation(this.IMAGES_WALKING);}
      this.i++;
      if (this.world.character.x > 2200 && !this.hadFirstContact) {
        this.i = 0;
        this.hadFirstContact = true;
        setTimeout(() => {
          this.move();
        }, 2500);
      }
    }, 200);
  }

  /**
   * Initiates the dead animation and ends the game when the life reaches zero.
   */
  deadAnimation() {
    setInterval(() => {
      if (this.life <= 0) {
        this.speed = 0;
        this.playAnimation(this.IMAGES_DEAD);
        if (this.world.sounds.playSound == true) {
          this.world.sounds.chicken_sound.play();
        }
        setTimeout(() => {
          this.endTheGame();
        }, 100);
      }
    }, 400);
  }

  /**
   * Ends the game after a delay when the character dies.
   */
  endTheGame() {
    setTimeout(() => {
      this.world.clearAllIntervals();
      this.world.winTheGame();
    }, 300);
  }

  /**
   * Initiates the movement of the object.
   */
  move() {
    setInterval(() => {
      this.moveLeft();
    }, 1000 / 60);
  }

  /**
   * Initiates the hurt animation when the object is hurt.
   */
  hurt() {
    setInterval(() => {
      if (this.isHurt()) {
        this.playAnimation(this.IMAGES_HURT);
      }
    }, 100);
  }

  /**
   * Initiates the attack animation when the character is within range.
   */
  attack() {
    setInterval(() => {
      if (this.world.character.x >= this.x) {
        this.playAnimation(this.IMAGES_ATTACK);
      }
    }, 200);
  }
}
