import {useState} from 'react'
import axios from 'axios'

export default function CreateDecks({decks, setDecks}){
    const [deckName, setDeckName] = useState("")

    async function handleSubmit(e){
        e.preventDefault()
        if(deckName.trim() === ""){
            alert('Deck name cannot be empty!')
            return
        }
        
        try{
            const res = await axios.post('http://localhost:3001/api/decks', {
                name: deckName
            })
            const newDeck = res.data
            setDecks(prev => [...prev, newDeck])
            setDeckName("")

        } 
            catch(err){
                console.error('Error creating deck:', err)
                alert('Failed to create deck')
            }
        }


    //      const nextId =
    //     decks.length > 0
    //         ? Math.max(...decks.map(deck => deck.id ?? 0)) + 1
    //         : 1; 

    //     const newDeck = {
    //         id: nextId,
    //         name: deckName,
    //         cards: []
    //     }

    //     setDecks(prevDecks => [...decks, newDeck])
    //     setDeckName("")

    // }




       return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="new-deck">New Deck</label>
            <input
                type="text"
                className="new-deck-input"
                id="new-deck"
                value={deckName}
                onChange={(e) => setDeckName(e.target.value)}
            />
            <button type="submit">Submit</button>
        </form>
    );
}

