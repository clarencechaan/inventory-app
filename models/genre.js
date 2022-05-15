var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var GenreSchema = new Schema({
  name: { type: String, minLength: 3, maxLength: 100, required: true },
});

// Virtual for genre's URL
GenreSchema.virtual("url").get(function () {
  return "/shop/genre/" + this._id;
});

module.exports = mongoose.model("Genre", GenreSchema);
