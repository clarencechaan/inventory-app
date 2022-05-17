var Accessory = require("../models/accessory");
var GameConsole = require("../models/gameconsole");
var async = require("async");

// Display list of all Accessories.
exports.accessory_list = function (req, res) {
  res.send("NOT IMPLEMENTED: Accessory list");
};

// Display list of all Games.
exports.accessory_list = function (req, res, next) {
  async.parallel(
    {
      accessory_list: function (cb) {
        Accessory.find({}).sort({ name: 1 }).populate("gameconsole").exec(cb);
      },
      gameconsole_list: function (cb) {
        GameConsole.find({}).sort({ name: 1 }).exec(cb);
      },
    },
    function (err, results) {
      res.render("item_list", {
        title: "Accessories",
        item_list: results.accessory_list,
        gameconsole_list: results.gameconsole_list,
        error: err,
      });
    }
  );
};

// Display detail page for a specific Accessory.
exports.accessory_detail = function (req, res) {
  res.send("NOT IMPLEMENTED: Accessory detail: " + req.params.id);
};

// Display Accessory create form on GET.
exports.accessory_create_get = function (req, res) {
  res.send("NOT IMPLEMENTED: Accessory create GET");
};

// Handle Accessory create on POST.
exports.accessory_create_post = function (req, res) {
  res.send("NOT IMPLEMENTED: Accessory create POST");
};

// Display Accessory delete form on GET.
exports.accessory_delete_get = function (req, res) {
  res.send("NOT IMPLEMENTED: Accessory delete GET");
};

// Handle Accessory delete on POST.
exports.accessory_delete_post = function (req, res) {
  res.send("NOT IMPLEMENTED: Accessory delete POST");
};

// Display Accessory update form on GET.
exports.accessory_update_get = function (req, res) {
  res.send("NOT IMPLEMENTED: Accessory update GET");
};

// Handle Accessory update on POST.
exports.accessory_update_post = function (req, res) {
  res.send("NOT IMPLEMENTED: Accessory update POST");
};
