let canvas;
let world; 
let keyboard = new Keyboard();


function init() {
  canvas = document.querySelector("canvas");
  world = new World(canvas, keyboard);
  newGame();
}

function newGame() {
  let canvas = document.getElementById('canvas');
  let container = document.getElementById('win-div');

  canvas.classList.remove('d-none');
  container.classList.add('d-none');
  disableButton();
  
}

function disableButton() {
  let button = document.getElementById('start-button');
  button.classList.add('d-none');
}

function coinNumber() {
  let number = document.getElementById('coins-number');
  number.innerHTML = `${world.coins.length}`
}