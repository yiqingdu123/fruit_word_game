/*
|--------------------------------------------------------------------------
| api.js -- server routes
|--------------------------------------------------------------------------
|
| This file defines the routes for your server.
|
*/

const express = require("express");

// import models so we can interact with the database
const User = require("./models/user");
// const Userstats = require("./models/userstats");
const Gamestats = require("./models/gamestats");
const Word = require("./models/word");

// import authentication library
const auth = require("./auth");

// api endpoints: all these paths will be prefixed with "/api/"
const router = express.Router();

//initialize socket
const socketManager = require("./server-socket");

router.post("/login", auth.login);

router.post("/logout", auth.logout);

router.get("/whoami", (req, res) => {
  if (!req.user) {
    // not logged in
    return res.send({});
  }

  res.send(req.user);
});

router.post("/initsocket", (req, res) => {
  // do nothing if user not logged in
  if (req.user)
    socketManager.addUser(req.user, socketManager.getSocketFromSocketID(req.body.socketid));
  res.send({});
});

// |------------------------------|
// | write your API methods below!|
// |------------------------------|

router.get("/words", (req, res) => {
  Word.find({}).then((words) => res.send(words));
});

router.post("/word", (req, res) => {
  const newWord = new Word({
    content: req.body.content,
  });

  newWord.save().then((word) => res.send(word));
});

router.post("/despawn", (req, res) => {
  if (req.user) {
    socketManager.removeUserFromGame(req.user);
  }
  res.send({});
});

router.get("/user", (req, res) => {
  User.find({ id: req.query.id }).then((user) => {
    res.send(user);
  });
});

// router.post("/user", (req, res) => {
//   const newUser = new User({
//     name: req.body.name,
//     googleid: req.body.googleid,
//     id: req.body.id,
//     highscoreSP: req.body.highscoreSP,
//     highscoreMP: req.body.highscoreMP,
//     MPwins: req.body.MPwins,
//     scoreslistSP: req.body.scoreslistSP,
//     scoreslistMP: req.body.scoreslistMP,
//   });

//   newUser.save().then((user) => res.send(user));
// });

router.post("/userupdateSP", (req, res) => {
  User.findById(req.body.id).then((user) => {
    user.scoreslistSP.push(req.body.score);

    if (req.body.score > user.highscoreSP) {
      user.highscoreSP = req.body.score;
    }

    user.save();
  });
});

// router.post("/delete", (req,res) => {
//   Word.findOneAndDelete()/*gameId: req.body.gameId}).then(() => res.status(200))*/
// })

router // anything else falls to this "not found" case
  .all("*", (req, res) => {
    console.log(`API route not found: ${req.method} ${req.url}`);
    res.status(404).send({ msg: "API route not found" });
  });

module.exports = router;
