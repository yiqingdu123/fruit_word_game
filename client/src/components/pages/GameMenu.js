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
        <div className="background"></div>

        <div className="menu">GAME MENU</div>

        <a href="/singleplayer" className="button1">
          <div className="icons">Single Player</div>
        </a>

        <a href="/multiplayer" className="button2">
          <div className="icons">Multi Player</div>
        </a>

        <a href="/" className="button3">
          <div className="icons">Menu</div>
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
