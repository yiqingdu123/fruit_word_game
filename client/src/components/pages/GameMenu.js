import React from "react";
import { Link } from "@reach/router";

import "../../utilities.css";
import "./GameMenu.css";
import "./Title.css";

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

        <a href="/singleplayer" className="button11">
          <div className="icons1">Single Player</div>
        </a>

        <a href="/multiplayer" className="button22">
          <div className="icons1">Multi Player</div>
        </a>

        <a href="/" className="button33">
          <div className="icons1">Menu</div>
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
