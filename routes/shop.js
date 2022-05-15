var express = require("express");
var router = express.Router();

// Require controller modules.
var accessory_controller = require("../controllers/accessoryController");
var gameconsole_controller = require("../controllers/gameConsoleController");
var game_controller = require("../controllers/gameController");
var genre_controller = require("../controllers/genreController");

/// ACCESSORY ROUTES ///

// GET shop home page.
router.get("/", game_controller.index);

// GET request for creating an Accessory. NOTE This must come before routes that display Accessory (uses id).
router.get("/accessory/create", accessory_controller.accessory_create_get);

// POST request for creating Accessory.
router.post("/accessory/create", accessory_controller.accessory_create_post);

// GET request to delete Accessory.
router.get("/accessory/:id/delete", accessory_controller.accessory_delete_get);

// POST request to delete Accessory.
router.post(
  "/accessory/:id/delete",
  accessory_controller.accessory_delete_post
);

// GET request to update Accessory.
router.get("/accessory/:id/update", accessory_controller.accessory_update_get);

// POST request to update Accessory.
router.post(
  "/accessory/:id/update",
  accessory_controller.accessory_update_post
);

// GET request for one Accessory.
router.get("/accessory/:id", accessory_controller.accessory_detail);

// GET request for list of all Accessory items.
router.get("/accessories", accessory_controller.accessory_list);

/// GAMECONSOLE ROUTES ///

// GET request for creating GameConsole. NOTE This must come before route for id (i.e. display gameconsole).
router.get(
  "/gameconsole/create",
  gameconsole_controller.gameconsole_create_get
);

// POST request for creating GameConsole.
router.post(
  "/gameconsole/create",
  gameconsole_controller.gameconsole_create_post
);

// GET request to delete GameConsole.
router.get(
  "/gameconsole/:id/delete",
  gameconsole_controller.gameconsole_delete_get
);

// POST request to delete GameConsole.
router.post(
  "/gameconsole/:id/delete",
  gameconsole_controller.gameconsole_delete_post
);

// GET request to update GameConsole.
router.get(
  "/gameconsole/:id/update",
  gameconsole_controller.gameconsole_update_get
);

// POST request to update GameConsole.
router.post(
  "/gameconsole/:id/update",
  gameconsole_controller.gameconsole_update_post
);

// GET request for one GameConsole.
router.get("/gameconsole/:id", gameconsole_controller.gameconsole_detail);

// GET request for list of all GameConsoles.
router.get("/gameconsoles", gameconsole_controller.gameconsole_list);

/// GAME ROUTES ///

// GET request for creating a Game. NOTE This must come before route that displays Game (uses id).
router.get("/game/create", game_controller.game_create_get);

// POST request for creating Game.
router.post("/game/create", game_controller.game_create_post);

// GET request to delete Game.
router.get("/game/:id/delete", game_controller.game_delete_get);

// POST request to delete Game.
router.post("/game/:id/delete", game_controller.game_delete_post);

// GET request to update Game.
router.get("/game/:id/update", game_controller.game_update_get);

// POST request to update Game.
router.post("/game/:id/update", game_controller.game_update_post);

// GET request for one Game.
router.get("/game/:id", game_controller.game_detail);

// GET request for list of all Game.
router.get("/games", game_controller.game_list);

/// GENRE ROUTES ///

// GET request for creating a Genre. NOTE This must come before route that displays Genre (uses id).
router.get("/genre/create", genre_controller.genre_create_get);

//POST request for creating Genre.
router.post("/genre/create", genre_controller.genre_create_post);

// GET request to delete Genre.
router.get("/genre/:id/delete", genre_controller.genre_delete_get);

// POST request to delete Genre.
router.post("/genre/:id/delete", genre_controller.genre_delete_post);

// GET request to update Genre.
router.get("/genre/:id/update", genre_controller.genre_update_get);

// POST request to update Genre.
router.post("/genre/:id/update", genre_controller.genre_update_post);

// GET request for one Genre.
router.get("/genre/:id", genre_controller.genre_detail);

// GET request for list of all Genre.
router.get("/genres", genre_controller.genre_list);

module.exports = router;
