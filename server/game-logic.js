const gameState = {
  winner: null,
  players: {},
  time: 7,
};

const spawnPlayer = (id) => {
  gameState.players[id] = {
    lives: 3,
  };
};

const removePlayer = (id) => {
  if (gameState.players[id] != undefined) {
    delete gameState.players[id];
  }
};

let timerState = 0;

const serverTimer = () => {
  let remainingTime = 7;
  timerState = 0;
  const timerId = setInterval(() => {
    if (timerState === 1) {
      clearInterval(timerId);
      gameState.time = 7;
    }
    if (remainingTime === 0) {
      gameState.time = remainingTime;
      console.log(gameState);
      remainingTime = 7;
    } else {
      gameState.time = remainingTime;
      remainingTime--;
      console.log(gameState);
    }
  }, 1000);
};

const stopTimer = () => {
  timerState = 1;
};

module.exports = {
  gameState,
  spawnPlayer,
  removePlayer,
  serverTimer,
  stopTimer,
};
