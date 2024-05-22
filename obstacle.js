function Obstacle() {
  this.x = width; // Start the obstacle off-screen initially
  this.y = height * 0.80; // Align the obstacle's vertical position with the character
  this.w = 125; // Fixed width for all obstacles
  this.topMin = 50;
  this.botMin = height - 50;
  this.gapStart = random(this.topMin, this.botMin);
  this.gapLength = 200;
  this.speed = 10;
  this.img2 = loadImage("oponente1.png");

  this.show = function () {
    fill(0);
    if (this.highlight) {
      // Draw two circles to indicate impact
      noFill();
      stroke(255);
      strokeWeight(3);
      ellipse(this.x + this.w / 2, this.y + this.w / 2, this.w * 1.2, this.w * 1.2);
      ellipse(this.x + this.w / 2, this.y + this.w / 2, this.w * 1.5, this.w * 1.5);
    }
    image(this.img2, this.x, this.y, this.w, this.w);
  };

  this.update = function () {
    this.x -= this.speed;
  };

  this.offscreen = function () {
    return this.x < -this.w;
  };

  this.hits = function (character) {
    if (
      character.y > this.y - this.w / 2 &&
      character.y < this.y + this.w / 2
    ) {
      if (
        character.x + character.diam / 2 > this.x &&
        character.x - character.diam / 2 < this.x + this.w
      ) {
        this.highlight = true;
        return true;
      }
    }
    this.highlight = false;
    return false;
  };
}

