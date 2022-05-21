var GameConsole = require("../models/gameconsole");
var Game = require("../models/game");
var Accessory = require("../models/accessory");
var async = require("async");
const { body, validationResult } = require("express-validator");

// Display list of all GameConsoles.
exports.gameconsole_list = function (req, res) {
  GameConsole.find({})
    .collation({ locale: "en" })
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
exports.gameconsole_create_post = [
  // Validate and sanitize fields.
  body("name", "Name must not be empty.")
    .trim()
    .isLength({ min: 1, max: 72 })
    .escape(),
  body("manufacturer", "Manufacturer must not be empty.")
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

    // Create a GameConsole object with escaped and trimmed data.
    var gameconsole = new GameConsole({
      name: req.body.name,
      manufacturer: req.body.manufacturer,
      price: req.body.price,
      description: req.body.description,
      num_in_stock: req.body.num_in_stock,
      img_url: req.body.img_url,
    });

    if (!errors.isEmpty()) {
      // There are errors. Render form again with sanitized values/error messages.

      res.render("item_form", {
        title: "Create Console",
        item: gameconsole,
        category: "gameconsole",
        errors: errors.array(),
      });
      return;
    } else {
      // Data from form is valid. Save gameconsole.
      gameconsole.save(function (err) {
        if (err) {
          return next(err);
        }
        //successful - redirect to new gameconsole record.
        res.redirect(gameconsole.url);
      });
    }
  },
];

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
exports.gameconsole_update_get = function (req, res, next) {
  // Get gameconsole for form.
  GameConsole.findById(req.params.id).exec(function (err, gameconsole) {
    if (err) {
      return next(err);
    }
    if (gameconsole == null) {
      // No results.
      var err = new Error("Console not found");
      err.status = 404;
      return next(err);
    }
    // Success.

    res.render("item_form", {
      title: "Update Console",
      item: gameconsole,
      category: "gameconsole",
    });
  });
};

// Handle GameConsole update on POST.
exports.gameconsole_update_post = [
  // Validate and sanitize fields.
  body("name", "Name must not be empty.")
    .trim()
    .isLength({ min: 1, max: 72 })
    .escape(),
  body("manufacturer", "Manufacturer must not be empty.")
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

    // Create a GameConsole object with escaped and trimmed data.
    var gameconsole = new GameConsole({
      name: req.body.name,
      manufacturer: req.body.manufacturer,
      price: req.body.price,
      description: req.body.description,
      num_in_stock: req.body.num_in_stock,
      img_url: req.body.img_url,
      _id: req.params.id, //This is required, or a new ID will be assigned!
    });

    if (!errors.isEmpty()) {
      // There are errors. Render form again with sanitized values/error messages.

      res.render("item_form", {
        title: "Update Console",
        item: gameconsole,
        category: "gameconsole",
        errors: errors.array(),
      });
      return;
    } else {
      // Data from form is valid. Update the record.
      GameConsole.findByIdAndUpdate(
        req.params.id,
        gameconsole,
        {},
        function (err, thegameconsole) {
          if (err) {
            return next(err);
          }
          // Successful - redirect to gameconsole detail page.
          res.redirect(thegameconsole.url);
        }
      );
    }
  },
];
