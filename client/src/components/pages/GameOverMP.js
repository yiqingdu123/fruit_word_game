import React, { useState, useEffect } from "react";
import { Link } from "@reach/router";
import { get } from "../../utilities";

import "./GameOver.css";
import "../../utilities.css";

const GameOverMP = (props) => {
  const [user, setUser] = useState();

  useEffect(() => {
    document.title = "GameOverMP";
    get("/api/user", { userid: props.userId }).then((userObj) => setUser(userObj));
  }, []);
  let page = null;
  if (!user) {
    return <div> bruh </div>;
  }
  if (props.userId) {
    let lastScore = user.scoreslistMP.slice(-1);
    page = (
      <div className="background">
        <div className="instruct-backbox">
          <h1 className="gameOver">GAME OVER</h1>
          <p className="instruct-type">SCORE: {lastScore}</p>
          <div className="back-button-area">
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

export default GameOverMP;
