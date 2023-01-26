import React, { useState, useRef, useEffect } from "react";
import { Link } from "@reach/router";
import { socket } from "../../client-socket.js";
import { BigramList } from "../modules/BigramList.js";
import { get, post } from "../../utilities";

import "../pages/SinglePlayerGame.css";
/*

Code modified from https://www.geeksforgeeks.org/how-to-create-a-countdown-timer-using-reactjs/

*/

let fails = 0;

const Timer = (props) => {
  const Ref = useRef(null);

  //   window.addEventListener("keydown", (event) => {
  //     if (event.key === "Enter") {
  //       if (words.length === WordCount) {
  //         clearTimer(getDeadTime());
  //         WordCount = WordCount + 1;
  //       }
  //     }
  //   });

  // The state for our timer
  const [timer, setTimer] = useState("0");

  const getTimeRemaining = (e) => {
    const total = Date.parse(e) - Date.parse(new Date());
    const seconds = Math.floor((total / 1000) % 60);
    return {
      total,
      seconds,
    };
  };

  const noTime = (props) => {
    console.log("fail");

    let randomBigram = BigramList[Math.floor(Math.random() * BigramList.length)];
    props.handleBigram();

    fails = fails + 1;
    clearTimer(getDeadTime());
    if (fails >= 1) {
      setHeart1("hidden");
    }

    if (fails >= 2) {
      setHeart2("hidden");
    }

    if (fails >= 3) {
      setHeart3("hidden");
    }
  };

  const startTimer = (e) => {
    let { total, seconds } = getTimeRemaining(e);
    if (total >= 0) {
      setTimer(seconds > 9 ? seconds : seconds);
    }
    if (total === 0) {
      noTime(props);
    }
  };

  const clearTimer = (e) => {
    setTimer("08");

    if (Ref.current) clearInterval(Ref.current);
    const id = setInterval(() => {
      startTimer(e);
    }, 1000);
    Ref.current = id;
    setPositionX(Math.floor(Math.random() * 1000) + 150 + "px");
  };

  const getDeadTime = () => {
    let deadline = new Date();

    deadline.setSeconds(deadline.getSeconds() + 8);
    return deadline;
  };

  const onClickReset = () => {
    clearTimer(getDeadTime());
    fails = 0;
  };

  //   const WordCount = 1;

  //   if (words.length === WordCount) {
  //     //clearTimer(getDeadTime());
  //     WordCount = WordCount + 1;
  //   }

  useEffect(() => {
    socket.on("update", (update) => {
      processUpdate(update);
    });
    //   clearTimer(getDeadTime());
    //   noTime();
    return () => {
      clearInterval(Ref.current);
      fails = 0;
    };
  }, []);

  useEffect(() => {
    if (props.reset === 1) {
      clearTimer(getDeadTime());
    }
  }, [props.reset]);

  console.log(props.reset);

  const [resetTemp, setResetTemp] = useState(0);

  let handleReset = () => {
    setResetTemp(0);
  };

  if (props.reset === 1 && setResetTemp === 0) {
    clearTimer(getDeadTime());
    setResetTemp(1);
    setTimeout(handleReset, 10);
  }

  if (fails >= 3) {
    console.log("game over");

    const body = { id: props.userId, score: props.score };
    console.log(body);
    post("/api/userupdateSP", body);
    window.location.href = "/gameover";
  }

  const [heart1, setHeart1] = useState("visible");
  const [heart2, setHeart2] = useState("visible");
  const [heart3, setHeart3] = useState("visible");

  const [positionX, setPositionX] = useState("669px");
  const [positionY, setPositionY] = useState("454px");

  const [fruitPositionX, setFruitPositionX] = useState("529px");
  const [fruitPositionY, setFruitPositionY] = useState("376px");

  return (
    <div>
      <h2>Time Left: {timer}</h2>
      <div className="heartContainer">Lives: </div>
      <div style={{ visibility: heart1 }} className="heart1" />
      <div style={{ visibility: heart2 }} className="heart2" />
      <div style={{ visibility: heart3 }} className="heart3" />
      {/* <button onClick={onClickReset}>Start</button> */}
      {/* <div className="initialApple" style={{ visibility: props.initialApplePos }} /> */}
      <div className="initialInstruction" style={{ visibility: props.initialApplePos }}>
        Input a word to begin!
      </div>
      <div className="apple" style={{ left: fruitPositionX, bottom: fruitPositionY }} />
      <div className="bigram" style={{ left: positionX, bottom: positionY }}>
        {props.bigram}
      </div>
    </div>
  );
};

export default Timer;
