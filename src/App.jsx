import { useState } from 'react'
import Chatbot from './components/Chatbot/Chatbot';
import './App.css'
// import './index.css';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className="App">
        <h1>Chatbot de Reserva e Turismo - Maceió</h1>
        <Chatbot />
      </div>
    </>
  );
}

export default App
