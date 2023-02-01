import React, { useEffect, useState } from "react";
import { Link } from "@reach/router";
import { NewWord } from "../modules/NewWordInput.js";
import { get, post } from "../../utilities";
import { socket } from "../../client-socket.js";

import "../pages/Title.js";
import "../../utilities.css";
import "./MultiPlayerGame.css";
import { navigate } from "@reach/router";

const MultiPlayerGame = (props) => {
  return (
    <div className="background">
      <div className="containerLobby">
        <div className="lobby">Multiplayer Lobby</div>
        <div className="info">Important Info: </div>
        <div>
          <p>
            Press the button below to join the multiplayer game. If there is already a game ongoing,
            please wait for it to finish.
          </p>
          <p>
            To start the game, wait until all players' names appear in-game, and then type a word
            containing "ui".
          </p>
          <p>Please note that a maximum of 5 players can play at once.</p>
          <p>Have fun!</p>
        </div>
      </div>

      <h1 className="back">
        <Link to="/gamemenu">Back</Link>
      </h1>
      <Link to="/mpgametemp" state={{ userId: props.userId }}>
        Join Game!
      </Link>
    </div>
  );
};

export default MultiPlayerGame;
