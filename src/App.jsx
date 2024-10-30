import { useState } from 'react'
import ChatWindow from './components/ChatWindow'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className="App">
        <h1>Chatbot de Reserva e Turismo - Maceió</h1>
        <ChatWindow />
      </div>
    </>
  );
}

export default App
