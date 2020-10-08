const mongoose = require("mongoose");

const ingredientSchema = new mongoose.Schema({
  item: String,
  description: String
});

module.exports = mongoose.model("Ingredient", ingredientSchema);