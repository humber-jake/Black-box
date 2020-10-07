const express = require("express"),
      app = express(),
      bodyParser = require("body-parser"),
      mongoose = require("mongoose"),
      Ingredient = require("./models/ingredient.js"),
      Message = require("./models/message.js"),
      seedDB = require("./seed.js");


// Seeds the database with ingredients and messages.
      // seedDB();

mongoose.connect("mongodb://localhost/blackbox",{
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("Connected to DB!"))
.catch(error => console.log(error.message));


app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));
app.set("view engine", "ejs");

// INDEX ROUTE
app.get("/", function(req, res){
  Ingredient.find({}, function(err, AllIngredients){
    res.render("index", {ingredients: AllIngredients});
  })
});

// NEW ROUTE
app.get("/new", function(req, res){
  res.send("This is the new route");
})

// CREATE ROUTE
app.post("/", function(){
  res.send("You hit the post route for ingredients");
})

// SHOW ROUTE
app.get("/:id", function(req, res){
  Ingredient.findById(req.params.id, function(err, ingredient){
    if(err){
      console.log(err);
    } else {
      res.render("show", {ingredient: ingredient});
    }
  });
});

app.listen(8080, function(){
  console.log("Server is running on port 8080");
});