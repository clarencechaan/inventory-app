#! /usr/bin/env node

console.log(
  "This script populates some test games, genres, consoles, and accessories to your database. Specified database as argument - e.g.: populatedb mongodb+srv://cooluser:coolpassword@cluster0.a9azn.mongodb.net/video_game_inventory?retryWrites=true"
);

// Get arguments passed on command line
var userArgs = process.argv.slice(2);
/*
if (!userArgs[0].startsWith('mongodb')) {
    console.log('ERROR: You need to specify a valid mongodb URL as the first argument');
    return
}
*/
var async = require("async");
var Accessory = require("./models/accessory");
var GameConsole = require("./models/gameconsole");
var Genre = require("./models/genre");
var Game = require("./models/game");

var mongoose = require("mongoose");
var mongoDB = userArgs[0];
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

var accessories = [];
var gameconsoles = [];
var genres = [];
var games = [];

function accessoryCreate(
  name,
  description,
  gameconsole,
  price,
  num_in_stock,
  img_url,
  cb
) {
  var accessory = new Accessory({
    name,
    description,
    gameconsole,
    price,
    num_in_stock,
    img_url,
  });

  accessory.save(function (err) {
    if (err) {
      cb(err, null);
      return;
    }
    console.log("New Accessory: " + accessory);
    accessories.push(accessory);
    cb(null, accessory);
  });
}

function genreCreate(name, cb) {
  var genre = new Genre({ name });

  genre.save(function (err) {
    if (err) {
      cb(err, null);
      return;
    }
    console.log("New Genre: " + genre);
    genres.push(genre);
    cb(null, genre);
  });
}

function gameCreate(
  name,
  gameconsole,
  description,
  genre,
  price,
  num_in_stock,
  img_url,
  cb
) {
  gamedetail = {
    name,
    gameconsole,
    description,
    genre,
    price,
    num_in_stock,
    img_url,
  };
  if (genre != false) gamedetail.genre = genre;

  var game = new Game(gamedetail);
  game.save(function (err) {
    if (err) {
      cb(err, null);
      return;
    }
    console.log("New Game: " + game);
    games.push(game);
    cb(null, game);
  });
}

function gameConsoleCreate(
  name,
  description,
  price,
  num_in_stock,
  img_url,
  manufacturer,
  cb
) {
  var gameconsole = new GameConsole({
    name,
    description,
    price,
    num_in_stock,
    img_url,
    manufacturer,
  });

  gameconsole.save(function (err) {
    if (err) {
      cb(err, null);
      return;
    }
    console.log("New Console: " + gameconsole);
    gameconsoles.push(gameconsole);
    cb(null, gameconsole);
  });
}

function createGenres(cb) {
  async.series(
    [
      function (callback) {
        genreCreate("Shooters", callback);
      },
      function (callback) {
        genreCreate("Sports", callback);
      },
      function (callback) {
        genreCreate("Adventure", callback);
      },
      function (callback) {
        genreCreate("Action", callback);
      },
      function (callback) {
        genreCreate("Action role-playing", callback);
      },
      function (callback) {
        genreCreate("Action-adventure", callback);
      },
      function (callback) {
        genreCreate("Simulation", callback);
      },
      function (callback) {
        genreCreate("Strategy", callback);
      },
      function (callback) {
        genreCreate("Racing", callback);
      },
      function (callback) {
        genreCreate("Party", callback);
      },
    ],
    // optional callback
    cb
  );
}

