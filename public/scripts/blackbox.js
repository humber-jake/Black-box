var ingredients = [
  "Onions",
  "Zucchini",
  "Rutabaga",
  "Cucumber",
  "Chicken",
  "Beef",
  "Paprika",
  "Pepper",
  "Turmeric",
  "Parsley",
  "Oregano",
  "Goat",
  "Mussels?",
  "Angst",
  "Celery",
  "Tilapia",
  "Sole",
  "Haddock",
  "Cod",
  "Salmon",
  "Tuna",
  "Turkey",
  "Quail",
  "Goose",
  "Duck",
  "Lamb",
  "Veal",
  "Pork",
  "Bacon",
  "BBQ Sauce",
  "Ketchup",
  "Mustard",
  "Relish",
  "Mayonnaise",
  "Balsamic Vinegar",
  "Vinegar",
  "Worcestershire Sauce",
  "Root Beer",
  "Screams",
  "BEES?"
];
var messages = [
  "Yikes.",
  "That doesn't sounds good.",
  "Delicious!",
  "What are you thinking?",
  "Nah dude, that ain't it.",
  "Are you serious?",
  "No way in hell.",
  "I'm not eating that.",
  "Looks like you've got your work cut out for you.",
  "I don't get paid enough for this.",
  "Dude, just no.",
  "Looks like we starve.",
  "I'm gonna need a drink.",
  "...How even?",
  "A journey of a thousand miles starts with a single bad idea.",
  "Don't hold it against me.",
  "Kill me.",
  "Anybody wanna order pizza?",
  "I would rather die.",
  "Let's rethink things a bit.",
  "Are you sure?",
  "I'm not so sure.",
  "Hold on, is that even food?"
];
var messageDisplay = document.getElementById("message");
var ing1 = document.getElementById("ing1");
var ing2 = document.getElementById("ing2");
var ing3 = document.getElementById("ing3");
var button = document.querySelector("button");

doTheThing();
button.addEventListener("click", doTheThing);

function randIng() {
  return(ingredients[Math.floor(Math.random() * ingredients.length)])
  }

function randomMessage() {
  return (messages[Math.floor(Math.random() * messages.length)])
}

function doTheThing(){
ing1.textContent = randIng();
ing2.textContent = randIng();
while(ing2.textContent == ing1.textContent){
  ing2.textContent = randIng();
}
ing3.textContent = randIng();
while(ing3.textContent == ing1.textContent || ing3.textContent == ing2.textContent){
  ing3.textContent = randIng();
}
messageDisplay.textContent = randomMessage();
}
