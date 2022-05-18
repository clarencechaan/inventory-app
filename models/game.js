var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var GameSchema = new Schema({
  name: { type: String, required: true },
  gameconsole: {
    type: Schema.Types.ObjectId,
    ref: "GameConsole",
    required: true,
  },
  description: { type: String, required: true },
  genre: { type: Schema.Types.ObjectId, ref: "Genre" },
  price: { type: Number, required: true },
  num_in_stock: { type: Number, required: true },
  img_url: { type: String, required: true },
  date: { type: Date, default: Date.now },
});

// Virtual for game's URL
GameSchema.virtual("url").get(function () {
  return "/shop/game/" + this._id;
});

//Export model
module.exports = mongoose.model("Game", GameSchema);
