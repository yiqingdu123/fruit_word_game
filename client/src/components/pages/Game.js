import React from "react";
import { Link } from "@reach/router";

const Game = (props) => {
  return (
    <div>
      <h1>Game</h1>
      <p>Here is the game.</p>
      <h1>
        <Link to="/">Back </Link>
      </h1>
    </div>
  );
};

export default Game;
