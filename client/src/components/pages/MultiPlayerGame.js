import React, { useEffect, useState } from "react";
import { Link } from "@reach/router";
import { NewWord } from "../modules/NewWordInput.js";
import { get, post } from "../../utilities";
import { socket } from "../../client-socket.js";

import "../pages/Title.js";
import "../../utilities.css";
import "./MultiPlayerGame.css";
import { navigate } from "@reach/router";

const MultiPlayerGame = (props) => {
  const [names, setNames] = useState([]);
  const [lobbyName, setLobbyName] = useState("");

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
    //setLobbyName(lobbyObj.content);
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
      // post("/api/deleteuserlobby", { id: props.userId });
    };
  }, []);

  const addReady = () => {
    const query = { id: props.userId };
    console.log("api 1", query);
    get("/api/userlobby", query).then((user) => {
      const body = { lobby: user.lobby };
      console.log("userlobby works");
      post("/api/ready", body);
    });
  };

  const removeReady = () => {
    const query = { id: props.userId };
    console.log("api 2", query);
    get("/api/userlobby", query).then((user) => {
      const body = { lobby: user.lobby };
      post("/api/unready", body);
    });
  };

  const [readyButtonVis, setReadyButtonVis] = useState("visible");
  const [unReadyButtonVis, setUnReadyButtonVis] = useState("hidden");
  const [readyPlayers, setReadyPlayers] = useState(0);
  const [userNum, setUserNum] = useState(0);

  const checkReadyPlayers = () => {
    console.log("entered checkReadyPlayers");

    const query = { id: props.userId };
    console.log("api 3", query);
    get("/api/userlobby", query).then((user) => {
      console.log("user.lobby: ", user.lobby);
      setLobbyName(user.lobby);

      get("/api/lobbyusers", { lobby: user.lobby }).then((usersObjs) => {
        setUserNum(usersObjs.length);
        console.log("The user num is " + usersObjs.length);
        get("/api/numberusersready", { lobby: user.lobby }).then((numReady) => {
          setReadyPlayers(numReady.value);
          console.log("The num ready is " + numReady.value);

          if (usersObjs.length == numReady.value && usersObjs.length > 1) {
            console.log("help i am literally sobbing bro");
            post("/api/deleteuserlobby", { id: props.userId }).then(() => {
              navigate("/mpgametemp");
            });
            // window.location.href = "/mpgametemp";
          }
        });
      });
    });
  };

  useEffect(() => {
    const callback = () => {
      setReadyButtonVis("visible");
      setUnReadyButtonVis("hidden");
    };
    socket.on("userLeft", callback);
    return () => {
      socket.off("userLeft", callback);
    };
  }, []);
  /*
  useEffect(() => {
    console.log("")
    get("/api/lobbyusers", { lobby: lobbyName }).then((usersObjs) => {
      setUserNum(usersObjs.length);
      console.log("The user num is " + userNum);
    });

    get("/api/numberusersready", { lobby: lobbyName }).then((numReady) => {
      setReadyPlayers(numReady);
      console.log("The num ready is " + numReady);
    });
  }, [lobbyName]);
  
  useEffect(() => {
    if (userNum == readyPlayers && userNum > 0) {
      post("/api/deleteuserlobby", { id: props.userId }).then(() => {
        navigate("/mpgametemp");
      });
      // window.location.href = "/mpgametemp";
    }
  }, [readyPlayers, userNum]);
  */

  useEffect(() => {
    socket.on("userReadied", checkReadyPlayers);
    socket.on("userUnreadied", checkReadyPlayers);
    return () => {
      socket.off("userReadied", checkReadyPlayers);
      socket.off("userUnreadied", checkReadyPlayers);
      if (props.userId) {
        setReadyButtonVis("visible");
        setUnReadyButtonVis("hidden");
        post("/api/deleteuserlobby", { id: props.userId });
      }
    };
  }, [props.userId]);

  //checkReadyPlayers();

  return (
    <div className="background">
      <div className="containerLobby">
        <div className="joinLobby">Create/Join Party:</div>
        <div className="usersInLobby">Users in Party:</div>
        <ol className="names">
          {names.map((name) => (
            <li key={name}>{name}</li>
          ))}
        </ol>
      </div>

      <div>
        <NewWord addNewWord={addNewLobby} />
      </div>
      <div className="containerLobby">
        <button
          className="buttonReady"
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
          className="buttonReady"
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
      </div>

      <h1 className="back">
        <Link to="/gamemenu">Back</Link>
      </h1>
      {/* <Link to="/mpgametemp" state={{ userId: props.userId }}>
          aldkfjalkfdjakldfjalkjflkjkljtemp
        </Link> */}
    </div>
  );
};

export default MultiPlayerGame;
