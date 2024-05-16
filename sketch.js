let boneco;
let adeversario1 = []; //obstacle Type 1 List, duplicate with different name if you want more
let obstaclesCleared;
let obstaclesHit;
let backgroundImage;

let posFundo;
let velFundo;

let frameCountBettwenObstaclesType1 = 20;
let nivelDeDificuldade = 1;

function preload() {
  backgroundImage = loadImage("estadionovo2.png");
}

function setup() {
  var canvas = createCanvas(800, 600);
  boneco = new Character();

  obstaclesCleared = 0;
  obstaclesHit = 0;

  posFundo = 0;
  velFundo = 10;

  adeversario1.push(new Obstacle());
}

function draw() {
  clear();
  background(255);
  image(backgroundImage,posFundo,0,height*9.99,height);

  frameCountBettwenObstaclesType1 = int(random(30,70));


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
    }

    if (adeversario1[i].offscreen()) {
      adeversario1.splice(i, 1);
      obstaclesCleared++;
    }
  }

if(posFundo<=-height*9.99){
  posFundo = 0;
}
else{
  posFundo=posFundo-velFundo;
}

}

function keyPressed() {
  if (key === " ") {
    boneco.goUp();
  }
}
