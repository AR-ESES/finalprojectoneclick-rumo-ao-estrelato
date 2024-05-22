function Character() {
  this.y = height / 2;
  this.x = width / 4; // Start more to the left or right
  this.push = 1.75;
  this.lift = -44;
  this.velocity = 0;
  this.diam = 120; // Size of the character
  this.minHeight = height * 0.2; // Height in relation to the ground
  this.img1 = loadImage("boneco2.png"); // First image
  this.img2 = loadImage("boneco3.png"); // Second image
  this.jumpImg = loadImage("boneco1.png"); // Jumping image
  this.currentImage = this.img1; // Start with the first image
  this.imageTimer = 0;
  this.imageInterval = 10; // Interval for image change

  this.show = function () {
    // Use this function to design the main character
    stroke(0);
    strokeWeight(2);
    fill(255);
    image(this.currentImage, this.x, this.y, this.diam, this.diam * 0.7368421053); // Insert the raw PNG image proportion rate and use this.diam to input image width
  };

  this.goUp = function () {
    this.velocity += this.lift;
    console.log(this.velocity);
  };

  this.update = function () {
    this.velocity += this.push;
    this.velocity *= 0.9;
    this.y += this.velocity;

    if (this.y >= height - this.minHeight) {
      this.y = height - this.minHeight;
      this.velocity = 0;
    }

    if (this.y < 0) {
      this.y = 0;
      this.velocity = 0;
    }

    // Check if spacebar is pressed
    if (keyIsDown(32)) { // 32 is the keyCode for spacebar
      this.currentImage = this.jumpImg; // Change to jumping image
    } else {
      // Update image based on timer
      this.imageTimer++;
      if (this.imageTimer >= this.imageInterval) {
        // Switch image
        if (this.currentImage === this.img1) {
          this.currentImage = this.img2;
        } else {
          this.currentImage = this.img1;
        }
        this.imageTimer = 0; // Reset timer
      }
    }
  };
}
