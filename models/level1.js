function initLevel() {
  return new Level(
    createLevelAnemies(),
    createLevelClouds(),
    createLevelBackgrounds(),
    createLevelBottles(),
    createLevelCoins()
  );
}

function createLevelAnemies() {
  return [
    new Chicken(600), new Chicken(1900), new Chicken(900), new Chicken(700),
    new Chicken(1700), new Chicken(1200), new Chicken(2500), new Chicken(2700),
    new Chicken(2100), new Chicken(1500), new Chick(600), new Chick(800),
    new Chick(1350), new Chick(1000), new Chick(2000), new Chick(1850),
    new Chick(1650), new Chick(2100), new Chick(1450), new Chick(1250),
  ];
}

function createLevelClouds() {
  return [
    new Clouds(0),
    new Clouds(720),
    new Clouds(1440),
    new Clouds(2160),
    new Clouds(2880),
    new Clouds(3600),
  ];
}

function createLevelBackgrounds() {
  return [
    new Background("img/5_background/layers/1_first_layer/1.png", 0),
    new Background("img/5_background/layers/2_second_layer/1.png", 0),
    new Background("img/5_background/layers/3_third_layer/1.png", 0),
    new Background("img/5_background/layers/air.png", 0),
    new Background("img/5_background/layers/1_first_layer/2.png", 720),
    new Background("img/5_background/layers/2_second_layer/2.png", 720),
    new Background("img/5_background/layers/3_third_layer/2.png", 720),
    new Background("img/5_background/layers/air.png", 720),
    new Background("img/5_background/layers/1_first_layer/1.png", 720 * 2),
    new Background("img/5_background/layers/2_second_layer/1.png", 720 * 2),
    new Background("img/5_background/layers/3_third_layer/1.png", 720 * 2),
    new Background("img/5_background/layers/air.png", 720 * 2),
    new Background("img/5_background/layers/1_first_layer/2.png", 720 * 3),
    new Background("img/5_background/layers/2_second_layer/2.png", 720 * 3),
    new Background("img/5_background/layers/3_third_layer/2.png", 720 * 3),
    new Background("img/5_background/layers/air.png", 720 * 3),
    new Background("img/5_background/layers/1_first_layer/1.png", 720 * 4),
    new Background("img/5_background/layers/2_second_layer/1.png", 720 * 4),
    new Background("img/5_background/layers/3_third_layer/1.png", 720 * 4),
    new Background("img/5_background/layers/air.png", 720 * 4),
  ];
}

function createLevelCoins() {
  return [
    new Coins(400, 200),
    new Coins(1000, 250),
    new Coins(1300, 300),
    new Coins(2200, 200),
    new Coins(2500, 250),
  ];
}

function createLevelBottles() {
  return [
    new Bottles(300),
    new Bottles(600),
    new Bottles(1000),
    new Bottles(1500),
    new Bottles(2100),
  ];
}
