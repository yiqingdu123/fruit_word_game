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
            class="buttonLogIn"
          >
            <div class="TextLogIn">Logout</div>
          </button>
        ) : (
          <GoogleLogin onSuccess={handleLogin} onError={(err) => console.log(err)} />
        )}
        {/* <h1>Good luck on your project :)</h1>
        <a href="https://docs.google.com/document/d/110JdHAn3Wnp3_AyQLkqH2W8h5oby7OVsYIeHYSiUzRs/edit?usp=sharing">
          Check out this getting started guide HI
        </a> */}
      </GoogleOAuthProvider>

      <div class="background"></div>

      <div class="fruit"> FRU&IT </div>

      <a href="gamemenu" class="button1">
        <div class="icons">Play</div>
      </a>

      <a href="howtoplay" class="button2">
        <div class="icons">How To Play</div>
      </a>

      <a href="profile" class="button3">
        <div class="icons">Profile</div>
      </a>
    </>
  );
};

export default Title;
