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

app.get("/", function(req, res){
  res.render("index");
});

app.get("/:ingredient", function(req, res){
  const ing = req.params.ingredient;
  res.render("ingredient", {ingredient: ingredient})
})

app.listen(8080, function(){
  console.log("Server is running on port 8080");
})