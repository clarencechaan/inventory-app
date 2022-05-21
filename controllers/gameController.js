var Game = require("../models/game");
var Accessory = require("../models/accessory");
var GameConsole = require("../models/gameconsole");
var Genre = require("../models/genre");
var async = require("async");
const { body, validationResult } = require("express-validator");

exports.index = function (req, res) {
  async.parallel(
    {
      new_games: function (cb) {
        Game.find({})
          .limit(3)
          .populate("gameconsole")
          .sort({ date: -1 })
          .exec(cb);
      },
      new_accessories: function (cb) {
        Accessory.find({})
          .limit(3)
          .populate("gameconsole")
          .sort({ date: -1 })
          .exec(cb);
      },
      new_gameconsoles: function (cb) {
        GameConsole.find({}).limit(3).sort({ date: -1 }).exec(cb);
      },
      bs_games: function (cb) {
        Game.find({}).limit(2).sort({ name: -1 }).exec(cb);
      },
      bs_accessories: function (cb) {
        Accessory.find({}).limit(2).sort({ name: -1 }).exec(cb);
      },
      bs_gameconsoles: function (cb) {
        GameConsole.find({}).limit(1).sort({ name: -1 }).exec(cb);
      },
      deal_item: function (cb) {
        GameConsole.findById("62854d8a15a3ecf1d9b5523c", cb);
      },
    },
    function (err, results) {
      const new_all = [
        ...results.new_games,
        ...results.new_accessories,
        ...results.new_gameconsoles,
      ];
      new_all.sort((a, b) => (a.date > b.date ? -1 : 1));
      const best_sellers = [
        ...results.bs_games,
        ...results.bs_accessories,
        ...results.bs_gameconsoles,
      ];
      res.render("index", {
        title: "Home",
        error: err,
        new_games: results.new_games,
        new_accessories: results.new_accessories,
        new_gameconsoles: results.new_gameconsoles,
        new_all: new_all,
        best_sellers: best_sellers,
        deal_item: results.deal_item,
      });
    }
  );
};

// Display list of all Games.
exports.game_list = function (req, res, next) {
  async.parallel(
    {
      game_list: function (cb) {
        Game.find({})
          .collation({ locale: "en" })
          .sort({ name: 1 })
          .populate("gameconsole")
          .exec(cb);
      },
      gameconsole_list: function (cb) {
        GameConsole.find({})
          .collation({ locale: "en" })
          .sort({ name: 1 })
          .exec(cb);
      },
    },
    function (err, results) {
      res.render("item_list", {
        title: "Games",
        item_list: results.game_list,
        gameconsole_list: results.gameconsole_list,
        category: "games",
        error: err,
      });
    }
  );
};

// Display detail page for a specific Game.
exports.game_detail = function (req, res) {
  Game.findById(req.params.id)
    .populate("gameconsole")
    .populate("genre")
    .exec(function (err, game) {
      if (err) {
        return next(err);
      }
      //Successful, so render
      res.render("item_detail", {
        title: game.name,
        item: game,
        category: "game",
      });
    });
};

// Display Game create form on GET.
exports.game_create_get = function (req, res) {
  // Get all gameconsoles and genres, which we can use for adding to our game.
  async.parallel(
    {
      gameconsoles: function (callback) {
        GameConsole.find(callback)
          .collation({ locale: "en" })
          .sort({ name: 1 });
      },
      genres: function (callback) {
        Genre.find(callback).collation({ locale: "en" }).sort({ name: 1 });
      },
    },
    function (err, results) {
      if (err) {
        return next(err);
      }
      res.render("item_form", {
        title: "Create Game",
        gameconsoles: results.gameconsoles,
        genres: results.genres,
        category: "game",
      });
    }
  );
};

// Handle Game create on POST.
exports.game_create_post = [
  // Validate and sanitize fields.
  body("title", "Title must not be empty.")
    .trim()
    .isLength({ min: 1, max: 72 })
    .escape(),
  body("gameconsole", "Console must not be empty.")
    .trim()
    .isLength({ min: 1, max: 72 })
    .escape(),
  body("price", "Price must be a number between 1 and 10000.").isNumeric({
    min: 1,
    max: 10000,
  }),
  body("description", "Description must not be empty.")
    .trim()
    .isLength({ min: 1, max: 1500 })
    .escape(),
  body("genre", "Genre must not be empty.")
    .trim()
    .isLength({ min: 1, max: 100 })
    .escape(),
  body(
    "num_in_stock",
    "Number in stock must be a number between 0 and 10000."
  ).isNumeric({
    min: 0,
    max: 10000,
  }),
  body("img_url", "Image URL must not be empty.").isURL(),

  // Process request after validation and sanitization.
  (req, res, next) => {
    // Extract the validation errors from a request.
    const errors = validationResult(req);

    // Create a Game object with escaped and trimmed data.
    var game = new Game({
      name: req.body.title,
      gameconsole: req.body.gameconsole,
      price: req.body.price,
      description: req.body.description,
      genre: req.body.genre,
      num_in_stock: req.body.num_in_stock,
      img_url: req.body.img_url,
    });

    if (!errors.isEmpty()) {
      // There are errors. Render form again with sanitized values/error messages.

      // Get all gameconsoles and genres for form.
      async.parallel(
        {
          gameconsoles: function (callback) {
            GameConsole.find(callback);
          },
          genres: function (callback) {
            Genre.find(callback);
          },
        },
        function (err, results) {
          if (err) {
            return next(err);
          }

          res.render("item_form", {
            title: "Create Game",
            gameconsoles: results.gameconsoles,
            genre: results.genre,
            item: game,
            category: "game",
            errors: errors.array(),
          });
        }
      );
      return;
    } else {
      // Data from form is valid. Save game.
      game.save(function (err) {
        if (err) {
          return next(err);
        }
        //successful - redirect to new game record.
        res.redirect(game.url);
      });
    }
  },
];

// Display Game delete form on GET.
exports.game_delete_get = function (req, res) {
  Game.findById(req.params.id)
    .populate("gameconsole")
    .populate("genre")
    .exec(function (err, game) {
      if (err) {
        return next(err);
      }
      //Successful, so render
      res.render("item_delete", {
        title: game.name,
        item: game,
        category: "game",
      });
    });
};

// Handle Game delete on POST.
exports.game_delete_post = function (req, res) {
  Game.findByIdAndRemove(req.body.id, function deleteGame(err) {
    if (err) {
      return next(err);
    }
    // Success - go to game list
    res.redirect("/shop/games");
  });
};

// Display Game update form on GET.
exports.game_update_get = function (req, res, next) {
  // Get game, gameconsoles, and genres for form.
  async.parallel(
    {
      game: function (callback) {
        Game.findById(req.params.id)
          .populate("gameconsole")
          .populate("genre")
          .exec(callback);
      },
      gameconsoles: function (callback) {
        GameConsole.find({})
          .collation({ locale: "en" })
          .sort({ name: 1 })
          .exec(callback);
      },
      genres: function (callback) {
        Genre.find({})
          .collation({ locale: "en" })
          .sort({ name: 1 })
          .exec(callback);
      },
    },
    function (err, results) {
      if (err) {
        return next(err);
      }
      if (results.game == null) {
        // No results.
        var err = new Error("Game not found");
        err.status = 404;
        return next(err);
      }
      // Success.

      res.render("item_form", {
        title: "Update Game",
        gameconsoles: results.gameconsoles,
        genres: results.genres,
        item: results.game,
        category: "game",
      });
    }
  );
};

// Handle Game update on POST.
exports.game_update_post = function (req, res) {
  res.send("NOT IMPLEMENTED: Game update POST");
};
