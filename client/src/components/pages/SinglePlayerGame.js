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
//import { drawCanvas } from "../../canvasManager";
//import { handleInput } from "../../input";

import "../../utilities.css";

/*

Code for adding new words is from Weblab Staff / Catbook-React

*/

const SinglePlayerGame = (props) => {
  const [words, setWords] = useState([]);
  const [inMasterList, setInMasterList] = useState(false);
  const [notRepeated, setNotRepeated] = useState(false);
  const [containsBigram, setContainsBigram] = useState(false);
  const [validWord, setValidWord] = useState(false);
  const [wordsList, setWordsList] = useState([]);

  const [bigram, setBigram] = useState("ui");

  useEffect(() => {
    // window.addEventListener("keydown", (event) => {
    //   if (event.key === "Enter") {
    //   }
    // });
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

  const verifyWord = (wordObj) => {
    const result =
      verifyWordInMasterList(wordObj) &&
      verifyNotRepeated(wordObj) &&
      verifyContainsBigram(wordObj);
    setValidWord(result);

    return result;
  };

  const addNewWord = (wordObj) => {
    const newWordsObj = (
      <SingleWord key={wordObj._id} input_user={wordObj.input_user} content={wordObj.content} />
    );
    //setWords([...words, newWordsObj]);

    if (verifyWord(wordObj.content)) {
      setWords([...words, newWordsObj]);
      setWordsList([...wordsList, wordObj.content]);
    }
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
  //const [resetTemp, setResetTemp] = useState(0);
  //let reset = 0;

  if (words.length === WordCount + 1) {
    setReset(1);
    //setResetTemp(1);
    setWordCount(WordCount + 1);
    console.log("wordcount" + WordCount);
    console.log("length" + words.length);
    //setReset(0);
    setTimeout(handleWordCount, 1);
  }
  // else if (words.length != WordCount && reset === 1) {
  //   //setResetTemp(0);
  //   //setTimeout(handleWordCount, 1000);
  //   setReset(0);
  //   console.log("no reset");
  // }

  return (
    <div>
      <h1>Game</h1>
      <p>Here is the single player game.</p>
      <h3>Input a word to begin!</h3>
      <div>
        <NewWord addNewWord={addNewWord} />
        <br></br>Number of Words Submitted: {words.length}
      </div>
      {/* <div>
        <DeleteWords handleSubmit={clearList} />
      </div> */}
      <h2>Timer</h2>
      <div>
        <Timer reset={reset} handleWordCount={handleWordCount} />
      </div>
      <h1>
        <Link to="/gamemenu">Back </Link>
      </h1>
      <div>Temporary Word List: {words}</div>
    </div>
  );
};

export default SinglePlayerGame;
