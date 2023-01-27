const gameState = {
  winner: null,
  players: {},
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

module.exports = {
  gameState,
  spawnPlayer,
  removePlayer,
};
