function Obstacle() {
  this.x = width; // Start the obstacle off-screen initially
  this.y = height * 0.72; // Align the obstacle's vertical position with the character
  this.w = 270; // Fixed width for all obstacles
  this.topMin = 50;
  this.botMin = height - 50;
  this.gapStart = random(this.topMin, this.botMin);
  this.gapLength = 200;
  this.speed = 13;
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
    // Define a buffer zone
    let buffer = -70; // Adjust the buffer size as needed

    // Check if character's y position is within the vertical bounds of the obstacle plus the buffer
    if (
      character.y > this.y - this.w / 2 - buffer &&
      character.y < this.y + this.w / 2 + buffer
    ) {
      // Check if character's x position is within the horizontal bounds of the obstacle plus the buffer
      if (
        character.x + character.diam / 2 > this.x - buffer &&
        character.x - character.diam / 2 < this.x + this.w + buffer
      ) {
        this.highlight = true;
        return true;
      }
    }
    this.highlight = false;
    return false;
  };
}

function ObstacleType2() {
  this.x = width;
  this.y = height * 0.72;
  this.w = 270;
  this.topMin = 50;
  this.botMin = height - 50;
  this.gapStart = random(this.topMin, this.botMin);
  this.gapLength = 200;
  this.speed = 12;
  this.img = loadImage("oponente2.png"); // Image for Type 2 obstacle

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
    image(this.img, this.x, this.y, this.w, this.w);
  };

  this.update = function () {
    this.x -= this.speed;
  };

  this.offscreen = function () {
    return this.x < -this.w;
  };

  this.hits = function (character) {
    // Define a buffer zone
    let buffer = -70; // Adjust the buffer size as needed

    // Check if character's y position is within the vertical bounds of the obstacle plus the buffer
    if (
      character.y > this.y - this.w / 2 - buffer &&
      character.y < this.y + this.w / 2 + buffer
    ) {
      // Check if character's x position is within the horizontal bounds of the obstacle plus the buffer
      if (
        character.x + character.diam / 2 > this.x - buffer &&
        character.x - character.diam / 2 < this.x + this.w + buffer
      ) {
        this.highlight = true;
        return true;
      }
    }
    this.highlight = false;
    return false;
  };
}
