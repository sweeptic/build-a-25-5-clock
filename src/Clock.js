import React, { useEffect, useState } from 'react';

const Clock = ({ initialState }) => {
  const [breakLen, setBreakLen] = useState(initialState.break);
  const [sessionLen, setSessionLen] = useState(initialState.session);
  const [counter, setCounter] = useState(initialState.session);
  const [timerRef, setTimerRef] = useState();

  useEffect(() => {
    setCounter(sessionLen);
  }, [sessionLen]);

  const counterHandler = command => {
    switch (command) {
      case 'start': {
        setTimerRef(
          setInterval(() => {
            setCounter(val => val - 1);
          }, 1000)
        );
        break;
      }
      case 'pause': {
        clearInterval(timerRef);
        break;
      }

      default: {
        clearInterval(timerRef);
        setBreakLen(initialState.break);
        setSessionLen(initialState.session);
        break;
      }
    }
  };

  return (
    <div>
      <span>
        break: {breakLen},{' '}
        <button onClick={() => setBreakLen(prev => prev + 1)}>up</button>{' '}
        <button
          onClick={() => setBreakLen(prev => (prev > 1 ? prev - 1 : prev))}>
          down
        </button>
      </span>
      <br />
      <span>
        session: {sessionLen},{' '}
        <button onClick={() => setSessionLen(prev => prev + 1)}>up</button>{' '}
        <button
          onClick={() => setSessionLen(prev => (prev > 1 ? prev - 1 : prev))}>
          down
        </button>
      </span>
      <br />
      <br />
      <span>{counter}</span>
      <br />
      <br />
      <button
        onClick={() => {
          counterHandler('start');
        }}>
        play
      </button>
      <br />
      <button
        onClick={() => {
          counterHandler('pause');
        }}>
        pause
      </button>
      <br />
      <button
        onClick={() => {
          counterHandler();
        }}>
        reset
      </button>
    </div>
  );
};

export default Clock;
