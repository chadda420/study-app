import {useEffect, useState} from 'react'
import EditIcon from "./EditIcon"
import './EditDecks.css'
import DeleteIcon from "./DeleteIcon"


export default function EditDecks({ decks, setDecks, selectedDeck, setSelectedDeck, setCurrentCardIndex, currentCardIndex, setEditedCardIndex, editedCardIndex}){
    const [justSaved, setJustSaved] = useState(false);
    const [tempQuestion, setTempQuestion] = useState("");
    const [tempAnswer, setTempAnswer] = useState(""); 
    function handleDeckSelection(deck){  // click handler, passes in a deck
         setSelectedDeck(deck) // saves state of deck to the passed in deck
      
    }

    function handleDeleteDeck(deckToDelete){
        const updatedDecks = decks.filter(deck => deck.name !== deckToDelete.name ) // takes all decks that dont equal the selected deck to delete and updates them to everything but the deck to delete
        setDecks(updatedDecks) //^
        if(selectedDeck && selectedDeck.name === deckToDelete.name){
            setSelectedDeck(null)
            setEditedCardIndex(null)
            const currentIndex = editedCardIndex;
            setTimeout(() => setEditedCardIndex(currentIndex), 0);
        }

    }

    function handleSaveCard() {
  const updatedCards = [...selectedDeck.cards];
  updatedCards[editedCardIndex] = {
    ...updatedCards[editedCardIndex],
    question: tempQuestion,
    answer: tempAnswer,
  };

  const updatedDeck = { ...selectedDeck, cards: updatedCards };

  const updatedDecks = decks.map((deck) =>
    deck.name === selectedDeck.name ? updatedDeck : deck
  );

  setDecks(updatedDecks);
  setSelectedDeck(updatedDeck);
  setJustSaved(true);

  // Clear input fields
  setTempQuestion("");
  setTempAnswer("");
}

    useEffect(() => {
        if (justSaved) {
    // Reset flag and skip updating inputs this time
    setJustSaved(false);
    return;
  }

  if (selectedDeck?.cards?.[editedCardIndex]) {
    setTempQuestion(selectedDeck.cards[editedCardIndex].question || "");
    setTempAnswer(selectedDeck.cards[editedCardIndex].answer || "");
  }
}, [editedCardIndex, selectedDeck]);

    return (
    <>
    
    <h1 className="edit-header">
        {selectedDeck ? selectedDeck.name : "Select a deck to edit:"} 
    </h1>
            {!selectedDeck && (
            <div className='decks-layout'>
            
        {decks.map((deck) => {
            
            return (
                <>
               <div className='decks-wrapper' key={deck.name}>
                <div className="deck-box-edit"  onClick={() => handleDeckSelection(deck)}> 
                {deck.name}
                    <div className="edit-buttons">
                        <div onClick={(e) => {e.stopPropagation();
                                setSelectedDeck(deck)
                                setEditedCardIndex(0)
                 }}>
                    <EditIcon/>
                    </div>
                <div onClick={(e) => {e.stopPropagation();
                    handleDeleteDeck(deck)
                }}>
                    <DeleteIcon/>
                    </div>
                    </div>
                </div>
                </div>
                </>
            )
            })}
        </div>
           
)}
    {selectedDeck && selectedDeck.cards?.length > 0 && (
  <div className="card-id-row">
    {selectedDeck.cards.map((card, index) => (
      <button 
        key={card.id || index} 
        onClick={() => setEditedCardIndex(index)}
        className={editedCardIndex === index ? 'selected-card' : ""}
      >
        Card # {card.id || index}
      </button>
    ))}
  </div>
)}
 
       {selectedDeck?.cards?.[editedCardIndex] && (
  <div className="card-edit-form">
    <input
      type="text"
      value={tempQuestion}
      onChange={(e) => {
        setTempQuestion(e.target.value)
        // const updated = [...selectedDeck.cards];
        // updated[editedCardIndex].question = e.target.value;
        // const updatedDeck = { ...selectedDeck, cards: updated };
        // setSelectedDeck(updatedDeck);
      }}
    />
    <textarea
      value={tempAnswer}
      onChange={(e) => {
        setTempAnswer(e.target.value)
        // const updated = [...selectedDeck.cards];
        // updated[editedCardIndex].answer = e.target.value;
        // const updatedDeck = { ...selectedDeck, cards: updated };
        // setSelectedDeck(updatedDeck);
      }}
    />
    <button onClick={handleSaveCard
//   const updatedDecks = decks.map(deck =>
//     deck.name === selectedDeck.name ? selectedDeck : deck
//   );
//   setDecks(updatedDecks);

}>Save</button>
<div className="nav-buttons">
  <button onClick={() => setEditedCardIndex(i => Math.max(i - 1, 0))}>Previous</button>
  <button onClick={() => setEditedCardIndex(i => Math.min(i + 1, selectedDeck.cards.length - 1))}>Next</button>
</div>
  </div>
)}
    </>
    )
}