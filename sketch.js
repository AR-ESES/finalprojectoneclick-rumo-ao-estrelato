let boneco;
let adeversario1 = []; // obstacle Type 1 List
let obstaclesCleared;
let obstaclesHit;
let backgroundImage;
let points;
let posFundo;
let velFundo;
let bgWidth, bgHeight;
let frameCountBettwenObstaclesType1 = 20;
let nivelDeDificuldade = 1;
let counterImage; // Image for the counter
let upheavalFont; // Variable to hold the font

function preload() {
  backgroundImage = loadImage("estadionovo2.png");
  counterImage = loadImage("scoreboardD-01.png"); // Replace with your image file
  upheavalFont = loadFont("upheavtt.ttf"); // Replace with the file name of your font
}

function setup() {
  var canvas = createCanvas(windowWidth, windowHeight);
  boneco = new Character();

  obstaclesCleared = 0;
  obstaclesHit = 0;
  points = 0; // Initialize points

  posFundo = 0;
  velFundo = 5;

  adeversario1.push(new Obstacle());

  // Calculate the background image dimensions while preserving the aspect ratio
  let aspectRatio = backgroundImage.width / backgroundImage.height;
  bgWidth = windowWidth;
  bgHeight = windowWidth / aspectRatio;

  if (bgHeight < windowHeight) {
    bgHeight = windowHeight;
    bgWidth = windowHeight * aspectRatio;
  }
}

function draw() {
  clear();
  background(255);

  // Draw the background images
  image(backgroundImage, posFundo, 0, bgWidth, bgHeight);
  image(backgroundImage, posFundo + bgWidth, 0, bgWidth, bgHeight);

  // Move the background
  posFundo -= velFundo;

  // Reset the position of the background to create a seamless loop
  if (posFundo <= -bgWidth) {
    posFundo = 0;
  }

  frameCountBettwenObstaclesType1 = int(random(65, 70)); // Control frequency of obstacles

  boneco.show();
  boneco.update();

  if (frameCount % frameCountBettwenObstaclesType1 == 0) {
    adeversario1.push(new Obstacle());
  }

  for (var i = adeversario1.length - 1; i >= 0; i--) {
    adeversario1[i].show();
    adeversario1[i].update();

    if (adeversario1[i].hits(boneco)) {
      obstaclesHit++;
      points += 0; // Add 0 points for hitting the obstacle
      adeversario1[i].hit = true; // Mark the obstacle as hit
    }

    if (adeversario1[i].offscreen()) {
      if (!adeversario1[i].hit) {
        points += 10; // Add points for cleared obstacle if it wasn't hit
      }
      adeversario1.splice(i, 1);
      obstaclesCleared++;
    }
  }

  // Display points counter image and points in the top left corner
  let counterWidth = 180; // Adjust the width as needed
  let counterHeight = 100; // Adjust the height as needed
  let counterX = 10;
  let counterY = 10;

  image(counterImage, counterX, counterY, counterWidth, counterHeight);

  // Set the font
  textFont(upheavalFont);
  // Set the fill color to yellow/orange
  fill(255, 165, 0);
  textSize(32);
  textAlign(CENTER, CENTER);

  // Center the text within the image
  let textX = counterX + counterWidth / 2;
  let textY = counterY + counterHeight / 1.75;
  text(points, textX, textY);
}

function keyPressed() {
  if (key === " ") {
    boneco.goUp();
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  // Adjust obstacle positions on window resize
  for (let i = 0; i < adeversario1.length; i++) {
    adeversario1[i].y = height * 0.74;
    adeversario1[i].topMin = 50;
    adeversario1[i].botMin = height - 50;
    adeversario1[i].gapStart = random(adeversario1[i].topMin, adeversario1[i].botMin);
  }
}


