import React from "react";
import { Link } from "@reach/router";
import { GoogleOAuthProvider, GoogleLogin, googleLogout } from "@react-oauth/google";

import "../../utilities.css";
import "./Title.css";

//TODO: REPLACE WITH YOUR OWN CLIENT_ID
const GOOGLE_CLIENT_ID = "916377425501-fasr2q6tninefd92hna7hucorskncctc.apps.googleusercontent.com";

const Title = ({ userId, handleLogin, handleLogout }) => {
  return (
    <div className="background">
      <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
        {userId ? (
          <button
            onClick={() => {
              googleLogout();
              handleLogout();
            }}
            className="buttonLogIn"
          >
            <div className="TextLogIn">Logout</div>
          </button>
        ) : (
          <GoogleLogin onSuccess={handleLogin} onError={(err) => console.log(err)} />
        )}
        {/* <h1>Good luck on your project :)</h1>
        <a href="https://docs.google.com/document/d/110JdHAn3Wnp3_AyQLkqH2W8h5oby7OVsYIeHYSiUzRs/edit?usp=sharing">
          Check out this getting started guide HI
        </a> */}
      </GoogleOAuthProvider>

      <div className="fruit"> FRU&IT </div>

      <a href="/gamemenu" className="button1">
        <div className="icons">Play</div>
      </a>

      <a href="/howtoplay" className="button2">
        <div className="icons">How To Play</div>
      </a>

      {userId && (
        <div className="icons">
          <Link to={`/profile/${userId}`} className="button3">
            Profile
          </Link>
        </div>
      )}
    </div>
  );
};

export default Title;
