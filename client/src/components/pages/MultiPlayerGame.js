import React from "react";
import { Link } from "@reach/router";

const MultiPlayerGame = (props) => {
  return (
    <div>
      <h1>Multi Player</h1>
      <p>Here is the multiplayer game.</p>
      <h1>
        <Link to="/gamemenu/">Back </Link>
      </h1>
    </div>
  );
};

export default MultiPlayerGame;
