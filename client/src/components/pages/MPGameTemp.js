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
import "../pages/Title.js";
import "../../utilities.css";
import { gameState } from "../../../../server/game-logic.js";

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
    console.log(props.userId);
    const newWordsObj = (
      <SingleWord key={wordObj._id} input_user={wordObj.input_user} content={wordObj.content} />
    );

    if (verifyWord(wordObj.content)) {
      // setWords([...words, newWordsObj]);
      // setWordsList([...wordsList, wordObj.content]);
      post("/api/setWordsList", { words: wordObj.content, user: props.userId }).then(() => {
        console.log(wordObj.content);
      });
      setHandleValid("");
      setScore(score + wordObj.content.length);
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
  };

  let [WordCount, setWordCount] = useState(0);

  let handleWordCount = () => {
    setReset(0);
  };

  const [reset, setReset] = useState(0);

  if (words.length === WordCount + 1) {
    setReset(1);
    setWordCount(WordCount + 1);
    console.log("wordcount" + WordCount);
    console.log("length" + words.length);
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
    get("/api/user", { userid: props.userId }).then((userObj) => setUser(userObj));
  }, []);

  useEffect(() => {
    if (user != undefined) {
      post("/api/joingame", { userid: props.userId }).then(() => {
        //console.log("user", user);
        //console.log(user.name);
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

  const [currentWords, setCurrentWords] = useState("");

  const [usernames, setUsernames] = useState("");

  // const [ID1, setID1] = useState("");
  // const [ID2, setID2] = useState("");
  // const [ID3, setID3] = useState("");
  // const [ID4, setID4] = useState("");
  // const [ID5, setID5] = useState("");

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

  const processUpdate = (update) => {
    for (const id in update.players) {
      if (update.players[id].playerID === 1 && i1 === 0) {
        //setID1(id);
        ID1 = id;
        i1++;
        //console.log(i1, "set");
      }
      if (update.players[id].playerID === 2 && i2 === 0) {
        ID2 = id;
        i2++;
      }
      if (update.players[id].playerID === 3 && i3 === 0) {
        ID3 = id;
        i3++;
      }
      if (update.players[id].playerID === 4 && i4 === 0) {
        ID4 = id;
        i4++;
      }
      if (update.players[id].playerID === 5 && i5 === 0) {
        ID5 = id;
        i5++;
      }
    }

    /////SET NAME AND WORD
    // console.log(ID1);
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
    setBigram(update.bigram);
    if (update.players[props.userId] != undefined) {
      setLives(update.players[props.userId].lives);
      setPlayerID(update.players[props.userId].playerID);
      setAlive(update.players[props.userId].alive);
      setCurrentWords(update.players[props.userId].currentWord);
      setUsernames(update.players[props.userId].userName);
      //console.log(update.players[props.userId].userName);
      //console.log(usernames);
      //console.log(currentWords);
    }
    setPlayercount(update.playercount);
    //console.log(names, currentWords);
  };

  useEffect(() => {
    console.log(word1);
  }, [word1]);
  useEffect(() => {
    console.log(name1);
  }, [name1]);

  let fruit2 = <div></div>;

  ///////////////////////////////////////////////////////////////////

  return (
    <div className="background">
      <h1 className="nomargin" style={{ visibility: "hidden" }}>
        Game
      </h1>
      <div>
        <br></br>
        <div className="wordlength">Words: {words.length}</div>
      </div>
      <div>
        <p className="score">Score: {score}</p>
      </div>
      <div className="wordContainer">
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
      <h1>{currentTime}</h1>
      <h1>Lives: {lives}</h1>
      <h1>Playercount: {playercount}</h1>
      <div>{name1}</div>
      <div>{word1}</div>
      <div>{name2}</div>
      <div>{word2}</div>
      <div>{name3}</div>
      <div>{word3}</div>
      <div>{name4}</div>
      <div>{word4}</div>
      <div>{name5}</div>
      <div>{word5}</div>
    </div>
  );
};

export default MPGameTemp;