function createGameConsoles(cb) {
  async.series(
    [
      function (callback) {
        gameConsoleCreate(
          "Xbox Series X",
          "Introducing Xbox Series X, the fastest, most powerful Xbox ever. Play thousands of titles from four generations of consoles—all games look and play best on Xbox Series X. At the heart of Series X is the Xbox Velocity Architecture, which pairs a custom SSD with integrated software for faster, streamlined gameplay with significantly reduced load times. Seamlessly move between multiple games in a flash with Quick Resume. Explore rich new worlds and enjoy the action like never before with the unmatched 12 teraflops of raw graphic processing power. Enjoy 4K gaming at up to 120 frames per second, advanced 3D spatial sound, and more. Get started with an instant library of 100+ high-quality games, including all new Xbox Game Studios titles the day they launch like Halo Infinite, with Xbox Game Pass Ultimate (membership sold separately).*",
          599.99,
          46,
          "https://i.imgur.com/xcHGKeM.jpg",
          "Microsoft",
          callback
        );
      },
      function (callback) {
        gameConsoleCreate(
          "Xbox One",
          "Transform the way you game with the Xbox One S console. Equipped with 500GB of storage space, it accommodates loads of downloads and apps. It's compatible with more than 2,200 games, plays Blu-ray discs, and streams content in stunning 4K. The console comes with a wireless controller.",
          379.99,
          46,
          "https://i.imgur.com/134Gp0e.jpg",
          "Microsoft",
          callback
        );
      },
      function (callback) {
        gameConsoleCreate(
          "PlayStation 5",
          "The PS5™ console unleashes new gaming possibilities that you never anticipated. Experience lightning fast loading with an ultra-high speed SSD, deeper immersion with support for haptic feedback, adaptive triggers, and 3D Audio, and an all-new generation of incredible PlayStation® games.",
          629.99,
          12,
          "https://i.imgur.com/NB6v9D8.jpg",
          "Sony",
          callback
        );
      },
      function (callback) {
        gameConsoleCreate(
          "PlayStation 4",
          "Sleek and streamlined, the PlayStation 4 Slim opens the door to a world of immersive gaming and top-tier entertainment. Enjoy blockbuster storytelling presented in stunning Full HD 1080p and an online library full of exclusive content tailor-made for the PS4. Stream movies, tap into your favourite apps, and connect with your friends to embark on epic adventures together.",
          379.99,
          42,
          "https://i.imgur.com/AtM9r28.jpg",
          "Sony",
          callback
        );
      },
      function (callback) {
        gameConsoleCreate(
          "Nintendo Switch",
          "At home, Nintendo Switch rests in the Nintendo Switch Dock that connects the system to the TV and lets you play with family and friends in the comfort of your living room. By simply lifting Nintendo Switch from the dock, the system will instantly transition to portable mode, and the same great gaming experience that was being enjoyed at home now travels with you. The portability of Nintendo Switch is enhanced by its bright high-definition display. It brings the full home gaming system experience with you to the park, on an airplane, in a car, or to a friend's apartment.",
          379.99,
          39,
          "https://i.imgur.com/MG0mHxV.jpg",
          "Nintendo",
          callback
        );
      },
    ],
    // optional callback
    cb
  );
}

