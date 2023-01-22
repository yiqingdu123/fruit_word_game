import React, { useState, useRef, useEffect } from "react";
import { Link } from "@reach/router";

/*

Code obtained from https://www.geeksforgeeks.org/how-to-create-a-countdown-timer-using-reactjs/

*/

let fails = 0;

const Timer = () => {
  const Ref = useRef(null);

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

    deadline.setSeconds(deadline.getSeconds() + 8);
    return deadline;
  };

  const onClickReset = () => {
    clearTimer(getDeadTime());
    fails = 0;
  };

  //   useEffect(() => {
  //     clearTimer(getDeadTime());
  //     noTime();
  //   }, []);

  return (
    <div>
      <h2>{timer}</h2>
      <h2>{fails}</h2>
      <button onClick={onClickReset}>Reset</button>
    </div>
  );
};

export default Timer;
