import React from "react";
import { Link } from "@reach/router";
import { GoogleOAuthProvider, GoogleLogin, googleLogout } from "@react-oauth/google";

import "../../utilities.css";
import "./Title.css";

//TODO: REPLACE WITH YOUR OWN CLIENT_ID
const GOOGLE_CLIENT_ID = "916377425501-fasr2q6tninefd92hna7hucorskncctc.apps.googleusercontent.com";

const Title = ({ userId, handleLogin, handleLogout }) => {
  return (
    <>
      <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
        {userId ? (
          <button
            onClick={() => {
              googleLogout();
              handleLogout();
            }}
          >
            Logout
          </button>
        ) : (
          <GoogleLogin onSuccess={handleLogin} onError={(err) => console.log(err)} />
        )}
        {/* <h1>Good luck on your project :)</h1>
        <a href="https://docs.google.com/document/d/110JdHAn3Wnp3_AyQLkqH2W8h5oby7OVsYIeHYSiUzRs/edit?usp=sharing">
          Check out this getting started guide HI
        </a> */}
      </GoogleOAuthProvider>
      <div class="fruit"> FRU&IT </div>
      <button class="button1">
        <div class="icons">
          <Link to="/gamemenu/">Play</Link>
        </div>
      </button>
      <button class="button2">
        <div class="icons">
          <Link to="/howtoplay/">How To Play</Link>
        </div>
      </button>
      <button class="button3">
        <div class="icons">
          <Link to="/profile/">Profile</Link>
        </div>
      </button>
    </>
  );
};

export default Title;
