const gameState = {
  winner: null,
  players: {},
  playercount: 0,
  deadPlayers: 0,
  time: 8,
  bigram: "ui",
  playersGood: 0,
  IDcount: 0,
  wordsList: [],
  gameStarted: "false",
};

const spawnPlayer = (id) => {
  if (gameState.gameStarted === "false") {
    if (gameState.players[id] === undefined) {
      gameState.players[id] = {
        lives: 5,
        wordValid: "false",
        alive: "true",
        playerID: gameState.IDcount,
        currentWord: "temp",
        userName: "name",
      };
      gameState.IDcount++;
      gameState.playercount++;
    }
    console.log(gameState.players.playerID);
  }

  //REMOVE GAMESTATE.PLAYERCOUNT++;
  //WHEN LOBBY IS READY, SET NUMBER OF PLAYERS TO BE PLAYERCOUNT
  //AT GAMEOVER SCREEN CALL A RESET POST REQUEST
};

const removePlayer = (id) => {
  if (gameState.players[id] != undefined) {
    delete gameState.players[id];
    gameState.playercount--;
  }

  if (gameState.playercount < 0) {
    gameState.playercount = 0;
  }
  if (gameState.playercount === 0) {
    bigramUI();
    stopTimer();
    resetList();
    gameState.gameStarted = "false";
    gameState.IDcount = 1;
    gameState.deadPlayers = 0;
  }
};

/////////////////
//TIMER 1
/////////////////

let timerState = 1;

const serverTimer = () => {
  let remainingTime = 7;

  const timerId = setInterval(() => {
    if (timerState === 2) {
      clearInterval(timerId);
    }
    if (remainingTime === 0) {
      gameState.time = 8;
      setBigram();
      console.log(gameState.time);
      remainingTime = 7;

      //LOGIC FOR WHEN TIME IS OUT

      for (const id in gameState.players) {
        if (gameState.players[id].wordValid === "false") {
          gameState.players[id].lives = gameState.players[id].lives - 1;
        }
        gameState.players[id].wordValid = "false";
        if (gameState.players[id].lives === 0) {
          removePlayer(id);
        }
      }
      gameState.playersGood = 0;
    } else if (timerState != 2) {
      gameState.time = remainingTime;
      remainingTime--;
      console.log(gameState.time);
    }
    if (timerState === 0) {
      gameState.time = 8;
      clearInterval(timerId);
    }
  }, 1000);
};

//////////////////
//TIMER 2
//////////////////
const serverTimer2 = () => {
  remainingTime = 7;

  const timerId2 = setInterval(() => {
    if (timerState === 1) {
      clearInterval(timerId2);
    }
    if (remainingTime === 0) {
      gameState.time = 8;
      setBigram();
      console.log(gameState.time);
      remainingTime = 7;

      //LOGIC FOR WHEN TIME IS OUT

      for (const id in gameState.players) {
        if (gameState.players[id].wordValid === "false") {
          gameState.players[id].lives = gameState.players[id].lives - 1;
        }
        gameState.players[id].wordValid = "false";
        if (gameState.players[id].lives === 0) {
          removePlayer(id);
        }
      }
      gameState.playersGood = 0;
    } else if (timerState != 1) {
      gameState.time = remainingTime;
      remainingTime--;
      console.log(gameState.time);
    }
    if (timerState === 0) {
      gameState.time = 8;
      clearInterval(timerId2);
    }
  }, 1000);
};

/////////////////////////

const stopTimer = () => {
  timerState = 0;
};

const setBigram = () => {
  let randomBigram = BigramList[Math.floor(Math.random() * BigramList.length)];
  gameState.bigram = randomBigram;
};

const bigramUI = () => {
  gameState.bigram = "ui";
};

const updateGameState = () => {
  // let good = 0;

  // for (const id in gameState.players) {
  //   if (gameState.players[id].wordValid) {
  //     good++;
  //     console.log(good);
  //   }
  // }
  // gameState.playersGood = good;
  checkPlayersGood();
};

