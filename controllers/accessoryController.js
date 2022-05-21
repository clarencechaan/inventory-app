var Accessory = require("../models/accessory");
var GameConsole = require("../models/gameconsole");
var async = require("async");
const { body, validationResult } = require("express-validator");

// Display list of all Accessories.
exports.accessory_list = function (req, res) {
  res.send("NOT IMPLEMENTED: Accessory list");
};

// Display list of all Games.
exports.accessory_list = function (req, res, next) {
  async.parallel(
    {
      accessory_list: function (cb) {
        Accessory.find({})
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
        title: "Accessories",
        item_list: results.accessory_list,
        gameconsole_list: results.gameconsole_list,
        category: "accessories",
        error: err,
      });
    }
  );
};

// Display detail page for a specific Accessory.
exports.accessory_detail = function (req, res) {
  Accessory.findById(req.params.id)
    .populate("gameconsole")
    .exec(function (err, accessory) {
      if (err) {
        return next(err);
      }
      //Successful, so render
      res.render("item_detail", {
        title: accessory.name,
        item: accessory,
        category: "accessory",
      });
    });
};

// Display Accessory create form on GET.
exports.accessory_create_get = function (req, res) {
  // Get all gameconsoles, which we can use for adding to our accessory.
  GameConsole.find({}, (err, gameconsoles) => {
    if (err) {
      return next(err);
    }
    res.render("item_form", {
      title: "Create Accessory",
      gameconsoles: gameconsoles,
      category: "accessory",
    });
  });
};

// Handle Accessory create on POST.
exports.accessory_create_post = [
  // Validate and sanitize fields.
  body("name", "Name must not be empty.")
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

    // Create a Accessory object with escaped and trimmed data.
    var accessory = new Accessory({
      name: req.body.name,
      gameconsole: req.body.gameconsole,
      price: req.body.price,
      description: req.body.description,
      num_in_stock: req.body.num_in_stock,
      img_url: req.body.img_url,
    });

    if (!errors.isEmpty()) {
      // There are errors. Render form again with sanitized values/error messages.

      // Get all gameconsoles for form.
      GameConsole.find({}, function (err, gameconsoles) {
        if (err) {
          return next(err);
        }

        res.render("item_form", {
          title: "Create Accessory",
          gameconsoles: gameconsoles,
          item: accessory,
          category: "accessory",
          errors: errors.array(),
        });
      });
      return;
    } else {
      // Data from form is valid. Save accessory.
      accessory.save(function (err) {
        if (err) {
          return next(err);
        }
        //successful - redirect to new accessory record.
        res.redirect(accessory.url);
      });
    }
  },
];

// Display Accessory delete form on GET.
exports.accessory_delete_get = function (req, res) {
  Accessory.findById(req.params.id)
    .populate("gameconsole")
    .exec(function (err, accessory) {
      if (err) {
        return next(err);
      }
      //Successful, so render
      res.render("item_delete", {
        title: accessory.name,
        item: accessory,
        category: "accessory",
      });
    });
};

// Handle Accessory delete on POST.
exports.accessory_delete_post = function (req, res) {
  Accessory.findByIdAndRemove(req.body.id, function deleteAccessory(err) {
    if (err) {
      return next(err);
    }
    // Success - go to accessory list
    res.redirect("/shop/accessories");
  });
};

// Display Accessory update form on GET.
exports.accessory_update_get = function (req, res, next) {
  // Get accessory and gameconsoles for form.
  async.parallel(
    {
      accessory: function (callback) {
        Accessory.findById(req.params.id)
          .populate("gameconsole")
          .exec(callback);
      },
      gameconsoles: function (callback) {
        GameConsole.find({})
          .collation({ locale: "en" })
          .sort({ name: 1 })
          .exec(callback);
      },
    },
    function (err, results) {
      if (err) {
        return next(err);
      }
      if (results.accessory == null) {
        // No results.
        var err = new Error("Accessory not found");
        err.status = 404;
        return next(err);
      }
      // Success.

      res.render("item_form", {
        title: "Update Accessory",
        gameconsoles: results.gameconsoles,
        item: results.accessory,
        category: "accessory",
      });
    }
  );
};

// Handle Accessory update on POST.
exports.accessory_update_post = function (req, res) {
  res.send("NOT IMPLEMENTED: Accessory update POST");
};
