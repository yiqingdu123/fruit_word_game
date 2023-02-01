import React, { useState, useEffect } from "react";
import { Link } from "@reach/router";
import { get } from "../../utilities";

import "./GameOver.css";
import "../../utilities.css";

const GameOver = (props) => {
  const [user, setUser] = useState();

  useEffect(() => {
    document.title = "GameOver";
    get("/api/user", { userid: props.userId }).then((userObj) => setUser(userObj));
  }, [user]);
  let page = null;
  if (!user) {
    return <div> bruh </div>;
  }
  if (props.userId) {
    let lastScore = user.scoreslistSP.slice(-1);
    page = (
      <div className="background">
        <div className="instruct-backbox">
          <h1 className="gameOver">GAME OVER</h1>
          <p className="instruct-type">SCORE: {lastScore}</p>
          <div className="back-button-area">
            <h2 className="playAgain">
              <Link to="/singleplayer">Play Again </Link>
            </h2>
            <h2 className="instruct-back-button">
              <Link to="/">Back to Menu </Link>
            </h2>
          </div>
        </div>
      </div>
    );
  }
  return <div>{page}</div>;
};

export default GameOver;
