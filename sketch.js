let boneco;
let obstaclesType1 = []; // Type 1 Obstacle List
let obstaclesType2 = []; // Type 2 Obstacle List
let obstaclesCleared;
let obstaclesHit;
let backgroundImage;
let points;
let posFundo;
let velFundo;
let bgWidth, bgHeight;
let frameCountBetweenObstaclesType1 = 20;
let frameCountBetweenObstaclesType2 = 60; // Adjust as needed
let nivelDeDificuldade = 1;
let counterImage; // Image for the counter
let upheavalFont; // Variable to hold the font

function preload() {
  backgroundImage = loadImage("estadionovo2.png");
  counterImage = loadImage("scoreboardD-01.png");
  upheavalFont = loadFont("upheavtt.ttf");
}

function setup() {
  var canvas = createCanvas(windowWidth, windowHeight);
  boneco = new Character();

  obstaclesCleared = 0;
  obstaclesHit = 0;
  points = 0;

  posFundo = 0;
  velFundo = 5;

  obstaclesType1.push(new Obstacle());
  obstaclesType2.push(new ObstacleType2());

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

  let frameCountBetweenObstaclesType1 = 200; // Increase the frame count for Type 1 obstacles
  let frameCountBetweenObstaclesType2 = 235; // Increase the frame count for Type 2 obstacles
  


  boneco.show();
  boneco.update();

  // Spawn Type 1 obstacles
  if (frameCount % frameCountBetweenObstaclesType1 == 0) {
    obstaclesType1.push(new Obstacle());
  }

  // Spawn Type 2 obstacles
  if (frameCount % frameCountBetweenObstaclesType2 == 0) {
    obstaclesType2.push(new ObstacleType2());
  }

  // Handle Type 1 obstacles
  handleObstacles(obstaclesType1);

  // Handle Type 2 obstacles
  handleObstacles(obstaclesType2);

  // Display points counter image and points in the top left corner
  let counterWidth = 180;
  let counterHeight = 100;
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
  for (let i = 0; i < obstaclesType1.length; i++) {
    obstaclesType1[i].y = height * 0.74;
    obstaclesType1[i].topMin = 50;
    obstaclesType1[i].botMin = height - 50;
    obstaclesType1[i].gapStart = random(obstaclesType1[i].topMin, obstaclesType1[i].botMin);
  }
  for (let i = 0; i < obstaclesType2.length; i++) {
    // Adjust positions for Type 2 obstacles if needed
  }
}

function handleObstacles(obstacleList) {
  for (let i = obstacleList.length - 1; i >= 0; i--) {
    obstacleList[i].show();
    obstacleList[i].update();

    if (obstacleList[i].hits(boneco)) {
      obstaclesHit++;
      points += 0;
      obstacleList[i].hit = true;
    }

    if (obstacleList[i].offscreen()) {
      if (!obstacleList[i].hit) {
        points += 10;
      }
      obstacleList.splice(i, 1);
      obstaclesCleared++;
    }
  }
}




