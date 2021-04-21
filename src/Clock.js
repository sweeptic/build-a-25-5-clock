import React, { useCallback, useEffect, useState } from 'react';

const Clock = ({ initialState }) => {
  const [breakLen, setBreakLen] = useState(initialState.break);
  const [sessionLen, setSessionLen] = useState(initialState.session);

  const [counter, setCounter] = useState(initialState.session);
  const [timerRef, setTimerRef] = useState();
  const [actualTimer, setActualTimer] = useState('');

  //modify counter when set session length
  useEffect(() => {
    setCounter(sessionLen);
  }, [sessionLen]);

  const startNewCounter = useCallback(
    ev => {
      setActualTimer(ev);
      clearInterval(timerRef);

      setTimerRef(
        setInterval(() => {
          setCounter(val => val - 1); // decrement counter
        }, 1000)
      );
    },
    [timerRef]
  );

  //if session end
  useEffect(() => {
    console.log(actualTimer);

    if (counter === 0) {
      if (actualTimer === 'break') {
        setCounter(sessionLen); //set the counter
        startNewCounter('session');
      } else {
        setCounter(breakLen); //set the counter
        startNewCounter('break');
      }
    }
  }, [counter, breakLen, actualTimer, sessionLen, startNewCounter]);

  const counterHandler = command => {
    switch (command) {
      case 'start': {
        startNewCounter('session');
        break;
      }
      case 'pause': {
        clearInterval(timerRef);
        setTimerRef(null);

        break;
      }

      default: {
        clearInterval(timerRef);
        setBreakLen(initialState.break);
        setSessionLen(initialState.session);
        setCounter(initialState.session);
        setTimerRef(null);
        setActualTimer('');
        break;
      }
    }
  };

  return (
    <div>
      <span>
        break: {breakLen},{' '}
        <button
          onClick={() => {
            if (!timerRef) setBreakLen(prev => prev + 1);
          }}>
          up
        </button>{' '}
        <button
          onClick={() => {
            if (!timerRef) setBreakLen(prev => (prev > 1 ? prev - 1 : prev));
          }}>
          down
        </button>
      </span>
      <br />
      <span>
        session: {sessionLen},{' '}
        <button
          onClick={() => {
            if (!timerRef) setSessionLen(prev => prev + 1);
          }}>
          up
        </button>{' '}
        <button
          onClick={() => {
            if (!timerRef) setSessionLen(prev => (prev > 1 ? prev - 1 : prev));
          }}>
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
          if (!timerRef) counterHandler('start');
        }}>
        play
      </button>
      <br />
      <button
        onClick={() => {
          if (timerRef) counterHandler('pause');
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
