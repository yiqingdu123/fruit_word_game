const gameState = {
  winner: null,
  players: {},
  playercount: 0,
  time: 7,
  bigram: "ui",
  playersGood: 0,
  wordsList: [],
  usedWordsList: [],
};

const spawnPlayer = (id) => {
  gameState.players[id] = {
    lives: 3,
    wordValid: "false",
  };
  gameState.playercount++;
};

const removePlayer = (id) => {
  if (gameState.players[id] != undefined) {
    delete gameState.players[id];
  }
  gameState.playercount--;
  if (gameState.playercount === 0) {
    bigramUI();
    stopTimer();
    resetList();
  }
};

let timerState = 0;

const serverTimer = () => {
  let remainingTime = 7;
  timerState = 0;
  const timerId = setInterval(() => {
    if (remainingTime === 0) {
      gameState.time = remainingTime;
      setBigram();
      console.log(gameState);
      remainingTime = 7;
    } else {
      gameState.time = remainingTime;
      remainingTime--;
      console.log(gameState);
    }
    if (timerState === 1) {
      gameState.time = 7;
      clearInterval(timerId);
    }
  }, 1000);
};

const stopTimer = () => {
  timerState = 1;
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
  console.log(gameState.wordsList);
  gameState.players[user].wordValid = "true";
  console.log(gameState.players);
  gameState.playersGood++;
  console.log("playersgood" + gameState.playersGood);
  console.log("playercount" + gameState.playercount);
};

const checkPlayersGood = () => {
  if (gameState.playersGood === gameState.playercount) {
    // Object.keys(gameState.players).forEach((element) => {
    //   gameState.players[element].wordValid = "false";
    // });
    for (const id in gameState.players) {
      gameState.players[id].wordValid = "false";
    }
    gameState.playersGood = 0;
    console.log(gameState.players);
  }
};

const resetList = () => {
  gameState.wordsList = [];
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
  stopTimer,
  setBigram,
  updateGameState,
  bigramUI,
  setWordsList,
  resetList,
};
