let canvas;
let world; 
let keyboard = new Keyboard();


function init() {
  canvas = document.querySelector("canvas");
  world = new World(canvas, keyboard);
  disableButton();
}

function disableButton() {
  let button = document.getElementById('start-button');
  button.classList.add('d-none');
}

window.addEventListener("keydown", (event) => {
  if(event.keyCode == 39) {
    keyboard.right = true;
  }

  if(event.keyCode == 37) {
    keyboard.left = true;
  }

  if(event.keyCode == 32) {
    keyboard.jump = true;
  }

  if(event.keyCode == 68) {
    keyboard.trow = true;
  }
})


window.addEventListener("keyup", (event) => {
  if(event.keyCode == 39) {
    keyboard.right = false;
  }

  if(event.keyCode == 37) {
    keyboard.left = false;
  }

  if(event.keyCode == 32) {
    keyboard.jump = false;
  }

  if(event.keyCode == 68) {
    keyboard.trow = false;
  }
})
