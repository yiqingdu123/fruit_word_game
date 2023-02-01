import React from "react";
import { Link } from "@reach/router";

import "../../utilities.css";
import "./HowToPlay.css";

const HowToPlay = (props) => {
  return (
    <div className="background">
      <div className="instruct-backbox">
        <h1>How to Play</h1>
        <div className="instruct-pinkbox">
          <div className="instruct-whitebox">
            <p className="instruct-type"> Singleplayer Instructions</p>
            <p>Type a word in the input box that contains the given chunk of letters.</p>
            <p>If you fail to input a valid word within 8 seconds, you will lose a life.</p>
            <p>You cannot use a word you have used before.</p>
            <p>The longer the word you input, the more points you get.</p>
            <p>The game is over and your score is recorded after 3 lives are lost.</p>
          </div>
          <div className="instruct-whitebox">
            <p className="instruct-type">Multiplayer Instructions</p>
            <p>
              The multiplayer game uses the same concept as the singleplayer, but up to 5 players
              may play at the same time.
            </p>
            <p>You have 5 lives instead of 3.</p>
            <p>You cannot use a word that any player has used before.</p>
            <p>The game ends when there is only one person left alive.</p>
          </div>
        </div>
        <div className="back-button-area">
          <h1 className="instruct-back-button">
            <Link to="/">Back </Link>
          </h1>
        </div>
      </div>
    </div>
  );
};

export default HowToPlay;
