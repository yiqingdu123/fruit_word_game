import React, { useState, useEffect } from "react";
import { Link } from "@reach/router";
import { get } from "../../utilities";

import "../../utilities.css";
import "./Profile.css";

const Profile = (props) => {
  let loginModal = null;
  const [user, setUser] = useState();

  useEffect(() => {
    document.title = "Profile Page";
    get("/api/user", { userid: props.userId }).then((userObj) => setUser(userObj));
  }, []);

  let page = null;
  if (!user) {
    return <div> Loading! </div>;
  }
  if (props.userId) {
    const spScore = user.scoreslistSP.map((score, i) => <li key={i}>{score}</li>);
    page = (
      <div className="background">
        <div className="backbox">
          <div className="userInfo">
            <h1>Profile</h1>
            <div className="profile-avatar"></div>
            <p>Name: {user.name}</p>
          </div>
          <div className="userScores">
            <p>Highest Singleplayer score: {user.highscoreSP}</p>
            <p>Highest Multiplayer score: {user.highscoreMP}</p>
            <p>Number of Wins in Multiplayer: {user.MPwins}</p>
            <p>Singleplayer Scores: {spScore}</p>
            <p>Multiplayer Scores: {user.scoreslistMP}</p>
          </div>
          <h1>
            <Link to="/">Back </Link>
          </h1>
        </div>
      </div>
    );
  }

  return (
    <div>
      {loginModal}
      {page}
    </div>
  );
};

export default Profile;
