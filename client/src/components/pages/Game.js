import React, { useState, useEffect, useRef } from "react";
//import { socket } from "../../client-socket.js";
//import { get, post } from "../../utilities";
//import { drawCanvas } from "../../canvasManager";
//import { handleInput } from "../../input";
import { Link } from "@reach/router";

import "../../utilities.css";

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
