class Soundboard {
  chicken_sound = new Audio("audio/chicken.mp3");
  background_music = new Audio("audio/background-music.mp3");
  walking_sound = new Audio("audio/running.mp3");
  hurt_sound = new Audio("audio/hurt.mp3");
  collecting_sound = new Audio("audio/collecting.mp3");

  playSound = false;

  /**
   * Stops all currently playing sounds.
   */
  stopAllSounds() {
    this.playSound = false;
    this.chicken_sound.pause();
    this.background_music.pause();
    this.walking_sound.pause();
    this.hurt_sound.pause();
    this.collecting_sound.pause();
  }
}
