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

// const Clock = () => {
//   const [time, setTime] = useState(8);
//   useEffect(() => {
//     const timer = setInterval(() => {
//       setTime((oldTime) => oldTime - 1);
//     }, 1000);
//     return () => clearInterval(timer);
//   }, []);
//   return <>Time: {time}</>;
// };

const SinglePlayerGame = (props) => {
  const [words, setWords] = useState([]);
  // const [inMasterList, setInMasterList] = useState(false);
  // const [notRepeated, setNotRepeated] = useState(false);
  // const [containsBigram, setContainsBigram] = useState(false);
  // const [validWord, setValidWord] = useState(false);

  // const bigram = "";

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

  // const verifyWordInMasterList = (wordObj) => {
  //   setInMasterList(MasterWordList.includes(wordObj));
  //   return inMasterList;
  // };

  // function verifyNotRepeated(wordsObj) {
  //   const wordList = words.map((word) => word.content);

  //   setNotRepeated(wordList.includes(wordsObj));
  //   return notRepeated;
  // }

  // const verifyContainsBigram = (wordsObj) => {
  //   setContainsBigram(wordsObj.includes(bigram));
  //   return containsBigram;
  // };

  // const verifyWord = (wordObj) => {
  //   setValidWord(
  //     verifyWordInMasterList(wordObj) && verifyNotRepeated(wordObj) && verifyContainsBigram(wordObj)
  //   );

  //   return validWord;
  // };

  const addNewWord = (wordObj) => {
    const newWordsObj = (
      <SingleWord key={wordObj._id} input_user={wordObj.input_user} content={wordObj.content} />
    );
    setWords([...words, newWordsObj]);

    // if (verifyWord(wordObj.content)) {
    //   setWords([...words, newWordsObj]);
    // }
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

  const WordCount = 1;

  // if (words.length === WordCount) {
  //   clearTimer(getDeadTime());
  //   WordCount = WordCount + 1;
  // }

  return (
    <div>
      <h1>Game</h1>
      <p>Here is the single player game.</p>
      <h1>
        <Link to="/gamemenu/">Back </Link>
      </h1>
      <div>
        <NewWord addNewWord={addNewWord} />
        {words}
        {words.length}
      </div>
      {/* <div>
        <DeleteWords handleSubmit={clearList} />
      </div> */}
      <h2>Timer</h2>
      <div>
        <Timer />
      </div>
      {/* <div>
        <Clock />
      </div> */}
    </div>
  );
};

export default SinglePlayerGame;
