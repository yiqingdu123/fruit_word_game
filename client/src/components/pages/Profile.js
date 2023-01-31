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
    console.log(user);
  }, []);

  let page = null;
  if (!user) {
    return <div> Loading! </div>;
  }

  const changeProfilePic = () => {
    return <div></div>;
  };

  if (props.userId) {
    const spScore = user.scoreslistSP.map((score, i) => <li key={i}>{score}</li>);
    console.log(spScore);
    page = (
      <div className="background">
        <div className="backbox">
          <div className="userInfo">
            <h1>Profile</h1>
            <div className="profile-avatar"></div>
            <h3>{user.name}</h3>
          </div>
          <div className="user-scores">
            <h1>User Stats</h1>
            <div className="pinkbox">
              <div className="stat-display">
                <div className="label">Highest Singleplayer Score:</div>
                <div className="scores-num">{user.highscoreSP}</div>
              </div>
              <div className="stat-display">
                <div className="label">Highest Multiplayer Score:</div>
                <div className="scores-num">{user.highscoreMP}</div>
              </div>
              <div className="stat-display">
                <div className="label">Number of Wins in Multiplayer:</div>
                <div className="scores-num">{user.MPwins}</div>
              </div>

              <div className="scoreslist-box">
                <div className="scoreslist-text">
                  <div className="scoreslist-label">Singleplayer Scores</div>
                  <div className="scoreslist-list">17 {spScore}</div>
                </div>
                <div className="scoreslist-text">
                  <div className="scoreslist-label">Multiplayer Scores</div>
                  <div className="scoreslist-list">15 and {user.scoreslistMP}</div>
                </div>
              </div>
            </div>
            <div className="back-button-area">
              <h1 className="back-button">
                <Link to="/">Back </Link>
              </h1>
            </div>
          </div>
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
