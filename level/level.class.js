class Level {
  enemies;
  clouds;
  background;
  statusbar;
  level1_end_x = 2250;

  constructor(enemies, clouds, background, statusbar) {
    this.statusbar = statusbar;
    this.enemies = enemies;
    this.clouds = clouds;
    this.background = background;
  }
}
