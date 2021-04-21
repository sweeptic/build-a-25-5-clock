import './App.css';
import Clock from './Clock';

const initialState = { break: 5, session: 25 };

function App() {
  return (
    <div className='App'>
      <Clock initialState={initialState} />
    </div>
  );
}

export default App;
