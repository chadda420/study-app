
import {  useState } from 'react';
import './App.css';
import CreateMode from './components/CreateMode';
// import ScrollDecks from './components/ScrollDecks';

function App() {
  const [question, setQuestion] = useState('')
  const [answer, setAnswer] = useState('')
  const [selectedDeck, setSelectedDeck] = useState("")
  // const [deckIndex, setDeckIndex] = useState(0)
  const [decks, setDecks] = useState([
  { name: "Javascript", cards: [] },
  { name: "Spanish", cards: [] },
  { name: "React", cards: [] },
  { name: "HTML", cards: [] },
  { name: "CSS", cards: [] }
])
  return (
    <div className='app-layout'>
      {/* <ScrollDecks 
        deckIndex = {deckIndex}
        setDeckIndex = {setDeckIndex}
        decks ={decks} 
        setDecks={setDecks}
        /> */}
    <CreateMode
    selectedDeck={selectedDeck}
    setSelectedDeck={setSelectedDeck}
    decks={decks}
    setDecks={setDecks}
    answer={answer}
    setAnswer={setAnswer}
    question = {question}
    setQuestion={setQuestion}/>
    </div>
  );
}

export default App;
