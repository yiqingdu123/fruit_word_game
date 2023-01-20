import React from "react";
import { Link } from "@reach/router";

const HowToPlay = (props) => {
  return (
    <div>
      <h1>How to Play</h1>
      <p>git gud. </p>
      <p>this is pain.</p>
      <h1>
        <Link to="/">Back </Link>
      </h1>
    </div>
  );
};

export default HowToPlay;
