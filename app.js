const express = require("express"),
      app = express(),
      bodyParser = require("body-parser"),
      mongoose = require("mongoose"),
      Ingredient = require("./models/ingredient.js");

mongoose.connect("mongodb://localhost/ingredients",{
  useNewUrlParser: true,
  useUnifiedTopology: true
})

// Ingredient.create({
//   item: "Parsley",
//   image: "none",
//   description: "Leafy, green. Kinda tastes like dirt."
// })


.then(() => console.log("Connected to DB!"))
.catch(error => console.log(error.message));

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));
app.set("view engine", "ejs");

app.get("/", function(req, res){
  res.render("index");
});

app.listen(8080, function(){
  console.log("Server is running on port 8080");
})