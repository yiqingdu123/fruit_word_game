import React, { useEffect, useState } from "react";
import { Link } from "@reach/router";
import { NewWord } from "../modules/NewWordInput.js";
import { get, post } from "../../utilities";
import { socket } from "../../client-socket.js";

import "../pages/Title.js";
import "../../utilities.css";

const MultiPlayerGame = (props) => {
  const [names, setNames] = useState([]);

  const updatingUsers = (lobbyObj) => {
    const lobs = { lobby: lobbyObj.content };
    console.log(lobs);
    get("/api/lobbyusers", lobs).then((usersObjs) => {
      console.log(usersObjs);

      setNames(usersObjs.map((x) => x.name));
    });
  };

  const addNewLobby = (lobbyObj) => {
    //console.log(props);
    const body = { id: props.userId, lobby: lobbyObj.content };
    post("/api/userlobbyupdate", body).then(() => {
      console.log("user lobby update worked");
      updatingUsers(lobbyObj);
    });

    //console.log(names);
  };

  useEffect(() => {
    const callback = (data) => {
      const lobbyObj = { content: data };
      updatingUsers(lobbyObj);
    };
    socket.on("newLobby", callback);
    return () => {
      socket.off("newLobby", callback);
    };
  });

  const addReady = () => {
    const query = { id: props.userId };
    get("/api/userlobby", query).then((user) => {
      const body = { lobby: user.lobby };
      console.log("userlobby works");
      post("/api/ready", body);
    });
  };

  const removeReady = () => {
    const query = { id: props.userId };
    get("/api/userlobby", query).then((user) => {
      const body = { lobby: user.lobby };
      post("/api/unready", body);
    });
  };

  const [readyButtonVis, setReadyButtonVis] = useState("visible");
  const [unReadyButtonVis, setUnReadyButtonVis] = useState("hidden");

  return (
    <div>
      <h1>Multi Player</h1>
      <div>
        Create/Join a Lobby: Users in Lobby:
        {names}
        <NewWord addNewWord={addNewLobby} />
      </div>

      <button
        style={{ visibility: readyButtonVis }}
        onClick={() => {
          addReady();
          setReadyButtonVis("hidden");
          setUnReadyButtonVis("visible");
        }}
      >
        {" "}
        Ready{" "}
      </button>
      <button
        style={{ visibility: unReadyButtonVis }}
        onClick={() => {
          removeReady();
          setReadyButtonVis("visible");
          setUnReadyButtonVis("hidden");
        }}
      >
        {" "}
        Unready{" "}
      </button>
      <h1>
        <Link to="/gamemenu">Back </Link>
      </h1>
      <h1>
        <Link to="/mpgametemp">temp </Link>
      </h1>
    </div>
  );
};

export default MultiPlayerGame;
