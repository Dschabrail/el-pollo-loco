class Keyboard {
  left = false;
  right = false;
  jump = false;
  throw = false;
  nothing = true;

  constructor() {
    this.keyPressEvents();
    this.btnPressEvents();
  }

  btnPressEvents() {
    document.getElementById("btnLeft").addEventListener("touchstart", (e) => {
      e.preventDefault();
      this.left = true;
      this.nothing = false;
    });

    document.getElementById("btnLeft").addEventListener("touchend", (e) => {
      e.preventDefault();
      this.left = false;
      this.nothing = true;
    });

    document.getElementById("btnRight").addEventListener("touchstart", (e) => {
      e.preventDefault();
      this.right = true;
      this.nothing = false;
    });

    document.getElementById("btnRight").addEventListener("touchend", (e) => {
      e.preventDefault();
      this.right = false;
      this.nothing = true;
    });

    document.getElementById("btnUp").addEventListener("touchstart", (e) => {
      e.preventDefault();
      this.jump = true;
      this.nothing = false;
    });

    document.getElementById("btnUp").addEventListener("touchend", (e) => {
      e.preventDefault();
      this.jump = false;
      this.nothing = true;
    });

    document.getElementById("btnThrow").addEventListener("touchstart", (e) => {
      e.preventDefault();
      this.throw = true;
      this.nothing = false;
    });

    document.getElementById("btnThrow").addEventListener("touchend", (e) => {
      e.preventDefault();
      this.throw = false;
      this.nothing = true;
    });
  }

  keyPressEvents() {
    window.addEventListener("keydown", (event) => {
      if (event.keyCode == 39) {
        this.right = true;
        this.nothing = false;
      }

      if (event.keyCode == 37) {
        this.left = true;
        this.nothing = false;
      }

      if (event.keyCode == 32) {
        this.jump = true;
        this.nothing = false;
      }

      if (event.keyCode == 68) {
        this.throw = true;
        this.nothing = false;
      }
    });

    window.addEventListener("keyup", (event) => {
      if (event.keyCode == 39) {
        this.right = false;
        this.nothing = true;
      }

      if (event.keyCode == 37) {
        this.left = false;
        this.nothing = true;
      }

      if (event.keyCode == 32) {
        this.jump = false;
        this.nothing = true;
      }

      if (event.keyCode == 68) {
        this.throw = false;
        this.nothing = true;
      }
    });
  }
}