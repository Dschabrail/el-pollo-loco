class StatusBarEndboss extends DrawableObject {
  percentage = 100;
  x = 500;

  STATUSBAR = [
    "img/7_statusbars/2_statusbar_endboss/statusbar/100.png",
    "img/7_statusbars/2_statusbar_endboss/statusbar/80.png",
    "img/7_statusbars/2_statusbar_endboss/statusbar/60.png",
    "img/7_statusbars/2_statusbar_endboss/statusbar/40.png",
    "img/7_statusbars/2_statusbar_endboss/statusbar/20.png",
    "img/7_statusbars/2_statusbar_endboss/statusbar/0.png",
  ];

  ICON = [
    'img/7_statusbars/3_icons/icon_health_endboss.png'
  ]

  constructor() {
    super();
    this.loadImages(this.STATUSBAR);
    this.y = 0;
    this.width = 200;
    this.height = 60;
    this.setPercentage(100);
  }

  setPercentage(percentage) {
    this.percentage = percentage;
    let path = this.STATUSBAR[this.resolveImageIndex()];
    this.img = this.imageCache[path];
  }

  resolveImageIndex() {
    if (this.percentage == 100 || this.percentage == 90) {
      return 0;
    } else if (this.percentage == 80 || this.percentage == 70) {
      return 1;
    } else if (this.percentage == 60 || this.percentage == 50) {
      return 2;
    } else if (this.percentage == 40 || this.percentage == 30) {
      return 3;
    } else if (this.percentage == 20 || this.percentage == 10) {
      return 4;
    } else if (this.percentage == 0) {
      return 5;
    }
  }
}
