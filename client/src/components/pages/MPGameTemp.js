import React, { useState, useEffect, useRef } from "react";
import { Link } from "@reach/router";
import SingleWord from "../modules/SingleWord.js";
import { NewWord } from "../modules/NewWordInput.js";
import { get, post } from "../../utilities";
import DeleteWords from "../modules/DeleteWords.js";
import { socket } from "../../client-socket.js";
import Timer from "../modules/Timer.js";
import { MasterWordList } from "../modules/MasterWordList.js";
import { BigramList } from "../modules/BigramList.js";

import "./SinglePlayerGame.css";
import "./MPGame.css";
import "../pages/Title.js";
import "../../utilities.css";
//import { gameState } from "../../../../server/game-logic.js";

/*

Code for adding new words is from Weblab Staff / Catbook-React

*/

const MPGameTemp = (props) => {
  const [words, setWords] = useState([]);
  const [inMasterList, setInMasterList] = useState(false);
  const [notRepeated, setNotRepeated] = useState(false);
  const [containsBigram, setContainsBigram] = useState(false);
  const [validWord, setValidWord] = useState(false);
  const [wordsList, setWordsList] = useState(["hi"]);

  const [bigram, setBigram] = useState("ui");

  const verifyWordInMasterList = (wordObj) => {
    const result = MasterWordList.includes(wordObj);
    setInMasterList(result);
    return result;
  };

  const verifyNotRepeated = (wordsObj) => {
    const result = !wordsList.includes(wordsObj);
    setNotRepeated(result);
    return result;
  };

  const verifyContainsBigram = (wordsObj) => {
    const result = wordsObj.includes(bigram);
    setContainsBigram(result);
    return result;
  };

  const [handleValid, setHandleValid] = useState(" ");

  const verifyWord = (wordObj) => {
    const result =
      verifyWordInMasterList(wordObj) &&
      verifyNotRepeated(wordObj) &&
      verifyContainsBigram(wordObj);
    setValidWord(result);

    return result;
  };

  const [score, setScore] = useState(0);

  const [validOpacity, setValidOpacity] = useState("hidden");

  const addNewWord = (wordObj) => {
    const newWordsObj = (
      <SingleWord key={wordObj._id} input_user={wordObj.input_user} content={wordObj.content} />
    );
    if (wordEntered === "false") {
      if (verifyWord(wordObj.content)) {
        // setWords([...words, newWordsObj]);
        // setWordsList([...wordsList, wordObj.content]);
        post("/api/setWordsList", { words: wordObj.content, user: props.userId }).then(() => {
          console.log(wordObj.content);
        });
        setHandleValid("");
        setScore(score + wordObj.content.length);
        setWordEntered("true");
        // let randomBigram = BigramList[Math.floor(Math.random() * BigramList.length)];
        // setBigram(randomBigram);
        setValidOpacity("hidden");
      } else if (!verifyNotRepeated(wordObj.content)) {
        setHandleValid("Word Already Used");
        setValidOpacity("visible");
      } else {
        setHandleValid("Invalid Word");
        setValidOpacity("visible");
      }
    }
  };

  let [WordCount, setWordCount] = useState(0);

  let handleWordCount = () => {
    setReset(0);
  };

  const [reset, setReset] = useState(0);

  if (words.length === WordCount + 1) {
    setReset(1);
    setWordCount(WordCount + 1);
    setTimeout(handleWordCount, 1);
  }

  const [joinButtonVis, setJoinButtonVis] = useState("visible");

  ///////////////////////////////////////////////////////////////////
  //MULTIPLAYER STUFF
  ///////////////////////////////////////////////////////////////////

  let joinButton = (
    <div>
      <button
        style={{ visibility: joinButtonVis }}
        onClick={() => {
          post("/api/joingame", { userid: props.userId });
          setJoinButtonVis("hidden");
        }}
      >
        Join Game
      </button>
    </div>
  );

  // let startServerTimer = (
  //   <div>
  //     <button
  //       onClick={() => {
  //         post("/api/servertimer");
  //       }}
  //     >
  //       Start Timer
  //     </button>
  //   </div>
  // );

  // let stopServerTimer = (
  //   <div>
  //     <button
  //       onClick={() => {
  //         post("/api/stoptimer");
  //       }}
  //     >
  //       Stop Timer
  //     </button>
  //   </div>
  // );

  const [user, setUser] = useState();

  useEffect(() => {
    document.title = "Multiplayer";
    if (props.userId != undefined) {
      get("/api/user", { userid: props.userId }).then((userObj) => setUser(userObj));
    }
  }, []);

  // useEffect(() => {
  //   get("/api/whoami")
  //     .then((userObj) => setUser(userObj))
  //     .then(() => get("/api/user", { userid: user._id }).then((userObj) => setUser(userObj)));
  // }, []);

  // useEffect(() => {
  //   document.title = "Multiplayer";

  // }, []);

  useEffect(() => {
    if (user != undefined) {
      post("/api/joingame", { userid: props.userId }).then(() => {
        post("/api/sendName", { user: user.name, userId: props.userId });
      });
    }
  }, [user]);

  useEffect(() => {
    if (props.userId) {
      if (user != undefined) {
        socket.on("update", (update) => {
          processUpdate(update);
        });
      }

      return () => {
        post("/api/leavegame", { userid: props.userId });
        socket.off("update");
      };
    }
  }, [props.userId, user]);

  const [currentTime, setCurrentTime] = useState("");
  const [lives, setLives] = useState(5);
  const [playercount, setPlayercount] = useState(0);
  const [playerID, setPlayerID] = useState(0);
  const [alive, setAlive] = useState("true");
  const [gameStarted, setGameStarted] = useState("false");
  const [currentWords, setCurrentWords] = useState("");
  const [usernames, setUsernames] = useState("");

  const [word1, setWord1] = useState("");
  const [word2, setWord2] = useState("");
  const [word3, setWord3] = useState("");
  const [word4, setWord4] = useState("");
  const [word5, setWord5] = useState("");

  const [name1, setName1] = useState("");
  const [name2, setName2] = useState("");
  const [name3, setName3] = useState("");
  const [name4, setName4] = useState("");
  const [name5, setName5] = useState("");

  const [fruitVis1, setFruitVis1] = useState("hidden");
  const [fruitVis2, setFruitVis2] = useState("hidden");
  const [fruitVis3, setFruitVis3] = useState("hidden");
  const [fruitVis4, setFruitVis4] = useState("hidden");
  const [fruitVis5, setFruitVis5] = useState("hidden");

  let i1 = 0;
  let i2 = 0;
  let i3 = 0;
  let i4 = 0;
  let i5 = 0;

  let ID1 = "";
  let ID2 = "";
  let ID3 = "";
  let ID4 = "";
  let ID5 = "";

  let gameover = 0;

  //SOCKET UPDATES
  const processUpdate = (update) => {
    for (const id in update.players) {
      if (update.players[id].playerID >= 1 && i1 === 0) {
        ID1 = id;
        setFruitVis1("visible");
        i1++;
      }
      if (update.players[id].playerID >= 2 && i2 === 0) {
        ID2 = id;
        setFruitVis2("visible");
        i2++;
      }
      if (update.players[id].playerID >= 3 && i3 === 0) {
        ID3 = id;
        setFruitVis3("visible");
        i3++;
      }
      if (update.players[id].playerID >= 4 && i4 === 0) {
        ID4 = id;
        setFruitVis4("visible");
        i4++;
      }
      if (update.players[id].playerID >= 5 && i5 === 0) {
        ID5 = id;
        setFruitVis5("visible");
        i5++;
      }
    }

    /////SET NAME AND WORD

    if (ID1 != "") {
      if (update.players[ID1] != undefined) {
        setWord1(update.players[ID1].currentWord);
        setName1(update.players[ID1].userName);
      }
    }
    if (ID2 != "") {
      if (update.players[ID2] != undefined) {
        setWord2(update.players[ID2].currentWord);
        setName2(update.players[ID2].userName);
      }
    }
    if (ID3 != "") {
      if (update.players[ID3] != undefined) {
        setWord3(update.players[ID3].currentWord);
        setName3(update.players[ID3].userName);
      }
    }
    if (ID4 != "") {
      if (update.players[ID4] != undefined) {
        setWord4(update.players[ID4].currentWord);
        setName4(update.players[ID4].userName);
      }
    }
    if (ID5 != "") {
      if (update.players[ID5] != undefined) {
        setWord5(update.players[ID5].currentWord);
        setName5(update.players[ID5].userName);
      }
    }

    /////

    setCurrentTime(update.time);
    setWordsList(update.wordsList);
    setGameStarted(update.gameStarted);
    setBigram(update.bigram);
    setPlayercount(update.playercount);
    if (update.players[props.userId] != undefined) {
      setLives(update.players[props.userId].lives);
      setPlayerID(update.players[props.userId].playerID);
      setCurrentWords(update.players[props.userId].currentWord);
      setUsernames(update.players[props.userId].userName);
    }
    if (update.players[props.userId] === undefined && update.gameStarted === "true") {
      setAlive("false");
    }

    if (update.playercount === 1 && update.gameStarted === "true" && gameover === 0) {
      let link = "/profile/" + props.userId;
      window.location = link;
      gameover = 1;
    }
  };

  ////////////////////////////////////////////////////////

  const [inputVis, setInputVis] = useState("visible");

  //ON DEATH
  useEffect(() => {
    if (alive === "false") {
      setInputVis("hidden");
      setHeart1("hidden");
      setHeart2("hidden");
      setHeart3("hidden");
      setHeart4("hidden");
      setHeart5("hidden");
    }
  }, [alive]);

  const [heart1, setHeart1] = useState("visible");
  const [heart2, setHeart2] = useState("visible");
  const [heart3, setHeart3] = useState("visible");
  const [heart4, setHeart4] = useState("visible");
  const [heart5, setHeart5] = useState("visible");

  //MODIFY LIVES
  useEffect(() => {
    if (lives === 4) {
      setHeart5("hidden");
    }
    if (lives === 3) {
      setHeart4("hidden");
    }
    if (lives === 2) {
      setHeart1("hidden");
    }
    if (lives === 1) {
      setHeart2("hidden");
    }
  }, [lives]);

  //ON BIGRAM RESET

  const [wordEntered, setWordEntered] = useState("false");

  useEffect(() => {
    if (gameStarted === "true") {
      chooseFruit();
      if (name1 != "") {
        setFruitVis1("visible");
      }
      if (name2 != "") {
        setFruitVis2("visible");
      }
      if (name3 != "") {
        setFruitVis3("visible");
      }
      if (name4 != "") {
        setFruitVis4("visible");
      }
      if (name5 != "") {
        setFruitVis5("visible");
      }

      setWordEntered("false");
      setPositionY(778 + 70);
      setFruitPositionY(700 + 70);
      setSubPos(0);
    }
  }, [bigram]);

  //HIDE FRUIT WHEN WORD ENTERED
  useEffect(() => {
    setFruitVis1("hidden");
    console.log("word change");
  }, [word1]);
  useEffect(() => {
    setFruitVis2("hidden");
  }, [word2]);
  useEffect(() => {
    setFruitVis3("hidden");
  }, [word3]);
  useEffect(() => {
    setFruitVis4("hidden");
  }, [word4]);
  useEffect(() => {
    setFruitVis5("hidden");
  }, [word5]);

  //FRUIT FALL
  const [positionY, setPositionY] = useState(454);
  const [fruitPositionY, setFruitPositionY] = useState(376);

  let [subPos, setSubPos] = useState(1);

  useEffect(() => {
    if (lives > 0) {
      const interval = setInterval(() => {
        if (gameStarted === "true" && lives > 0 && alive === "true") {
          setPositionY(778 + 70 - subPos);
          setFruitPositionY(700 + 70 - subPos);
          setSubPos(subPos + 2.3);
        }
      }, 1000 / 60);
      return () => clearInterval(interval);
    }
  }, [subPos]);

  //RANDOM FRUIT
  const [fruitID, setFruitID] = useState("apple");
  const chooseFruit = () => {
    let randomFruit = Math.floor(Math.random() * 3);
    if (randomFruit === 0) {
      setFruitID("apple");
    }
    if (randomFruit === 1) {
      setFruitID("orange");
    }
    if (randomFruit === 2) {
      setFruitID("peach");
    }
  };

  ///////////////////////////////////////////////////////////////////

  return (
    <div className="background">
      <h1 className="nomargin" style={{ visibility: "hidden" }}>
        Game
      </h1>
      <div>
        <p className="score">Score: {score}</p>
      </div>
      <div className="wordContainer" style={{ visibility: inputVis }}>
        <div className="invalidWord" style={{ visibility: validOpacity }}>
          {handleValid}
        </div>
        <NewWord addNewWord={addNewWord} />
      </div>

      <h1>
        <Link to="/gamemenu" className="quit">
          Quit Game
        </Link>
      </h1>
      {/* <h1>{joinButton}</h1> */}
      {/* <h1>{startServerTimer}</h1>
      <h1>{stopServerTimer}</h1> */}
      <h1>{bigram}</h1>
      <h1 className="timerMP">{currentTime}</h1>
      {/* <h1>Lives: {lives}</h1> */}
      <h1>Playercount: {playercount}</h1>
      <div className="container1">
        <div className="name">{name1}</div>
        <div className="word">{word1}</div>
      </div>
      <div className="container2">
        <div className="name">{name2}</div>
        <div className="word">{word2}</div>
      </div>
      <div className="container3">
        <div className="name">{name3}</div>
        <div className="word">{word3}</div>
      </div>
      <div className="container4">
        <div className="name">{name4}</div>
        <div className="word">{word4}</div>
      </div>
      <div className="container5">
        <div className="name">{name5}</div>
        <div className="word">{word5}</div>
      </div>

      <div className="heartContainerMP">Lives: </div>
      <div style={{ visibility: heart1 }} className="heart1" />
      <div style={{ visibility: heart2 }} className="heart2" />
      <div style={{ visibility: heart3 }} className="heart3" />
      <div style={{ visibility: heart4 }} className="heart4" />
      <div style={{ visibility: heart5 }} className="heart5" />

      <div
        className={fruitID}
        style={{
          left: "50%",
          bottom: fruitPositionY + "px",
          transform: "translateX(-189px)",
          visibility: fruitVis1,
        }}
      />
      <div
        className="bigram"
        style={{
          left: "50%",
          bottom: positionY + "px",
          transform: "translateX(-49px)",
          visibility: fruitVis1,
        }}
      >
        {bigram}
      </div>
      <div
        className={fruitID}
        style={{
          left: "35%",
          bottom: fruitPositionY + "px",
          transform: "translateX(-189px)",
          visibility: fruitVis2,
        }}
      />
      <div
        className="bigram"
        style={{
          left: "35%",
          bottom: positionY + "px",
          transform: "translateX(-49px)",
          visibility: fruitVis2,
        }}
      >
        {bigram}
      </div>
      <div
        className={fruitID}
        style={{
          left: "65%",
          bottom: fruitPositionY + "px",
          transform: "translateX(-189px)",
          visibility: fruitVis3,
        }}
      />
      <div
        className="bigram"
        style={{
          left: "65%",
          bottom: positionY + "px",
          transform: "translateX(-49px)",
          visibility: fruitVis3,
        }}
      >
        {bigram}
      </div>
      <div
        className={fruitID}
        style={{
          left: "20%",
          bottom: fruitPositionY + "px",
          transform: "translateX(-189px)",
          visibility: fruitVis4,
        }}
      />
      <div
        className="bigram"
        style={{
          left: "20%",
          bottom: positionY + "px",
          transform: "translateX(-49px)",
          visibility: fruitVis4,
        }}
      >
        {bigram}
      </div>
      <div
        className={fruitID}
        style={{
          left: "80%",
          bottom: fruitPositionY + "px",
          transform: "translateX(-189px)",
          visibility: fruitVis5,
        }}
      />
      <div
        className="bigram"
        style={{
          left: "80%",
          bottom: positionY + "px",
          transform: "translateX(-49px)",
          visibility: fruitVis5,
        }}
      >
        {bigram}
      </div>
    </div>
  );
};

export default MPGameTemp;
