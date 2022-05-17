var Game = require("../models/game");
var Accessory = require("../models/accessory");
var GameConsole = require("../models/gameconsole");
var async = require("async");

exports.index = function (req, res) {
  async.parallel(
    {
      game_count: function (callback) {
        Game.countDocuments({}, callback); // Pass an empty object as match condition to find all documents of this collection
      },
      accessory_count: function (callback) {
        Accessory.countDocuments({}, callback);
      },
      gameconsole_count: function (callback) {
        GameConsole.countDocuments({ status: "Available" }, callback);
      },
    },
    function (err, results) {
      res.render("index", {
        title: "Home",
        error: err,
        data: results,
      });
    }
  );
};

// Display list of all Games.
exports.game_list = function (req, res, next) {
  Game.find({})
    .sort({ title: 1 })
    .populate("gameconsole")
    .exec(function (err, list_games) {
      if (err) {
        return next(err);
      }
      //Successful, so render
      res.render("item_list", { title: "Games", item_list: list_games });
    });
};

// Display detail page for a specific Game.
exports.game_detail = function (req, res) {
  res.send("NOT IMPLEMENTED: Game detail: " + req.params.id);
};

// Display Game create form on GET.
exports.game_create_get = function (req, res) {
  res.send("NOT IMPLEMENTED: Game create GET");
};

// Handle Game create on POST.
exports.game_create_post = function (req, res) {
  res.send("NOT IMPLEMENTED: Game create POST");
};

// Display Game delete form on GET.
exports.game_delete_get = function (req, res) {
  res.send("NOT IMPLEMENTED: Game delete GET");
};

// Handle Game delete on POST.
exports.game_delete_post = function (req, res) {
  res.send("NOT IMPLEMENTED: Game delete POST");
};

// Display Game update form on GET.
exports.game_update_get = function (req, res) {
  res.send("NOT IMPLEMENTED: Game update GET");
};

// Handle Game update on POST.
exports.game_update_post = function (req, res) {
  res.send("NOT IMPLEMENTED: Game update POST");
};
