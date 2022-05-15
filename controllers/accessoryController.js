var Accessory = require("../models/accessory");

// Display list of all Accessories.
exports.accessory_list = function (req, res) {
  res.send("NOT IMPLEMENTED: Accessory list");
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
