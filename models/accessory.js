var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var AccessorySchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  gameconsole: {
    type: Schema.Types.ObjectId,
    ref: "GameConsole",
    required: true,
  },
  price: { type: Number, required: true },
  num_in_stock: { type: Number, required: true },
  img_url: { type: String, required: true },
  date: { type: Date, default: Date.now },
});

// Virtual for accessory's URL
AccessorySchema.virtual("url").get(function () {
  return "/shop/accessory/" + this._id;
});

//Export model
module.exports = mongoose.model("Accessory", AccessorySchema);
