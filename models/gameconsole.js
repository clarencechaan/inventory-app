var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var GameConsoleSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  num_in_stock: { type: Number, required: true },
  img_url: { type: String, required: true },
  manufacturer: { type: String, required: true },
  date: { type: Date, default: Date.now },
});

// Virtual for game console's URL
GameConsoleSchema.virtual("url").get(function () {
  return "/shop/gameconsole/" + this._id;
});

// Virtual for game console's category
GameConsoleSchema.virtual("category").get(function () {
  return "gameconsoles";
});

//Export model
module.exports = mongoose.model("GameConsole", GameConsoleSchema);
