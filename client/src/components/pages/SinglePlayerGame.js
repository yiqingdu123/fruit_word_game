import React, { useState, useEffect, useRef } from "react";
import { Link } from "@reach/router";
import SingleWord from "../modules/SingleWord.js";
import { NewWord } from "../modules/NewWordInput.js";
import { get, post } from "../../utilities";
import DeleteWords from "../modules/DeleteWords.js";
import { socket } from "../../client-socket.js";
import Timer from "../modules/Timer.js";
//import { drawCanvas } from "../../canvasManager";
//import { handleInput } from "../../input";

import "../../utilities.css";

/*

Code for adding new words is from Weblab Staff / Catbook-React

*/

const SinglePlayerGame = () => {
  const [words, setWords] = useState([]);

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

  const addNewWord = (wordsObj) => {
    const newWordsObj = (
      <SingleWord key={wordsObj._id} input_user={wordsObj.input_user} content={wordsObj.content} />
    );
    setWords([...words, newWordsObj]);
  };

  const clearList = () => {
    setWords([]);
    // post("/api/delete");
  };

  useEffect(() => {
    socket.on("update", (update) => {
      processUpdate(update);
    });
  }, []);

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
      <div>
        <DeleteWords handleSubmit={clearList} />
      </div>
      <h2>Timer</h2>
      <div>
        <Timer />
      </div>
    </div>
  );
};

export default SinglePlayerGame;