const setWordsList = (words, user) => {
  gameState.wordsList[gameState.wordsList.length] = words;
  gameState.players[user].wordValid = "true";
  console.log(gameState.players);
  gameState.playersGood++;
};

const checkPlayersGood = () => {
  if (gameState.playersGood === gameState.playercount && gameState.playercount != 0) {
    // Object.keys(gameState.players).forEach((element) => {
    //   gameState.players[element].wordValid = "false";
    // });
    for (const id in gameState.players) {
      gameState.players[id].wordValid = "false";
    }

    gameState.playersGood = 0;
    console.log("reset");
    setBigram();
    gameState.gameStarted = "true";

    // RESET TIMER

    console.log("timerstate" + timerState);

    if (timerState === 0) {
      timerState = 1;
    }

    if (timerState === 1) {
      gameState.time = 8;
      remainingTime = 7;
      timerState = 2;
      console.log("timerstate " + timerState);
      serverTimer2();
    } else if (timerState === 2) {
      gameState.time = 8;
      remainingTime = 7;
      timerState = 1;
      console.log("timerstate " + timerState);
      serverTimer();
    }
  }
};

const resetList = () => {
  gameState.wordsList = [];
};

const sendName = (user, userId) => {
  console.log(user, userId);
  console.log(gameState.players[userId].userName);
  gameState.players[userId].userName = user;
};

const BigramList = [
  "ui",
  "car",
  "nc",
  "hip",
  "sta",
  "ipp",
  "bl",
  "nat",
  "gu",
  "in",
  "an",
  "tat",
  "tiv",
  "ani",
  "mpo",
  "ol",
  "hs",
  "ati",
  "on",
  "rs",
  "ui",
  "oll",
  "pol",
  "en",
  "nes",
  "gat",
  "met",
  "ng",
  "cho",
  "co",
  "str",
  "ind",
  "eno",
  "rti",
  "bur",
  "ri",
  "it",
  "ch",
  "ize",
  "nci",
  "ine",
  "br",
  "nes",
  "ntr",
  "ri",
  "bal",
  "nal",
  "mou",
  "be",
  "car",
  "te",
  "cus",
  "hen",
  "ti",
  "se",
  "or",
  "lo",
  "arg",
  "tot",
  "et",
  "nl",
  "me",
  "it",
  "ent",
  "ut",
  "xt",
  "mp",
  "es",
  "lip",
  "ve",
  "mor",
  "te",
  "cl",
  "an",
  "ise",
  "cul",
  "pl",
  "riz",
  "ist",
  "can",
  "th",
  "ein",
  "es",
  "te",
  "imm",
  "du",
  "ams",
  "to",
  "hr",
  "og",
  "ie",
  "co",
  "ot",
  "st",
  "end",
  "ett",
  "hin",
  "des",
  "ity",
  "cl",
  "win",
  "oc",
  "es",
  "sa",
  "ol",
  "hu",
  "ll",
  "on",
  "tom",
  "cul",
  "fi",
  "pr",
  "els",
  "nr",
  "gi",
  "te",
  "vic",
  "ess",
  "ing",
  "alc",
  "on",
  "ck",
  "ho",
  "er",
  "es",
  "le",
  "mm",
  "esc",
  "eve",
  "it",
  "rta",
  "od",
  "re",
  "ki",
  "se",
  "de",
  "li",
  "io",
  "art",
  "mon",
  "uf",
  "eas",
  "yp",
  "ked",
  "eno",
  "ch",
  "ro",
  "lli",
  "itp",
  "ce",
  "ose",
  "am",
  "be",
  "ra",
  "is",
  "ers",
  "ar",
  "lly",
];

module.exports = {
  gameState,
  spawnPlayer,
  removePlayer,
  serverTimer,
  serverTimer2,
  stopTimer,
  setBigram,
  updateGameState,
  bigramUI,
  setWordsList,
  resetList,
  checkPlayersGood,
  sendName,
};
