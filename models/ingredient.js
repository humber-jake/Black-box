const mongoose = require("mongoose");

const ingredientSchema = new mongoose.Schema({
  item: String,
  image: String,
  description: String
});

const Ingredient = mongoose.model("Ingredient", ingredientSchema);

module.exports = Ingredient;