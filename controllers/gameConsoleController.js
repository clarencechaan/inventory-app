var GameConsole = require("../models/gameconsole");
var Game = require("../models/game");
var Accessory = require("../models/accessory");
var async = require("async");

// Display list of all GameConsoles.
exports.gameconsole_list = function (req, res) {
  GameConsole.find({})
    .sort({ name: 1 })
    .exec(function (err, gameconsole_list) {
      if (err) {
        return next(err);
      }
      //Successful, so render
      res.render("item_list", {
        title: "Consoles",
        item_list: gameconsole_list,
        category: "gameconsoles",
      });
    });
};

// Display detail page for a specific GameConsole.
exports.gameconsole_detail = function (req, res) {
  async.parallel(
    {
      gameconsole: function (cb) {
        GameConsole.findById(req.params.id).exec(cb);
      },
      games_list: function (cb) {
        Game.find({ gameconsole: req.params.id }).limit(5).exec(cb);
      },
      accessories_list: function (cb) {
        Accessory.find({ gameconsole: req.params.id }).limit(5).exec(cb);
      },
    },
    function (err, results) {
      res.render("item_detail", {
        title: results.gameconsole.name,
        item: results.gameconsole,
        games_list: results.games_list,
        accessories_list: results.accessories_list,
        category: "gameconsole",
        error: err,
      });
    }
  );
};

// Display GameConsole create form on GET.
exports.gameconsole_create_get = function (req, res) {
  res.render("item_form", {
    title: "Create Console",
    category: "gameconsole",
  });
};

// Handle GameConsole create on POST.
exports.gameconsole_create_post = function (req, res) {
  res.send("NOT IMPLEMENTED: GameConsole create POST");
};

// Display GameConsole delete form on GET.
exports.gameconsole_delete_get = function (req, res) {
  async.parallel(
    {
      gameconsole: function (cb) {
        GameConsole.findById(req.params.id).exec(cb);
      },
      games_list: function (cb) {
        Game.find({ gameconsole: req.params.id }).limit(5).exec(cb);
      },
      accessories_list: function (cb) {
        Accessory.find({ gameconsole: req.params.id }).limit(5).exec(cb);
      },
    },
    function (err, results) {
      res.render("item_delete", {
        title: results.gameconsole.name,
        item: results.gameconsole,
        games_list: results.games_list,
        accessories_list: results.accessories_list,
        category: "gameconsole",
        error: err,
      });
    }
  );
};

// Handle GameConsole delete on POST.
exports.gameconsole_delete_post = function (req, res) {
  async.parallel(
    {
      gameconsole: function (cb) {
        GameConsole.findById(req.params.id).exec(cb);
      },
      games_list: function (cb) {
        Game.find({ gameconsole: req.params.id }).limit(5).exec(cb);
      },
      accessories_list: function (cb) {
        Accessory.find({ gameconsole: req.params.id }).limit(5).exec(cb);
      },
    },
    function (err, results) {
      if (err) {
        return next(err);
      }
      // Success
      if (results.games_list.length > 0 || results.accessories_list.length) {
        // GameConsole has games or accessories. Render in same way as for GET route.
        res.render("item_delete", {
          title: results.gameconsole.name,
          item: results.gameconsole,
          games_list: results.games_list,
          accessories_list: results.accessories_list,
          category: "gameconsole",
          error: err,
        });
        return;
      } else {
        // GameConsole has no games or accessories. Delete object and redirect to the list of game consoles.
        GameConsole.findByIdAndRemove(
          req.body.id,
          function deleteGameConsole(err) {
            if (err) {
              return next(err);
            }
            // Success - go to game console list
            res.redirect("/shop/gameconsoles");
          }
        );
      }
    }
  );
};

// Display GameConsole update form on GET.
exports.gameconsole_update_get = function (req, res) {
  res.send("NOT IMPLEMENTED: GameConsole update GET");
};

// Handle GameConsole update on POST.
exports.gameconsole_update_post = function (req, res) {
  res.send("NOT IMPLEMENTED: GameConsole update POST");
};
