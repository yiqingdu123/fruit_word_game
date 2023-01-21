import React, { useState, useEffect, useRef } from "react";
import { Link } from "@reach/router";
import SingleWord from "../modules/SingleWord.js";
import { NewWord } from "../modules/NewWordInput.js";
import { get, post } from "../../utilities";
//import { socket } from "../../client-socket.js";
//import { drawCanvas } from "../../canvasManager";
//import { handleInput } from "../../input";

import "../../utilities.css";

const Game = () => {
  const [words, setWords] = useState([]);

  useEffect(() => {
    get("/api/wordinput").then((wordsObjs) => {
      setWords(wordsObjs);
    });
  }, []);

  const addNewWord = (wordsObjs) => {
    setWords([wordsObjs].concat(words));
  };

  let wordsList = null;
  const hasWords = words.length !== 0;
  if (hasWords) {
    wordsList = words.map((wordsObjs) => (
      <SingleWord
        key={wordsObjs._id}
        input_user={wordsObjs.input_user}
        content={wordsObjs.content}
      />
    ));
  } else {
    wordsList = <div>No words!</div>;
  }

  return (
    <div>
      <h1>Game</h1>
      <p>Here is the game.</p>
      <h1>
        <Link to="/">Back </Link>
      </h1>
      <div>
        <NewWord addNewWord={addNewWord} />
        {wordsList}
      </div>
    </div>
  );
};

export default Game;
