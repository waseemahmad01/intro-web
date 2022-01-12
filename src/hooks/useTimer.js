import React, { useState, useEffect } from "react";

const useTimer = () => {
  const [started, setStarted] = useState(false);
  const [timer, setTimer] = useState(0);

  const start = () => {
    setStarted(true);
  };
  const stop = () => {
    setStarted(false);
  };
  useEffect(() => {
    let interval = null;
    if (started) {
      interval = setInterval(() => {
        setTimer((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [started]);
  return {
    start: start,
    stop: stop,
    time: timer,
  };
};

export default useTimer;
