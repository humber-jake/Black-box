require('dotenv').config();
const express = require("express"),
      app = express(),
      bodyParser = require("body-parser"),
      mongoose = require("mongoose"),
      Ingredient = require("./models/ingredient.js"),
      Message = require("./models/message.js"),
      seedDB = require("./seed.js"),
      methodOverride = require("method-override"),
      expressSanitizer = require("express-sanitizer");


// Seeds the database with ingredients and messages.
      // seedDB();

mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PW}@cluster0.yhzi9.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`,{
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("Connected to DB!"))
.catch(error => console.log(error.message));

mongoose.set("useFindAndModify", false);
app.use(methodOverride("_method"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
app.use(expressSanitizer());
app.set("view engine", "ejs");

// ROOT ROUTE
app.get("/", function(req, res){
  res.redirect("/ingredients");
})


// INDEX ROUTE
app.get("/ingredients", function(req, res){
  Ingredient.aggregate([{ $sample: { size: 3}}], function(err, randomIngredients){
    if(err){
      console.log(err);
    } else {
      Message.aggregate([{ $sample: { size: 1}}], function (err, randomMessage){
        if(err){
          console.log(err);
        } else {
          res.render("index", {ingredients: randomIngredients, message: randomMessage});
        }
      });
    }
  });
});

// NEW ROUTE
app.get("/ingredients/new", function(req, res){
  res.render("new");
});

// CREATE ROUTE
app.post("/ingredients", function(req, res){
  req.body.description = req.sanitize(req.body.description);
  req.body.item = req.sanitize(req.body.item);
  let newIngredient = {item: req.body.item, description: req.body.description};
  Ingredient.create(newIngredient, function(err, result){
    if(err){
      console.log("Couldn't create ingredient.");
    } else {
      res.redirect("/");
    }
  });
});

// LIST
app.get("/ingredients/list", function(req, res){
  Ingredient.find({}, function(err, ingredients){
    if(err){
      console.log(err);
    } else {
      res.render("list", {ingredients: ingredients});
    }
  }).sort({item: 1});
});

// SHOW ROUTE
app.get("/ingredients/:id", function(req, res){
  Ingredient.findById(req.params.id, function(err, ingredient){
    if(err){
      console.log(err);
    } else {
      res.render("show", {ingredient: ingredient});
    }
  });
});

// EDIT
app.get("/ingredients/:id/edit", function(req, res){
  Ingredient.findById(req.params.id, function(err, ingredient){
    if(err){
      console.log(err);
    } else {
      res.render("edit", {ingredient: ingredient});
    }
  });
});

// UPDATE
app.put("/ingredients/:id", function(req, res){
  req.body.description = req.sanitize(req.body.description);
  Ingredient.findByIdAndUpdate(req.params.id, req.body, function(err, updatedIngredient){
    if(err){
      console.log(err);
    } else {
    res.redirect("/ingredients/" + req.params.id);
    }
  })
})

// DELETE
app.delete("/ingredients/:id", function(req, res){
  Ingredient.findByIdAndRemove(req.params.id, function(err){
    if(err){
      console.log(err);
    } else {
      res.redirect("/ingredients/list");
    }
  });
});

app.listen(process.env.PORT || 3000, function(){
  console.log("Server has started");
});