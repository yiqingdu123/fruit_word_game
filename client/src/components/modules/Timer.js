import React, { useState, useRef, useEffect } from "react";
import { Link } from "@reach/router";
import { socket } from "../../client-socket.js";

/*

Code obtained from https://www.geeksforgeeks.org/how-to-create-a-countdown-timer-using-reactjs/

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
  const [timer, setTimer] = useState("00");

  const getTimeRemaining = (e) => {
    const total = Date.parse(e) - Date.parse(new Date());
    const seconds = Math.floor((total / 1000) % 60);
    return {
      total,
      seconds,
    };
  };

  const noTime = () => {
    console.log("fail");

    fails = fails + 1;
    clearTimer(getDeadTime());
  };

  const startTimer = (e) => {
    let { total, seconds } = getTimeRemaining(e);
    if (total >= 0) {
      setTimer(seconds > 9 ? seconds : "0" + seconds);
    }
    if (total === 0) {
      noTime();
    }
  };

  const clearTimer = (e) => {
    setTimer("08");

    if (Ref.current) clearInterval(Ref.current);
    const id = setInterval(() => {
      startTimer(e);
    }, 1000);
    Ref.current = id;
  };

  const getDeadTime = () => {
    let deadline = new Date();

    deadline.setSeconds(deadline.getSeconds() + 3);
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
    window.location.href = "/gameover";
  }

  return (
    <div>
      <h2>Time Left: {timer}</h2>
      <h2>Lives Lost: {fails}</h2>
      {/* <button onClick={onClickReset}>Start</button> */}
    </div>
  );
};

export default Timer;
