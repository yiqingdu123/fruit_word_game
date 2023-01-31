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
            <p>Type a word in the input box that contains the given chunk of letters</p>
            <p>If you fail to input a valid word within 8 seconds, you will lose a life.</p>
            <p>You cannot use a word you have used before</p>
            <p>The game is over and the score is recorded after 3 lives are lost</p>
            <p>
              Disclaimer: The current list of 2-3 letter phrases is very short so repeats will occur
              often
            </p>
          </div>
          <div className="instruct-whitebox">
            <p className="instruct-type">Multiplayer Instructions</p>
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
