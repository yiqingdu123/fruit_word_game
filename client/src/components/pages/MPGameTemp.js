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
import { gameState } from "../../../../server/game-logic.js";

import "./SinglePlayerGame.css";
import "../pages/Title.js";
import "../../utilities.css";

/*

Code for adding new words is from Weblab Staff / Catbook-React

*/

const MPGameTemp = (props) => {
  const [words, setWords] = useState([]);
  const [inMasterList, setInMasterList] = useState(false);
  const [notRepeated, setNotRepeated] = useState(false);
  const [containsBigram, setContainsBigram] = useState(false);
  const [validWord, setValidWord] = useState(false);
  const [wordsList, setWordsList] = useState([]);

  const [bigram, setBigram] = useState("ui");

  const [user, setUser] = useState();

  useEffect(() => {
    document.title = "Profile Page";
    get("/api/user", { userid: props.userId }).then((userObj) => setUser(userObj));
  }, [props.userId]);

  useEffect(() => {
    // get("/api/words").then((wordsObjs) => {
    //   const hasWords = wordsObjs.length !== 0;
    //   if (hasWords) {
    //     setWords(
    //       wordsObjs.map((wordsObj) => (
    //         <SingleWord
    //           key={wordsObj._id}
    //           input_user={wordsObj.input_user}
    //           content={wordsObj.content}
    //         />
    //       ))
    //     );
    //   }
    //});
  }, []);

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

    if (verifyWord(wordObj.content)) {
      setWords([...words, newWordsObj]);
      setWordsList([...wordsList, wordObj.content]);
      setHandleValid("");
      setScore(score + wordObj.content.length);
      let randomBigram = BigramList[Math.floor(Math.random() * BigramList.length)];
      setBigram(randomBigram);
      setValidOpacity("hidden");
      setInitialApplePos("hidden");
    } else if (!verifyNotRepeated(wordObj.content)) {
      setHandleValid("Word Already Used");
      setValidOpacity("visible");
    } else {
      setHandleValid("Invalid Word");
      setValidOpacity("visible");
    }
  };

  const handleBigram = () => {
    let randomBigram = BigramList[Math.floor(Math.random() * BigramList.length)];
    setBigram(randomBigram);
  };

  const clearList = () => {
    setWords([]);
    WordCount = 1;
    // post("/api/delete");
  };

  useEffect(() => {
    socket.on("update", (update) => {
      processUpdate(update);
    });
  }, []);

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

  return (
    <div className="background">
      <h1 className="nomargin" style={{ visibility: "hidden" }}>
        Game
      </h1>
      {/* <p>Here is the single player game. CSS to be added.</p> */}
      <div>
        <br></br>
        <div className="wordlength">Words: {words.length}</div>
      </div>
      {/* <div>
        <DeleteWords handleSubmit={clearList} />
      </div> */}
      <div>
        <p className="score">Score: {score}</p>
        {/* <Timer
          reset={reset}
          handleWordCount={handleWordCount}
          bigram={bigram}
          handleBigram={handleBigram}
          score={score}
          userId={props.userId}
          initialApplePos={initialApplePos}
        /> */}
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
      <h1>{joinButton}</h1>
    </div>
  );
};

export default MPGameTemp;