function createGames(cb) {
  async.parallel(
    [
      function (callback) {
        gameCreate(
          "Call of Duty: Black Ops Cold War",
          gameconsoles[0],
          "The iconic Black Ops series is back with Call of Duty®: Black Ops Cold War - the direct sequel to the original and fan-favorite Call of Duty®: Black Ops. Black Ops Cold War will drop fans into the depths of the Cold War’s volatile geopolitical battle of the early 1980s. Nothing is ever as it seems in a gripping single-player Campaign, where players will come face-to-face with historical figures and hard truths, as they battle around the globe through iconic locales like East Berlin, Vietnam, Turkey, Soviet KGB headquarters and more.",
          genres[0],
          89.99,
          16,
          "https://i.imgur.com/AMW1ox5.jpg",
          callback
        );
      },
      function (callback) {
        gameCreate(
          "NBA 2K21",
          gameconsoles[0],
          "NBA 2K21 is the latest release in the world-renowned, best-selling NBA 2K series. 2K21 leads the charge with next-gen innovations, while continuing to deliver an industry-leading sports video game experience on the current generation of gaming platforms. With extensive improvements upon its best-in-class graphics and gameplay, competitive and community online features, and deep, varied game modes, NBA 2K21 offers one-of-a-kind immersion into all facets of NBA basketball and culture - where Everything is Game.",
          genres[1],
          39.99,
          24,
          "https://i.imgur.com/ooy3Uww.jpg",
          callback
        );
      },
      function (callback) {
        gameCreate(
          "Marvel’s Avengers",
          gameconsoles[1],
          "Marvel’s Avengers is an epic, third-person, action-adventure game that combines an original, cinematic story with single-player and co-operative gameplay*. Assemble into a team of up to four players online, master extraordinary abilities, customize a growing roster of Heroes, and defend the Earth from escalating threats. Marvel’s Avengers begins at A-Day, where Captain America, Iron Man, the Hulk, Black Widow, and Thor are unveiling a new, hi-tech Avengers Headquarters in San Francisco. The celebration turns deadly when a mysterious enemy causes a catastrophic accident which results in massive devastation. Blamed for the tragedy, the Avengers disband. Five years later, with all Super Heroes outlawed and the world in peril, a sprawling adventure ignites when a determined young woman named Kamala Khan sets out to reassemble and rebuild the Avengers to stop the unchecked power of the secretive new force known as AIM.Marvel’s Avengers continues the epic journey with new Heroes and new narrative delivered on an ongoing basis, for the definitive Avengers gaming experience.",
          genres[2],
          29.99,
          19,
          "https://i.imgur.com/AVLZMKi.jpg",
          callback
        );
      },
      function (callback) {
        gameCreate(
          "NHL 21",
          gameconsoles[1],
          "In EA SPORTS NHL 21, it’s the most creative, inventive and fearless players that are worth celebrating. This year, you’ll be able to pull off moves inspired by the league’s most groundbreaking innovators. An expanded and redesigned Be A Pro mode makes the journey to become one of the league’s best players more immersive than ever, with a dynamic conversation system that shapes everything from your relationship with the coaching staff, to your endorsement deals and salary — even your off-ice interactions with teammates will affect your on-ice chemistry.",
          genres[1],
          39.99,
          16,
          "https://i.imgur.com/q7xUAdg.jpg",
          callback
        );
      },
      function (callback) {
        gameCreate(
          "NHL 21 Ultimate Edition",
          gameconsoles[1],
          "In EA SPORTS NHL 21, it’s the most creative, inventive and fearless players that are worth celebrating. This year, you’ll be able to pull off moves inspired by the league’s most groundbreaking innovators. An expanded and redesigned Be A Pro mode makes the journey to become one of the league’s best players more immersive than ever, with a dynamic conversation system that shapes everything from your relationship with the coaching staff, to your endorsement deals and salary — even your off-ice interactions with teammates will affect your on-ice chemistry.",
          genres[1],
          59.99,
          12,
          "https://i.imgur.com/kCppGMZ.jpg",
          callback
        );
      },
      function (callback) {
        gameCreate(
          "Madden NFL 21",
          gameconsoles[1],
          "A new generation of players are leaving their mark on the NFL. Will you rise to the occasion? Change the game and take control of your own legacy. Madden NFL 21 delivers innovation including: Face of the Franchise: Rise to Fame: Rise to fame and become immortalized in Madden NFL 21 as you transcend NFL history and shape your path to greatness. Take Control: Master all-new running enhancements and live playbooks to drive up the score in Madden NFL 21. X-Factor 2.0: New X-Factor abilities fresh out of the lab designed to elevate NFL stars of a new generation in Madden NFL 21.",
          genres[1],
          39.99,
          17,
          "https://i.imgur.com/GxxFeFg.jpg",
          callback
        );
      },
      function (callback) {
        gameCreate(
          "Cyberpunk 2077",
          gameconsoles[1],
          "Cyberpunk 2077 is an open-world, action-adventure story set in Night City, a megalopolis obsessed with power, glamour and body modification. You play as V, a mercenary outlaw going after a one-of-a-kind implant that is the key to immortality. You can customize your character’s cyberware, skillset and playstyle, and explore a vast city where the choices you make shape the story and the world around you.",
          genres[3],
          39.99,
          22,
          "https://i.imgur.com/49AmDZF.jpg",
          callback
        );
      },
      function (callback) {
        gameCreate(
          "Ratchet & Clank Rift Apart",
          gameconsoles[2],
          "The intergalactic adventurers are back with a bang in Ratchet & Clank: Rift Apart. Help them stop a robotic emperor intent on conquering cross-dimensional worlds, with their own universe next in the firing line.Built from the ground up by acclaimed studio Insomniac Games, go above and beyond with the mind-blowing speed and immersive features of the PS5™ console. Brand-new haptic feedback and adaptive trigger technology creates astonishing physical sensations, bringing in-game actions to life in your hands via the DualSense™ wireless controller.",
          genres[3],
          89.99,
          10,
          "https://i.imgur.com/rcy6L78.jpg",
          callback
        );
      },
      function (callback) {
        gameCreate(
          "UNCHARTED™: Legacy of Thieves Collection",
          gameconsoles[2],
          "Seek your fortune and leave your mark on the map in the UNCHARTED™: Legacy of Thieves Collection. Uncover the thrilling cinematic storytelling and the largest blockbuster action set pieces in the UNCHARTED franchise, packed with all the wit, cunning, and over the top moments of the beloved thieves – Nathan Drake and Chloe Frazer. In an experience delivered by award winning developer Naughty Dog, the UNCHARTEDTM: Legacy of Thieves Collection includes the two critically-acclaimed, globe-trotting single player adventures from UNCHARTED™ 4: A Thief’s End and UNCHARTED™: The Lost Legacy. Each story is filled with laughs, drama, high octane combat, and a sense of wonder – remastered to be even more immersive. ",
          genres[2],
          64.99,
          31,
          "https://i.imgur.com/LCRWjdN.jpg",
          callback
        );
      },
      function (callback) {
        gameCreate(
          "Demon’s Souls",
          gameconsoles[2],
          "The original brutal challenge – entirely rebuilt from the ground up. From PlayStation Studios and Bluepoint Games comes a remake of the PlayStation classic, Demon’s Souls™. Entirely rebuilt from the ground up and masterfully enhanced, this remake introduces the horrors of a fog-laden, dark fantasy land to a whole new generation of gamers. Those who have faced its trials and tribulations before, can once again challenge the darkness in stunning visual quality and incredible performance. In his quest for power, the 12th King of Boletaria, King Allant channelled the ancient Soul Arts, awakening a demon from the dawn of time itself, The Old One.  With the summoning of The Old One, a colorless fog swept across the land, unleashing nightmarish creatures that hungered for human souls. Those whose souls were stripped from them, lost their minds – left only with the desire to attack the sane that remained.",
          genres[4],
          89.99,
          8,
          "https://i.imgur.com/u5aJk5O.jpg",
          callback
        );
      },
      function (callback) {
        gameCreate(
          "Horizon Forbidden West",
          gameconsoles[2],
          "Join Aloy as she braves the Forbidden West – a majestic but dangerous frontier that conceals mysterious new threats. Explore distant lands, fight bigger and more awe-inspiring machines, and encounter astonishing new tribes as you return to the far-future, post-apocalyptic world of Horizon. The land is dying. Vicious storms and an unstoppable blight ravage the scattered remnants of humanity, while fearsome new machines prowl their borders. Life on Earth is hurtling towards another extinction, and no one knows why. It's up to Aloy to uncover the secrets behind these threats and restore order and balance to the world. Along the way, she must reunite with old friends, forge alliances with warring new factions and unravel the legacy of the ancient past – all the while trying to stay one step ahead of a seemingly undefeatable new enemy.",
          genres[4],
          89.99,
          22,
          "https://i.imgur.com/2GblcbH.jpg",
          callback
        );
      },
      function (callback) {
        gameCreate(
          "Marvel's Spider-Man: Miles Morales Ultimate Edition",
          gameconsoles[2],
          "In the latest adventure in the Marvel’s Spider-Man universe, teenager Miles Morales is adjusting to his new home while following in the footsteps of his mentor, Peter Parker, as a new Spider-Man. But when a fierce power struggle threatens to destroy his new home, the aspiring hero realizes that with great power, there must also come great responsibility. To save all of Marvel’s New York, Miles must take up the mantle of Spider-Man and own it. Discover the complete web-slinging story with the Marvel’s Spider-Man: Miles Morales Ultimate Edition. This unmissable bundle includes Marvel’s Spider-Man Remastered – the complete award-winning game, including all three DLC chapters in the Marvel’s Spider-Man: The City That Never Sleeps adventure – remastered and enhanced for PS5™.",
          genres[5],
          89.99,
          36,
          "https://i.imgur.com/ORt9JfG.jpg",
          callback
        );
      },
      function (callback) {
        gameCreate(
          "Marvel’s Avengers",
          gameconsoles[3],
          "Marvel’s Avengers is an epic, third-person, action-adventure game that combines an original, cinematic story with single-player and co-operative gameplay*. Assemble into a team of up to four players online, master extraordinary abilities, customize a growing roster of Heroes, and defend the Earth from escalating threats. Marvel’s Avengers begins at A-Day, where Captain America, Iron Man, the Hulk, Black Widow, and Thor are unveiling a new, hi-tech Avengers Headquarters in San Francisco. The celebration turns deadly when a mysterious enemy causes a catastrophic accident which results in massive devastation. Blamed for the tragedy, the Avengers disband. Five years later, with all Super Heroes outlawed and the world in peril, a sprawling adventure ignites when a determined young woman named Kamala Khan sets out to reassemble and rebuild the Avengers to stop the unchecked power of the secretive new force known as AIM.Marvel’s Avengers continues the epic journey with new Heroes and new narrative delivered on an ongoing basis, for the definitive Avengers gaming experience.",
          genres[2],
          29.99,
          19,
          "https://i.imgur.com/3XfOxQ6.jpg",
          callback
        );
      },
      function (callback) {
        gameCreate(
          "NHL 21",
          gameconsoles[3],
          "In EA SPORTS NHL 21, it’s the most creative, inventive and fearless players that are worth celebrating. This year, you’ll be able to pull off moves inspired by the league’s most groundbreaking innovators. An expanded and redesigned Be A Pro mode makes the journey to become one of the league’s best players more immersive than ever, with a dynamic conversation system that shapes everything from your relationship with the coaching staff, to your endorsement deals and salary — even your off-ice interactions with teammates will affect your on-ice chemistry.",
          genres[1],
          39.99,
          17,
          "https://i.imgur.com/ctY2BBm.jpg",
          callback
        );
      },
      function (callback) {
        gameCreate(
          "Madden NFL 21",
          gameconsoles[3],
          "A new generation of players are leaving their mark on the NFL. Will you rise to the occasion? Change the game and take control of your own legacy. Madden NFL 21 delivers innovation including: Face of the Franchise: Rise to Fame: Rise to fame and become immortalized in Madden NFL 21 as you transcend NFL history and shape your path to greatness. Take Control: Master all-new running enhancements and live playbooks to drive up the score in Madden NFL 21. X-Factor 2.0: New X-Factor abilities fresh out of the lab designed to elevate NFL stars of a new generation in Madden NFL 21.",
          genres[1],
          39.99,
          16,
          "https://i.imgur.com/NUMl2cG.jpg",
          callback
        );
      },
      function (callback) {
        gameCreate(
          "Tony Hawk’s Pro Skater 1 & 2",
          gameconsoles[3],
          "Drop back in with the most iconic skateboarding games ever made. Play Tony Hawk’s™ Pro Skater™ & Tony Hawk’s™ Pro Skater™ 2 in one epic collection, rebuilt from the ground up in incredible HD. All the pro skaters, levels and tricks are back and fully-remastered, plus more.",
          genres[1],
          59.99,
          21,
          "https://i.imgur.com/iEUV53B.jpg",
          callback
        );
      },
      function (callback) {
        gameCreate(
          "Ghost Of Tsushima",
          gameconsoles[3],
          "In the late 13th century, the Mongol empire has laid waste to entire nations along their campaign to conquer the East. Tsushima Island is all that stands between mainland Japan and a massive Mongol invasion fleet led by the ruthless and cunning general, Khotun Khan. As the island burns in the wake of the first wave of the Mongol assault, samurai warrior Jin Sakai stands as one of the last surviving members of his clan. He is resolved do whatever it takes, at any cost, to protect his people and reclaim his home. He must set aside the traditions that have shaped him as a warrior to forge a new path, the path of the Ghost, and wage an unconventional war for the freedom of Tsushima.",
          genres[3],
          49.99,
          29,
          "https://i.imgur.com/DSmd1j8.jpg",
          callback
        );
      },
      function (callback) {
        gameCreate(
          "Luigi's Mansion 3",
          gameconsoles[4],
          "Luigi’s invited to the towering Last Resort hotel, but when Mario and friends go missing, our green-clad hero will have to conquer his fears to save them! Slam, blow away, and vacuum up ghosts with the all-new Poltergust G-00, and join forces with Gooigi to overcome the puzzling contraptions and mischievous boss on each themed floor. And that’s just the Last Resort. Enter the ScareScraper for 8-player local wireless or online co-op gameplay.",
          genres[2],
          79.99,
          19,
          "https://i.imgur.com/Ajt5TaE.jpg",
          callback
        );
      },
      function (callback) {
        gameCreate(
          "Animal Crossing: New Horizons",
          gameconsoles[4],
          "Beloved franchise Animal Crossing gets ready for its Nintendo Switch Debut! If the hustle and bustle of modern life’s got you down, Tom Nook has a new business venture up his sleeve that he knows you’ll adore: the Nook Inc. Deserted Island Getaway Package! Sure, you’ve crossed paths with colourful characters near and far. Had a grand time as one of the city folk. May’ve even turned over a new leaf and dedicated yourself to public service! But deep down, isn’t there a part of you that longs for…freedom? Then perhaps a long walk on the beach of a deserted island, where a rich wealth of untouched nature awaits, is just what the doctor ordered!",
          genres[6],
          79.99,
          43,
          "https://i.imgur.com/7djM97X.jpg",
          callback
        );
      },
      function (callback) {
        gameCreate(
          "Mario Kart 8 Deluxe",
          gameconsoles[4],
          "Race and battle your friends in the definitive version of Mario Kart 8. Hit the road with the definitive version of Mario Kart 8 and play anytime, anywhere! Race your friends or battle them in a revised battle mode on new and returning battle courses. Play locally in up to 4-player multiplayer** in 1080p while playing in TV Mode. Every track from the Wii U version, including DLC, makes a glorious return. Plus, the Inklings appear as all-new guest characters, along with returning favorites, such as King Boo, Dry Bones, and Bowser Jr.!",
          genres[8],
          79.99,
          18,
          "https://i.imgur.com/drCmbaW.jpg",
          callback
        );
      },
      function (callback) {
        gameCreate(
          "Super Mario Party",
          gameconsoles[4],
          "A complete refresh of the Mario Party™ series. The original 4-player Mario Party series board game mode that fans love is back, and your friends and family are invited to the party! Freely walk the board: choose where to move, which Dice Block to roll, and how to win the most Stars in skill-based minigames. Wait till you see the 2 vs 2 mode with grid-based maps, the creative uses of the console, and the series’ first online minigame mode!",
          genres[9],
          79.99,
          18,
          "https://i.imgur.com/kvQymX0.jpg",
          callback
        );
      },
    ],
    // optional callback
    cb
  );
}

