import React from "react";
import { Link } from "@reach/router";

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
        <h1>Game Menu</h1>
        <h1>
          <Link to="/singleplayer/"> Single Player </Link>
        </h1>
        <h1>
          <Link to="/multiplayer/"> Multi Player </Link>
        </h1>
        <h1>
          <Link to="/"> Back to Menu </Link>
        </h1>
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
