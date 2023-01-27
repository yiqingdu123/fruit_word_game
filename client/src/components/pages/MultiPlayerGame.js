import React from "react";
import { Link } from "@reach/router";
import { NewWord } from "../modules/NewWordInput.js";
import { get, post } from "../../utilities";

import "../pages/Title.js";
import "../../utilities.css";

const MultiPlayerGame = (props) => {
  // const names = [];

  // const updatingUsers = (lobbyObj) => {
  //   const lobs = { lobby: lobbyObj.content };
  //   get("/api/lobbyusers", lobs).then((usersObjs) => {
  //     console.log(usersObjs);
  //     for (let i = 0; i < usersObjs.length; i++) {
  //       names.push(usersObjs[i].name);
  //       console.log(usersObjs[i]);
  //     }
  //   });
  // };

  const addNewLobby = (lobbyObj) => {
    //console.log(props);
    const body = { id: props.userId, lobby: lobbyObj.content };
    post("/api/userlobbyupdate", body).then((res) => {
      //post("/api/lobbydbupdate", body);
    });
    //updatingUsers(lobbyObj);
    //console.log(names);
  };

  return (
    <div>
      <h1>Multi Player</h1>
      <div>
        Create/Join a Lobby: Users in Lobby:
        {/* {names} */}
        <NewWord addNewWord={addNewLobby} />
      </div>

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