function createAccessories(cb) {
  async.parallel(
    [
      function (callback) {
        accessoryCreate(
          "Xbox Wireless Controller",
          "Experience the modernized design of the Xbox Wireless Controller in Robot White, featuring sculpted surfaces and refined geometry for enhanced comfort during gameplay. Stay on target with a hybrid D-pad and textured grip on the triggers, bumpers, and back case. Seamlessly capture and share content such as screenshots, recordings, and more with the new Share button. Use the Xbox Accessories app to remap buttons and create custom controller profiles for your favorite games. Includes Xbox Wireless and Bluetooth technology for wireless gaming on supported consoles, Windows 10 PCs, Android phones, and tablets.* iOS support coming in the future*",
          gameconsoles[0],
          74.99,
          13,
          "https://i.imgur.com/E8V5DLW.jpg",
          callback
        );
      },
      function (callback) {
        accessoryCreate(
          "Turtle Beach Recon 500",
          "HEAR THE REVOLUTION. A REVOLUTION IN AUDIO. Turtle Beach 60mm Eclipse™ Dual Drivers. Pro-Level TruSpeak™ Mic. Memory Foam ear Cushions. Multiplatform Compatibility.",
          gameconsoles[0],
          79.99,
          6,
          "https://i.imgur.com/lFqFJTx.jpg",
          callback
        );
      },
      function (callback) {
        accessoryCreate(
          "Seagate 1TB Storage Expansion Card",
          "Plug into the most powerful Xbox console ever—the Seagate Storage Expansion Card for Xbox Series X|S. 1TB of capacity expansion. Seamless integration into the Xbox Velocity Architecture. Virtually no lag in power or speed when gaming from the expansion card.",
          gameconsoles[0],
          299.99,
          10,
          "https://i.imgur.com/m47nHOO.jpg",
          callback
        );
      },
      function (callback) {
        accessoryCreate(
          "Charge Cable",
          "With a sophisticated controller comes low battery expectancy. The Charge Cable for Xbox One controllers allows you to charge while you play during those intensive gaming sessions! Connect your controller directly to your console and continue uninterrupted game play from virtually anywhere in your room.",
          gameconsoles[1],
          3.99,
          40,
          "https://i.imgur.com/JvunGgs.jpg",
          callback
        );
      },
      function (callback) {
        accessoryCreate(
          "Charge Cable",
          "With a sophisticated controller comes low battery expectancy. The Charge Cable for Xbox One controllers allows you to charge while you play during those intensive gaming sessions! Connect your controller directly to your console and continue uninterrupted game play from virtually anywhere in your room.",
          gameconsoles[1],
          3.99,
          40,
          "https://i.imgur.com/JvunGgs.jpg",
          callback
        );
      },
      function (callback) {
        accessoryCreate(
          "Play & Charge Rechargeable Battery Kit",
          "Keep the action going with the Xbox One Play and Charge Kit.  Recharge while you play or afterwards, even when your Xbox is in standby. The long-lasting rechargeable battery fully charges in under 4 hours. Say goodbye to disposable batteries and having to swap them out in the middle of a game.",
          gameconsoles[1],
          29.99,
          15,
          "https://i.imgur.com/ybi9vRA.jpg",
          callback
        );
      },
      function (callback) {
        accessoryCreate(
          "Biogenik Multi-Port USB Hub",
          "Powered by Xbox One console. 4 easy-access, front-facing ports. Charge & data transfer supported. Compatible with Xbox One controllers, cameras, headsets and usb 3.0 pen drivers.",
          gameconsoles[1],
          10.99,
          10,
          "https://i.imgur.com/HzqlQE2.jpg",
          callback
        );
      },
      function (callback) {
        accessoryCreate(
          "Biogenik Controller Keypad",
          "Biogenik Controller Keypad for Xbox One console.",
          gameconsoles[1],
          19.99,
          10,
          "https://i.imgur.com/kpZNGK8.jpg",
          callback
        );
      },
      function (callback) {
        accessoryCreate(
          "PlayStation 5 DualSense Wireless Controller",
          "Discover a deeper, highly immersive gaming experience1 that brings the action to life in the palms of your hands. The DualSense™ wireless controller offers immersive haptic feedback2, dynamic adaptive triggers2 and a built-in microphone, all integrated into an iconic comfortable design.",
          gameconsoles[2],
          89.99,
          22,
          "https://i.imgur.com/7YIbb8a.jpg",
          callback
        );
      },
      function (callback) {
        accessoryCreate(
          "PULSE 3D™ Wireless Headset",
          "Enjoy a seamless, wireless experience with a headset fine-tuned for 3D Audio on PS5™ consoles. The PULSE 3D™ wireless headset features a refined design with dual noise-cancelling microphones, built-in rechargeable battery, and an array of easy-access controls. Built for a new generation.",
          gameconsoles[2],
          129.99,
          8,
          "https://i.imgur.com/T0ai0x8.jpg",
          callback
        );
      },
      function (callback) {
        accessoryCreate(
          "PlayStation 5 Media Remote",
          "Conveniently navigate entertainment1 on your PlayStation®5 console with an intuitive layout featuring media controls. Simplify your set-up with the ability to power on your PS5™ console directly and adjust the volume and power settings of compatible TVs. Explore a world of entertainment. Dedicated app buttons.",
          gameconsoles[2],
          39.99,
          13,
          "https://i.imgur.com/kVrZAKr.jpg",
          callback
        );
      },
      function (callback) {
        accessoryCreate(
          "PlayStation 5 HD Camera",
          "Featuring dual lenses for 1080p capture and a built-in stand, the HD camera works seamlessly with the PS5™ background removal tools to put you in the spotlight. Quickly create a recording or a broadcast of yourself and your gameplay, with your DualSense™ wireless controller’s create button. Capture unmissable moments. ",
          gameconsoles[2],
          79.99,
          18,
          "https://i.imgur.com/qHdrckW.jpg",
          callback
        );
      },
      function (callback) {
        accessoryCreate(
          "PlayStation 4 Camera",
          "The redesigned PlayStation®Camera (PS Camera) inherits all the features available on the current model, including PlayStation VR (PS VR) support, and features a new compact cylindrical form. PS Camera includes a stand allowing users to easily adjust the angle of the PS Camera and set it up in their preferred location, such as on top of their TV or entertainment center.",
          gameconsoles[3],
          49.99,
          14,
          "https://i.imgur.com/KYvvcLE.jpg",
          callback
        );
      },
      function (callback) {
        accessoryCreate(
          "PlayStation 4 DualShock 4 Controller",
          "The DualShock®4 Wireless Controller features familiar controls, and incorporates several innovative features to usher in a new era of interactive experiences. Its definitive analog sticks and trigger buttons have been improved for greater feel and sensitivity. A multi-touch, clickable touch pad expands gameplay possibilities, while the incorporated light bar in conjunction with the PlayStation®Camera allows for easy player identification and screen adjustment when playing with friends in the same room. The addition of the Share button makes utilizing the social capabilities of the PlayStation®4 as easy as the push of a button. The DualShock®4 Wireless Controller is more than a controller, it's your physical connection to a new era of gaming.",
          gameconsoles[3],
          74.99,
          24,
          "https://i.imgur.com/5LWMpCB.jpg",
          callback
        );
      },
      function (callback) {
        accessoryCreate(
          "PlayStation 4 Platinum Wireless Headset",
          "The Platinum Wireless Headset redefines premium gaming audio by creating an incredibly rich and detailed soundstage for your virtual world, faithfully delivering everything from the whisper of ghosts to the thunder of guns in stunning 7.1 Virtual Surround Sound, all powered by revolutionary 3D Audio technology. Its advanced, built-in dual mics capture your voice and cancel out distractions, while an extended-life battery keeps you playing longer. A light, comfortable design keeps your focus where it needs to be. And free, exclusive audio modes elevate your favorite titles to the next level. This is how games were made to sound.",
          gameconsoles[3],
          199.99,
          7,
          "https://i.imgur.com/uOKQlEg.jpg",
          callback
        );
      },
      function (callback) {
        accessoryCreate(
          "Multi Charge Controller Stand",
          "The Biogenik Headset & Controller Charge Stand plugs into a standard outlet and can quickly charge your headset and controllers while your console is powered off; providing a convenient and attractive method to store and charge your PS4 accessories. Proudly display your PS4 accessories in style with the Biogenik Controller & Headset Charge Stand. The clever design allows you to charge two DualShock 4 wireless controllers and two USB-powered devices while also providing a secure spot to store your gaming headset. Simply keep your gaming headset and two controllers on the stand when they aren’t in use and the Charge Stand will take care of the rest. This stylish accessory provides a convenient tabletop storage solution and it will compliment any gaming setup.",
          gameconsoles[3],
          39.99,
          15,
          "https://i.imgur.com/7tTd7jX.jpg",
          callback
        );
      },
      function (callback) {
        accessoryCreate(
          "Biogenik Travel Case for Nintendo Switch",
          "The Biogenik Switch Travel Case is made of durable, lightweight materials that provide superior protection when transporting your Nintendo Switch. The soft microfiber interior lining prevents the handheld console from being scratched and features 4 designated slots for carrying games as well as a separate mesh pocket designed to hold additional Switch accessories, such as the power adapter, charge cable, and earbuds. Conveniently stores, protects and transports your Nintendo Switch, miscellaneous accessories and up to four games.",
          gameconsoles[4],
          14.99,
          13,
          "https://i.imgur.com/3GmFf6n.jpg",
          callback
        );
      },
      function (callback) {
        accessoryCreate(
          "Nintendo Switch Pro Controller",
          "Play anyone, any time, anywhere with the Nintendo Switch Pro-Controller. Take your game sessions up a notch with the Pro Controller. Includes motion controls, HD rumble, built-in amiibo functionality, and more.",
          gameconsoles[4],
          89.99,
          20,
          "https://i.imgur.com/GgXqRFl.jpg",
          callback
        );
      },
      function (callback) {
        accessoryCreate(
          "Nintendo Switch Joy-Con Controllers",
          "This is Joy-Con™. One controller or two, vertical or sideways, motion controls or button. Joy-Con and Nintendo Switch give you total gameplay flexibility. Games come to life through easy-to-use motion controls and HD rumble—advanced vibration features built into each Joy-Con. Joy-Con Grip accessory sold separately.",
          gameconsoles[4],
          99.99,
          28,
          "https://i.imgur.com/EhLEZpX.jpg",
          callback
        );
      },
      function (callback) {
        accessoryCreate(
          "Biogenik Starter Kit for Nintendo Switch",
          "Explore a world of gaming while exploring your own world at the same time. The Biogenik Starter Kit contains essential accessories for the Nintendo Switch. The secure, zippered Travel Case provides a secure fit and is ideal for transporting the handheld console. The kit also comes with an assortment of accessories for your Nintendo Switch, including Earbuds, Joy-Con Grips, Joy-Con Thumb Grips, a Screen Guard and a Cleaning Cloth. This kit lets you take your gaming with you, no matter where you might go.",
          gameconsoles[4],
          24.99,
          10,
          "https://i.imgur.com/ElvIYwK.jpg",
          callback
        );
      },
      function (callback) {
        accessoryCreate(
          "amiibo - Kirby Figure",
          "What can amiibo do? Tap an amiibo on the Wii U GamePad’s NFC touchpoint while using compatible software and you’ll uncover surprising new features! amiibo have different effects depending on the game: you might unlock new modes, weapons or character customisations, or even boost your amiibo’s abilities to turn it into your perfect partner – or a formidable foe!",
          gameconsoles[4],
          15.99,
          6,
          "https://i.imgur.com/44BNDPb.jpg",
          callback
        );
      },
    ],
    // Optional callback
    cb
  );
}

async.series(
  [createGenres, createGameConsoles, createGames, createAccessories],
  // Optional callback
  function (err, results) {
    if (err) {
      console.log("FINAL ERR: " + err);
    }
    // All done, disconnect from database
    mongoose.connection.close();
  }
);
