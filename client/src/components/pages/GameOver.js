import React from "react";
import { Link } from "@reach/router";

import "./GameOver.css";

const GameOver = (props) => {
  return (
    <div>
      <h1 className="gameOver">Game Over!</h1>
      <h2>
        <Link to="/singleplayer">Play Again </Link>
      </h2>
      <h2>
        <Link to="/">Back to Menu </Link>
      </h2>
    </div>
  );
};

export default GameOver;
