let canvas;
let world;
let keyboard = new Keyboard();
let sounds = new Soundboard();

function init() {
  canvas = document.querySelector("canvas");
  world = new World(canvas, keyboard, sounds);
  newGame();
}

/**
 * The canvas get visible, after the button is pressed.
 */
function newGame() {
  let canvas = document.getElementById("canvas");
  let container = document.getElementById("win-div");
  let volumeImg = document.getElementById("volume-img");

  canvas.classList.remove("d-none");
  container.classList.add("d-none");
  volumeImg.classList.add("d-none");
  disableButton();
  newGameVolume();
}

/**
 * Plays the sound if the volume is on.
 */
function newGameVolume() {
  let volumeImg = document.getElementById("volume-img");
  let currentSrc = volumeImg.src;

  let src1 = "img/info/volume.png";

  if (currentSrc.endsWith(src1)) {
    sounds.playSound = true;
    sounds.background_music.play();
  }
}

/**
 * After the game starts, the start button get invisible.
 */
function disableButton() {
  let button = document.getElementById("start-button");
  button.classList.add("d-none");
}

/**
 * If win the game, shows number of collected coins.
 */
function coinNumber() {
  let number = document.getElementById("coins-number");
  number.innerHTML = `${world.coins.length}`;
}

/**
 * Toggles between two images when an image is clicked.
 */
function toggleVolumeImg() {
  let volumeImg = document.getElementById("volume-img");
  let currentSrc = volumeImg.src;

  let src1 = "img/info/volume.png";
  let src2 = "img/info/volume-off.png";

  if (currentSrc.endsWith(src2)) {
    volumeImg.src = src1;
    sounds.playSound = true;
    sounds.background_music.play();
  } else {
    volumeImg.src = src2;
    sounds.stopAllSounds();
  }
}