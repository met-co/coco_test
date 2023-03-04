import React, { useState, useEffect, useRef } from 'react';

function Timer() {
  const [seconds, setSeconds] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const intervalRef = useRef();

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      if (!isPaused) {
        setSeconds((seconds) => seconds + 1);
      }
    }, 1000);

    return () => clearInterval(intervalRef.current);
  }, [isPaused]);

  const handlePause = () => {
    setIsPaused((isPaused) => !isPaused);
  };

  return (
    <div>
      <h1>{seconds}초</h1>
      <button onClick={handlePause}>{isPaused ? '재개' : '일시정지'}</button>
    </div>
  );
}

export default Timer;
