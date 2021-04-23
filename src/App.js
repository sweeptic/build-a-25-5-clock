import './App.css';
import Clock from './Clock';

const initialState = { break: 300, session: 1500 };

function App() {
  return (
    <div className='App'>
      <Clock initialState={initialState} />
    </div>
  );
}

export default App;
