class Level {
  enemies;
  clouds;
  background;
  bottles;
  coins;
  level1_end_x = 2850;

  constructor(enemies, clouds, background, bottles, coins) {
    this.enemies = enemies;
    this.clouds = clouds;
    this.background = background;
    this.bottles = bottles;
    this.coins = coins;
  }
}
