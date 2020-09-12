var database;
var dog, dog_img, happydog_img
var foodS, foodstock;


function preload() {
  dog_img = loadImage("dogImg.png");
  happydog_img = loadImage("dogImg1.png");
}


function setup() {
  createCanvas(500, 500);

  dog = createSprite(250, 350);
  dog.addImage("normal", dog_img);
  dog.scale = 0.3;

  database = firebase.database();

  foodstock = database.ref("Food");
  foodstock.on("value", readStock);
}


function draw() {
  background(46, 139, 87);

  if (keyWentDown(UP_ARROW)) {
    writeStock();
    dog.addImage("happy", happydog_img);
  }

  drawSprites();
  textSize(20);
  stroke(255);
  textAlign(CENTER, CENTER);
  text("Food Remaining: " + foodS, 250, 100);
}


function readStock(data) {
  foodS = data.val();
}


function writeStock() {

  if (foodS < 0) {
    foodS = 0
  }

  database.ref("/").update({
    "Food": foodS--
  })
}
