import style from './App.module.css';
import Clock from './Clock';

const initialState = { break: 300, session: 1500 };

function App() {
  return (
    <div className={style.App}>
      <span className={style.header}>25 + 5 Clock</span>
      <Clock initialState={initialState} />
    </div>
  );
}

export default App;
