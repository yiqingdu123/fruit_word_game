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
const Lobby = require("./models/lobby");

// import authentication library
const auth = require("./auth");

// api endpoints: all these paths will be prefixed with "/api/"
const router = express.Router();

//initialize socket
const socketManager = require("./server-socket");
const { gameState } = require("./game-logic");
const user = require("./models/user");

router.post("/login", auth.login);

router.post("/logout", auth.logout);

router.get("/whoami", (req, res) => {
  if (!req.user) {
    // not logged in
    return res.send({});
  }

  res.send(req.user);
});

router.get("/user", (req, res) => {
  User.findById(req.query.userid).then((user) => {
    res.send(user);
  });
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

// router.get("/user", (req, res) => {
//   User.find({ id: req.query.id }).then((user) => {
//     res.send(user);
//   });
// });

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

router.post("/userupdateMP", (req, res) => {
  User.findById(req.body.id).then((user) => {
    user.scoreslistMP.push(req.body.score);

    if (req.body.score > user.highscoreMP) {
      user.highscoreMP = req.body.score;
    }

    user.save();
  });
});

router.post("/userlobbyupdate", (req, res) => {
  User.findById(req.body.id).then((user) => {
    user.lobby = req.body.lobby;
    user.save();
  });

  Lobby.find({ content: req.body.lobby }).then((lob) => {
    if (lob.length == 0) {
      const newLobby = new Lobby({
        content: req.body.lobby,
        numPlayersReady: 0,
      });

      newLobby.save().then((lobby) => {
        socketManager.getIo().emit("newLobby", req.body.lobby);
        res.send(lobby);
      });
    } else {
      socketManager.getIo().emit("newLobby", req.body.lobby);
      res.send({});
    }
  });
});

router.get("/lobbyusers", (req, res) => {
  // console.log(req.query.lobby);
  User.find({ lobby: req.query.lobby }).then((users) => {
    console.log(users);
    res.send(users);
  });
});

router.post("/unready", (req, res) => {
  Lobby.findOneAndUpdate({ content: req.body.lobby }, { $inc: { numPlayersReady: -1 } })
    .then(() => {
      // console.log(req.body.lobby);
      // console.log("akdfaldfj");
      socketManager.getIo().emit("userUnreadied", {});
    })
    .then(() => {});
  res.send({});
});

router.post("/ready", (req, res) => {
  Lobby.findOneAndUpdate({ content: req.body.lobby }, { $inc: { numPlayersReady: 1 } })
    .then(() => {
      // console.log(req.body.lobby);
      // console.log("akdfaldfj");
      socketManager.getIo().emit("userReadied", {});
    })
    .then(() => {});
  res.send({});
});

router.post("/deleteuserlobby", (req, res) => {
  socketManager.getIo().emit("userLeft", {});
  User.findById(req.body.id).then((user) => {
    console.log("The user to delete is " + user);
    if (user.lobby !== "") {
      Lobby.findOneAndUpdate({ content: user.lobby }, { numPlayersReady: 0 }).then(() => {
        user.lobby = "";
        user.save().then(() => {
          res.send({});
        });
      });
    }
  });
});

router.get("/userlobby", (req, res) => {
  console.log("userlobby id", req.query.id);
  User.findById(req.query.id).then((user) => {
    res.send(user);
  });
});

router.get("/numberusersready", (req, res) => {
  Lobby.findOne({ content: req.query.lobby }).then((lobby) => {
    console.log(lobby.numPlayersReady);
    res.send({ value: lobby.numPlayersReady });
  });
});

// router.post("/delete", (req,res) => {
//   Word.findOneAndDelete()/*gameId: req.body.gameId}).then(() => res.status(200))*/
// })

router.post("/joingame", (req, res) => {
  if (req.user) {
    socketManager.addUserToGame(req.user);
  }
  // console.log(gameState);
  res.send({});
});

router.post("/leavegame", (req, res) => {
  if (req.user) {
    socketManager.removeUserFromGame(req.user);
  }
  res.send({});
});

router.post("/servertimer", (req, res) => {
  socketManager.serverTimer();
  res.send({});
});

router.post("/stoptimer", (req, res) => {
  socketManager.stopTimer();
  res.send({});
});

router.post("/resetbigram", (req, res) => {
  socketManager.bigramUI();
  res.send({});
});

router.post("/setbigram", (req, res) => {
  socketManager.setBigram();
  res.send({});
});

router.post("/setWordsList", (req, res) => {
  socketManager.setWordsList(req.body.words, req.body.user);
  res.send({});
});

router.post("/sendName", (req, res) => {
  socketManager.sendName(req.body.user, req.body.userId);
  res.send({});
});

// Keep this VVV at the bottom

router // anything else falls to this "not found" case
  .all("*", (req, res) => {
    console.log(`API route not found: ${req.method} ${req.url}`);
    res.status(404).send({ msg: "API route not found" });
  });

module.exports = router;
