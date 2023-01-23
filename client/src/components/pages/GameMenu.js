import React from "react";
import { Link } from "@reach/router";

import "../../utilities.css";
import "./GameMenu.css";

const GameMenu = (props) => {
  let loginModal = null;
  if (!props.userId) {
    loginModal = (
      <div>
        <h2>Please Login First!</h2>
        <h1>
          <Link to="/">Back </Link>
        </h1>
      </div>
    );
  }
  let page = null;
  if (props.userId) {
    page = (
      <div>
        <div class="background"></div>

        <div class="menu">GAME MENU</div>

        <a href="/singleplayer" class="button1">
          <div class="icons">Single Player</div>
        </a>

        <a href="/multiplayer" class="button2">
          <div class="icons">Multi Player</div>
        </a>

        <a href="/" class="button3">
          <div class="icons">Menu</div>
        </a>

        {/* <h1>Game Menu</h1>
        <h1>
          <Link to="/singleplayer/"> Single Player </Link>
        </h1>
        <h1>
          <Link to="/multiplayer/"> Multi Player </Link>
        </h1>
        <h1>
          <Link to="/"> Back to Menu </Link>
        </h1> */}
      </div>
    );
  }

  return (
    <div>
      {loginModal}
      {page}
    </div>
  );
};

export default GameMenu;
