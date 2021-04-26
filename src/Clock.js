import React, { useState, useRef } from 'react';
import style from './Clock.module.css';

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
    setTimerRef(
      setInterval(() => {
        counter_--; //closure
        if (counter_ >= 0) {
          setCounter(prev => {
            return prev - 1;
          });
        } else if (counter_ === -1) {
          audioRef.current.play();

          breakTimer_ = !breakTimer_;
          setBreakTimer(a => !a); //set the UI
          if (breakTimer_) {
            setCounter(breakLen); //set the UI
            counter_ = breakLen;
          } else if (!breakTimer) {
            setCounter(sessionLen); //set the UI
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
    // for easier readability
    const addZeroToMinute = Math.floor(sec / 60) < 10 ? 0 : '';
    const minute = Math.floor(sec / 60);
    const addZeroToSeconds = sec % 60 < 10 && sec % 60 !== 0 ? 0 : '';
    const Seconds = sec % 60;
    const startsFromZero = !(sec % 60) ? 0 : '';

    return `${addZeroToMinute}${minute}:${addZeroToSeconds}${Seconds}${startsFromZero}`;
  };

  return (
    <div className={style.container}>
      <span id='break-label'>
        <a
          // let classNames = classnames(styles.sideMenu, { [styles.active]: this.props.menuOpen });
          className={`${style.timerControl} fas fa-arrow-down`}
          id='break-decrement'
          onClick={() => {
            if (!timerRef) setBreakLen(prev => (prev > 60 ? prev - 60 : prev));
          }}></a>

        <span>Break: </span>
        <span id='break-length'>{breakLen / 60}</span>
        <span>min</span>

        <i
          className={`${style.timerControl} fas fa-arrow-up`}
          id='break-increment'
          onClick={() => {
            if (!timerRef)
              setBreakLen(prev => (prev < 3600 ? prev + 60 : prev));
          }}></i>
      </span>

      <span id='session-label'>
        <a
          className={`${style.timerControl} fas fa-arrow-down`}
          id='session-decrement'
          onClick={() => {
            if (!timerRef)
              setSessionLen(prev => (prev > 60 ? prev - 60 : prev));
          }}></a>
        <span>Session: </span>

        <span id='session-length'>{sessionLen / 60}</span>
        <span>min</span>
        <a
          className={`${style.timerControl} fas fa-arrow-up`}
          id='session-increment'
          onClick={() => {
            if (!timerRef)
              setSessionLen(prev => (prev < 3600 ? prev + 60 : prev));
          }}></a>
      </span>

      <div className={style.timer}>
        <div id='timer-label'>{breakTimer ? 'Break' : 'Session'}</div>

        <span className={style.timerLeft} id='time-left'>
          {getTime(counter)}
        </span>
      </div>

      <div className={style.timerControl}>
        <div>
          <a
            className='fas fa-play '
            id='start_stop'
            onClick={() => {
              counterHandler('toggleCounter');
            }}>
            <a class='fas fa-pause'></a>
          </a>
        </div>
        <a
          class='fas fa-step-backward'
          id='reset'
          onClick={() => {
            counterHandler('reset');
          }}></a>
      </div>

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
