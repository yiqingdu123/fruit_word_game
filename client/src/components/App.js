import React, { useState, useEffect } from "react";
import { Router } from "@reach/router";
import jwt_decode from "jwt-decode";

import NotFound from "./pages/NotFound.js";
import Title from "./pages/Title.js";
import HowToPlay from "./pages/HowToPlay.js";
import SinglePlayerGame from "./pages/SinglePlayerGame.js";
import MultiPlayerGame from "./pages/MultiPlayerGame.js";
import Profile from "./pages/Profile.js";
import GameMenu from "./pages/GameMenu.js";
import Timer from "./modules/Timer.js";
import GameOver from "./pages/GameOver.js";
import MPGameTemp from "./pages/MPGameTemp.js";

import "../utilities.css";

import { socket } from "../client-socket.js";

import { get, post } from "../utilities";

//Favicon Icon made by Freepik from www.flaticon.com

const App = () => {
  const [userId, setUserId] = useState(undefined);

  useEffect(() => {
    get("/api/whoami").then((user) => {
      if (user._id) {
        // they are registed in the database, and currently logged in.
        setUserId(user._id);
      }
    });
  }, []);

  const handleLogin = (credentialResponse) => {
    const userToken = credentialResponse.credential;
    const decodedCredential = jwt_decode(userToken);
    console.log(`Logged in as ${decodedCredential.name}`);
    post("/api/login", { token: userToken }).then((user) => {
      setUserId(user._id);
      console.log("I logged in with socket ", socket.id);
      post("/api/initsocket", { socketid: socket.id });
    });
  };

  const handleLogout = () => {
    setUserId(undefined);
    post("/api/logout");
  };

  return (
    <>
      <Router>
        <Title path="/" handleLogin={handleLogin} handleLogout={handleLogout} userId={userId} />
        <HowToPlay path="/howtoplay/" userId={userId} />
        <Profile path="/profile/:userId" userId={userId} />
        <SinglePlayerGame path="/singleplayer/" userId={userId} />
        <MultiPlayerGame path="/multiplayer/" userId={userId} />
        <GameMenu path="/gamemenu/" userId={userId} />
        <Timer path="/timer/" userId={userId} />
        <GameOver path="/gameover/" userId={userId} />
        <MPGameTemp path="/mpgametemp/" userId={userId} />
        <NotFound default />
      </Router>
    </>
  );
};

export default App;
