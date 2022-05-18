var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var ConsoleSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  num_in_stock: { type: Number, required: true },
  img_url: { type: String, required: true },
  manufacturer: { type: String, required: true },
  date: { type: Date, default: Date.now },
});

// Virtual for console's URL
ConsoleSchema.virtual("url").get(function () {
  return "/shop/gameconsole/" + this._id;
});

//Export model
module.exports = mongoose.model("GameConsole", ConsoleSchema);
