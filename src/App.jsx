
import {  useState,useEffect } from 'react';
import './App.css';
import CreateMode from './components/CreateMode';
import Toolbar from './components/Toolbar';
import StudyMode from './components/StudyMode';
import CreateDecks from './components/CreateDecks';
import EditDecks from './components/EditDecks';
// import ScrollDecks from './components/ScrollDecks';

export default function App() {
  
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [mode, setMode] = useState("create")
  const [open, setOpen] = useState(false)
  const [question, setQuestion] = useState('')
  const [answer, setAnswer] = useState('')
  const [selectedDeck, setSelectedDeck] = useState(null)
  const [editedCardIndex, setEditedCardIndex] = useState(0)
  // const [deckIndex, setDeckIndex] = useState(0)
//   const [decks, setDecks] = useState([
//   {id: 1, name: "Javascript", cards: []},
//   {id: 2, name: "Spanish", cards: []},
//   {id: 3, name: "React", cards: []},
//   {id: 4, name: "HTML", cards: []},
//   {id: 5, name: "CSS", cards: []}
// ])
const [decks, setDecks] = useState([])


useEffect(() => {
  fetch('http://localhost:3001/api/decks')
    .then(res => res.json())
    .then(data => {
      console.log("Fetched decks:", data); // optional: for debugging
      setDecks(data); // update React state with fetched decks
    })
    .catch(err => {
      console.error("Failed to fetch decks:", err); // error handling
    });
}, []);


  return (
    <>
    <p style={{ color: 'white' }}>Current Mode: {mode}</p>
      <Toolbar
      open={open}
      setOpen={setOpen}
      setMode={setMode}
      setSelectedDeck={setSelectedDeck}
    />
    
    <div className='app-layout'>
      

        {mode === "create" && (
          <>
    <CreateMode
    selectedDeck={selectedDeck}
    setSelectedDeck={setSelectedDeck}
    decks={decks}
    setDecks={setDecks}
    answer={answer}
    setAnswer={setAnswer}
    question = {question}
    setQuestion={setQuestion}
    mode={mode}/>
   </>
        )}

      {mode === "study" && (
        
        <StudyMode 
        decks={decks}
        selectedDeck={selectedDeck}
        setSelectedDeck={setSelectedDeck}
        currentCardIndex={currentCardIndex}
        setCurrentCardIndex={setCurrentCardIndex}
        showAnswer={showAnswer}
        setShowAnswer={setShowAnswer}
        question={question}
        answer={answer}/>
   

      )}

      {mode === "create-decks" && (
        <CreateDecks
        decks={decks}
        setDecks={setDecks}
        />
      )}

      {mode === "edit-decks" && (
        <EditDecks 
        decks={decks}
        selectedDeck={selectedDeck}
        setSelectedDeck={setSelectedDeck}
        setDecks={setDecks}
        editedCardIndex={editedCardIndex}
        setEditedCardIndex={setEditedCardIndex}
       
        />
      )}
    
    </div>
    
   </>
  );
}



