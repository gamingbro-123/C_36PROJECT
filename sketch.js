var dog,sadDog,happyDog, database;
var foodS,foodStock;
var addFood;
var foodObj;
var feed,lastFed;

//create feed and lastFed variable here



function preload(){
sadDog=loadImage("Dog.png");
happyDog=loadImage("happy dog.png");
}

function setup() {
  database=firebase.database();
  createCanvas(1000,400);

  foodObj = new Food();

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);
  
  dog=createSprite(800,200,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;

  //create feed the dog button here
  feedFood=createButton("Feed Food");
  feedFood.position(950,95);
  feedFood.mousePressed(feedFoods);

  addFood=createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);

}

function draw() {
  background(46,139,87);
  foodObj.display();

  //write code to read fedtime value from the database 
  fedTime=database.ref('FeedTime');
  fedTime.on("value",readFeedTime);
  
  
 
  //write code to display text lastFed time here
  textSize(25);
  fill("white");
  

  if(lastFed>=12)
  {
     text("FedTime: "+ lastFed%12 +" PM",300,30)

  }else if(lastFed==0){
    text("Last Feed : 12AM",350,30);
  }else{
    text('fedTime:' +lastFed +" AM", 10, 30);
  }
 
  drawSprites();
}

//function to read food Stock
function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
}

function readFeedTime(data){
  lastFed=data.val();
  
}


function feedFoods(){
  dog.addImage(happyDog);
  deductFood();
  console.log("FEED FOOD");
  
  

  //write code here to update food stock and last fed time

}

//function to add food in stock
function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}

function deductFood()
{
  foodS--;
  database.ref("/").update({
    Food:foodS,
    FeedTime:hour()
    
  })
}


