import React, { useState, useRef } from 'react';

const Clock = ({ initialState }) => {
  const [sessionLen, setSessionLen] = useState(initialState.session);
  const [breakLen, setBreakLen] = useState(initialState.break);
  const [counter, setCounter] = useState(initialState.session);
  const [breakTimer, setBreakTimer] = useState(false);
  const [timerRef, setTimerRef] = useState();

  let audioRef = useRef(null);

  React.useEffect(() => {
    setCounter(sessionLen);
  }, [sessionLen]);

  const startNewCounter = () => {
    let counter_ = counter;
    let breakTimer_ = breakTimer;
    clearInterval(timerRef);
    setTimerRef(
      setInterval(function () {
        counter_--; //closure
        if (counter_ >= 0) {
          setCounter(prev => {
            return prev - 1;
          });
        } else if (counter_ === -1) {
          audioRef.current.play();

          breakTimer_ = !breakTimer_;
          setBreakTimer(a => !a); //set UI
          if (breakTimer_) {
            setCounter(breakLen); //set UI
            counter_ = breakLen;
          } else if (!breakTimer) {
            setCounter(sessionLen); //set UI
            counter_ = sessionLen;
          }
        }
      }, 1000)
    );
  };

  const counterHandler = command => {
    switch (command) {
      case 'toggleCounter': {
        if (!timerRef) {
          startNewCounter();
        } else {
          clearInterval(timerRef);
          setTimerRef(null);
        }
        break;
      }

      case 'reset': {
        clearInterval(timerRef);
        setBreakLen(initialState.break);
        setSessionLen(initialState.session);
        setCounter(initialState.session);
        setTimerRef(null);
        setBreakTimer(false);
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
        break;
      }
      default:
    }
  };

  const getTime = sec => {
    return `${Math.floor(sec / 60) < 10 ? 0 : ''}${Math.floor(sec / 60)}:${
      sec % 60 < 10 && sec % 60 !== 0 ? 0 : ''
    }${sec % 60}${!(sec % 60) ? 0 : ''}`;
  };

  return (
    <div>
      <span id='break-label'>
        break:<span id='break-length'>{breakLen / 60}</span>
        <button
          id='break-increment'
          onClick={() => {
            if (!timerRef)
              setBreakLen(prev => (prev < 3600 ? prev + 60 : prev));
          }}>
          up
        </button>{' '}
        <button
          id='break-decrement'
          onClick={() => {
            if (!timerRef) setBreakLen(prev => (prev > 60 ? prev - 60 : prev));
          }}>
          down
        </button>
      </span>
      <br />
      <span id='session-label'>
        session:<span id='session-length'>{sessionLen / 60}</span>
        <button
          id='session-increment'
          onClick={() => {
            if (!timerRef)
              setSessionLen(prev => (prev < 3600 ? prev + 60 : prev));
          }}>
          up
        </button>{' '}
        <button
          id='session-decrement'
          onClick={() => {
            if (!timerRef)
              setSessionLen(prev => (prev > 60 ? prev - 60 : prev));
          }}>
          down
        </button>
      </span>
      <br />
      <br />
      <div id='timer-label'>{breakTimer ? 'Break' : 'Session'}</div>
      <br />
      <span id='time-left'>{getTime(counter)}</span>
      <br />
      <br />
      <div>
        <button
          id='start_stop'
          onClick={() => {
            counterHandler('toggleCounter');
          }}>
          start/stop
        </button>
        <br />
      </div>

      <button
        id='reset'
        onClick={() => {
          counterHandler('reset');
        }}>
        reset
      </button>
      <audio
        id='beep'
        preload='auto'
        ref={audioRef}
        src='https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav'
      />
    </div>
  );
};

export default Clock;
