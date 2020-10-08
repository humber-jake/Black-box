const mongoose = require("mongoose"),
Ingredient = require("./models/ingredient.js"),
Message = require("./models/message.js");

var ingredients = [
  {item: "Onions", 
   description: "Earthy. Root vegetable. Necessary component to each dish."},
  {item: "Zucchini", 
   description: "Long, green, squashy. Best when fried. Sometimes used to make bread?"},
  {item: "Rutabaga", 
   description: "Quite frankly, I'm not even sure what a Rutabaga is. Perhaps some sort of Pokemon."},
  {item: "Cucumber", 
   description: "Long, green, not squashy. Crunchy and refreshing. Best served with everything."},
  {item: "Chicken", 
   description: "Demonic flightless fowl with no respect for modern sensibilities. Have been known to plan mass escapes. May or may not be claymation."},
  {item: "Beef", 
   description: "The meaty bits of the common bovine descendant of the long extinct wild Aurochs. Good for a number of applications. Bad for the environment."},
  {item: "Paprika", 
   description: "Ground dried chili peppers. Or bell peppers. Is it spicy? Who knows."},
  {item: "Pepper", 
   description: "Commonly found on tables beside salt. Best when freshly ground. Note that does not share any characteristics with corn, or peppers of the capsicum variety. Weird."},
  {item: "Turmeric", 
   description: "A flavourless yellow spice best used for making things yellow. May or may not significantly enhance your affinity for Buddhism when consumed in large amounts."},
  {item: "Parsley", 
   description: "Green, leafy. Kinda tastes like dirt. Really good, fresh dirt."},
  {item: "Oregano", 
   description: "Strain of wild herbs native to Oregon. Used extensively by Italian cuisine solely out of ingrained cultural jealousy for the climate of the Pacific North West."},
  {item: "Goat", 
   description: "Joseph Marquez. Or Tim Henson. Depends on your personal politics, I guess."},
  {item: "Mussels?", 
   description: "Soft tissue found in most animals. Functions to produce force and motion. Goes well with white wine."},
  {item: "Angst", 
   description: "FUCK YOU I WON'T DO WHAT YOU TELL ME"},
  {item: "Celery", 
   description: "Aromatic vegetable with long fibrous stalks. Commonly used to show how osmosis works in elementary schools."},
  {item: "Tilapia", 
   description: 'Lead female and recurring love interest of the hit 90s sit-com "Boy Meets World".'},
  {item: "Sole", 
   description: "Necessary structural component of most shoes. May or may not be made from tanned bovine skin."},
  {item: "Haddock", 
   description: 'Past participle of "havoc", often wreaked. Also frozen. Cheaper than cod. '},
  {item: "Cod", 
   description: "A popular franchise of first person shooter games, renowned for its homophobes and twelve-year-olds."},
  {item: "Salmon", 
   description: "A lovely shade of orange, or maybe pink. Exclusively worn by men who are comfortable with their sexuality."},
  {item: "Tuna", 
   description: "An electronic device used to adjust the frequencies on Arnold Schwartzenegger's collection of stringed instruments."},
  {item: "Turkey", 
   description: "Officially the Republic of Turkey; a transcontinental country located mainly on the Anatolian peninsula in Western Asia."},
  {item: "Quail", 
   description: 'Onomatopeia for a question asked in a state of hysteria. Example: "HAVE YOU NO COMMON DECENCY?!?!?" Quailed Geofrey\'s wife, upon seeing that he had urinated all over the Christmas presents in a drunken state, once again.'},
  {item: "Goose", 
   description: "Easily the most respectable choose of pilot in the popular Nintendo 64 title Pilot Wings. Definitely not a reference to anything else."},
  {item: "Duck", 
   description: "Delicious waterfowl embraced by French and Asian cuisine alike. Not a type of tape."},
  {item: "Lamb", 
   description: "Adorable little creatures. Can be turned into savory lollipops. Also Jesus, sometimes."},
  {item: "Veal", 
   description: "Flesh of adolescent bovines, prematurely harvested for its supple texture. A meat of questionable ethics, and undeniable flavour."},
  {item: "Pork", 
   description: "The primeval form of Bacon. Not half bad. Very versatile."},
  {item: "Bacon", 
   description: "The Ultimate form of pork. Beloved by all."},
  {item: "BBQ Sauce", 
   description: "Sweet, brown, tangy. Used to mask the shortcomings of questionable home cooks all over North America."},
  {item: "Ketchup", 
   description: "Universal red condiment. Do not, under any circumstances, follow the recommendations on the label. "},
  {item: "Mustard", 
   description: "A seed. Also a yellow condiment made from said seed. Alternatively, a Colonel involved in a murder conspiracy."},
  {item: "Relish", 
   description: "Commonly sweet green condiment. So named for its ability to be enjoyed greatly."},
  {item: "Mayonnaise", 
   description: "Controversial white condiment. Great on everyting. Disgusting by itself."},
  {item: "Balsamic Vinegar", 
   description: "Probably not real balsamic vinegar. That stuff is like, ridiculously expensive."},
  {item: "Vinegar", 
   description: "Staple condiment. Used to add acidity without flavour. Also an environmentally friendly cleaning product."},
  {item: "Worcestershire Sauce", 
   description: "Fermented anchovy condiment of questionable pronunciation. Makes everything objectively better."},
  {item: "Root Beer", 
   description: "Nationally hated beverage of Japan. Actually made from roots. Not actually beer."},
  {item: "Screams", 
   description: "Because sometimes your cooking just needs a little extra encouragement."},
  {item: "BEES?", 
   description: "NO, NOT THE BEEEESSSS"}
];
var messages = [
  {text: "Yikes."},
  {text: "That doesn't sounds good."},
  {text: "Delicious!"},
  {text: "What are you thinking?"},
  {text: "Nah dude, that ain't it."},
  {text: "Are you serious?"},
  {text: "No way in hell."},
  {text: "I'm not eating that."},
  {text: "Looks like you've got your work cut out for you."},
  {text: "I don't get paid enough for this."},
  {text: "Dude, just no."},
  {text: "Looks like we starve."},
  {text: "I'm gonna need a drink."},
  {text: "...How even?"},
  {text: "A journey of a thousand miles starts with a single bad idea."},
  {text: "Don't hold it against me."},
  {text: "Kill me."},
  {text: "Anybody wanna order pizza?"},
  {text: "I would rather die."},
  {text: "Let's rethink things a bit."},
  {text: "Are you sure?"},
  {text: "I'm not so sure."},
  {text: "Hold on, is that even food?"}
];

function seedDB(){
  Ingredient.remove({}, function(err){
    if(err){
      console.log(err);
    } else {
      console.log("Removed Ingredients!")
    }
  });   
  Message.remove({}, function(err){
    if(err){
      console.log(err);
    } else {
      console.log("Removed messages!")
    }
  });    
  ingredients.forEach(function(seed){
    Ingredient.create(seed, function(err, ingredient){
      if(err){
        console.log(err)
      }
    });
  }) 
  messages.forEach(function(text){
    Message.create(text, function(err, message){
      if(err){
        console.log(err)
      }
    });
  })  
}

module.exports = seedDB;