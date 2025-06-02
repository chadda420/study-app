import './CreateMode.css'
export default function CreateMode({question, setQuestion, answer, setAnswer, selectedDeck, setSelectedDeck, decks, setDecks}){
    function handleSubmit(e){
        e.preventDefault()
        const newCard = {question, answer}
        const updatedDecks = decks.map(deck => {
            if(deck.name === selectedDeck){
                return {...deck, 
                    cards:[...deck.cards, newCard]}
            }
            return deck
        })
        setDecks(updatedDecks)
    
        
        setQuestion('')
        setAnswer('')    
    
    }

    function clearDeck(e){
        const updatedDecks = decks.map(deck => {
            if(deck.name === selectedDeck){
                return {...deck, cards: []}
            }
            return deck
            
        })
        setDecks(updatedDecks)
    }

    function handleDeckSelection(e){
         const selected = decks.find(deck => deck.name === e.target.value);
         setSelectedDeck(selected)
    }

    return(
        <div className='cm-layout'>
        <header className='header'>Create mode: "mode" </header>
        <select name="deck-dropdown" id="deck-dropdown">
            <option value="" selected disabled>Select a deck</option>
            {decks.map((deck, idx) => {
                return <option key={deck.name} value={deck.name} onClick={handleDeckSelection}>{deck.name}</option>
            })}
        </select>


        <form onSubmit={handleSubmit} className='flashcard-form'>
        <div className="flashcard-container">
            <div className="flashcard-input">
                <input type="text" placeholder="Question"  id="question-input" value={question} onChange={(e)=> setQuestion(e.target.value)} />
                <textarea name="answer-field" id="answer-field" placeholder="Answer" value={answer} onChange={(e) => setAnswer(e.target.value)}>

                </textarea>
                
            </div>
            <button type='submit' id='submit-btn'>Submit</button>
            <button onClick={clearDeck}>clear deck</button>
        </div>
         </form>
        
        {/* <ul>
            {selectedDeck.map((card, i) => 
            
               card.question !== '' && card.answer !== '' 
            ? (
               <li key={i}><strong>Q:</strong> {card.question} <br /> 
                <strong>A: </strong>{card.answer}</li>) : null )}
            
        </ul> */}
        </div>
       
        
    )
}