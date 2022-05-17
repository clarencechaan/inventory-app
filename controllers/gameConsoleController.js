var GameConsole = require("../models/gameconsole");

// Display list of all GameConsoles.
exports.gameconsole_list = function (req, res) {
  GameConsole.find({})
    .sort({ name: 1 })
    .exec(function (err, gameconsole_list) {
      if (err) {
        return next(err);
      }
      //Successful, so render
      res.render("gameconsole_list", {
        title: "Consoles",
        gameconsole_list: gameconsole_list,
      });
    });
};

// Display detail page for a specific GameConsole.
exports.gameconsole_detail = function (req, res) {
  res.send("NOT IMPLEMENTED: GameConsole detail: " + req.params.id);
};

// Display GameConsole create form on GET.
exports.gameconsole_create_get = function (req, res) {
  res.send("NOT IMPLEMENTED: GameConsole create GET");
};

// Handle GameConsole create on POST.
exports.gameconsole_create_post = function (req, res) {
  res.send("NOT IMPLEMENTED: GameConsole create POST");
};

// Display GameConsole delete form on GET.
exports.gameconsole_delete_get = function (req, res) {
  res.send("NOT IMPLEMENTED: GameConsole delete GET");
};

// Handle GameConsole delete on POST.
exports.gameconsole_delete_post = function (req, res) {
  res.send("NOT IMPLEMENTED: GameConsole delete POST");
};

// Display GameConsole update form on GET.
exports.gameconsole_update_get = function (req, res) {
  res.send("NOT IMPLEMENTED: GameConsole update GET");
};

// Handle GameConsole update on POST.
exports.gameconsole_update_post = function (req, res) {
  res.send("NOT IMPLEMENTED: GameConsole update POST");
};
