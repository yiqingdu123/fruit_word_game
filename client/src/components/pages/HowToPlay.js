import React from "react";
import { Link } from "@reach/router";

const HowToPlay = (props) => {
  return (
    <div>
      <h1>How to Play</h1>
      <p>Temporary instructions for MVP (only singleplayer has been implemented): </p>
      <p>Type a word in the input box that contains the given letters somewhere in the word </p>
      <p>You lose a life after failing to type a word for 8 seconds</p>
      <p>You cannot use a word you have used before</p>
      <p>The game is over and score recorded after 3 lives are lost</p>
      <p>
        Disclaimer: The current list of 2-3 letter phrases is very short so repeats will occur often
      </p>
      <h1>
        <Link to="/">Back </Link>
      </h1>
    </div>
  );
};

export default HowToPlay;
