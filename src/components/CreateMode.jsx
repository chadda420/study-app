import './CreateMode.css';
import axios from 'axios';

export default function CreateMode({
  question,
  setQuestion,
  answer,
  setAnswer,
  selectedDeck,
  setSelectedDeck,
  decks,
  setDecks,
  mode,
}) {
  async function handleSubmit(e) {
    e.preventDefault(); // prevents page reload of form submission

            if (!selectedDeck || !question.trim() || !answer.trim()) {
            alert('Please select a deck and fill in both fields.');
            return;
        }
        console.log("Selected Deck:", selectedDeck);
        try {
            console.log("Deck ID being submitted:", selectedDeck?._id);
            const res = await axios.post(`http://localhost:3001/api/decks/${selectedDeck._id}/cards`, {
                question,
                answer,
            });

            const updatedDeck = res.data;

            const updatedDecks = decks.map(deck =>
                deck._id === updatedDeck._id ? updatedDeck : deck
            );
            setDecks(updatedDecks);
            setQuestion('');
            setAnswer('');
        } catch (err) {
            console.error(err);
            alert('Error adding card: ' + err.message);
        }

//     const allCardIds = decks.flatMap(deck =>
//       deck.cards.map(card => card.id ?? 0)
//     );

//     const lastCardId = allCardIds.length ? Math.max(...allCardIds) : 0;
//     const newCardId = lastCardId + 1;

//     const newCard = { question, answer, id: newCardId };

//     const updatedDecks = decks.map(deck => {
//       if (deck.name === selectedDeck.name) {
//         return {
//           ...deck,
//           cards: [...deck.cards, newCard],
//         };
//       }
//       return deck;
//     });

//     setDecks(updatedDecks); // ^^ sets new card to designated deck via dropdown/in state and provides it an incrementing ID

//     setQuestion(''); // clears input fields
//     setAnswer('');
  }

  async function clearDeck(e) {
    e.preventDefault();

            if (!selectedDeck) return;

        try {
            const res = await axios.delete(`http://localhost:3001/decks/${selectedDeck._id}/cards/clear`);
            const updatedDeck = res.data;

            const updatedDecks = decks.map(deck =>
                deck._id === updatedDeck._id ? updatedDeck : deck
            );
            setDecks(updatedDecks);
        } catch (err) {
            console.error(err);
            alert('Error clearing deck: ' + err.message);
        }

//     const updatedDecks = decks.map(deck => {
//       if (deck.name === selectedDeck.name) {
//         return { ...deck, cards: [] };
//       }
//       return deck;
//     });

//     setDecks(updatedDecks);
  }

  function handleDeckSelection(e) {
    const selected = decks.find(deck => deck.name === e.target.value);
    setSelectedDeck(selected || '');
  }

  return (
    <div id="cm-layout">
      <header className="header">Current mode: {mode} </header>

      <label htmlFor="deck-dropdown" className="deckdd">Deck:</label>
      <select
        name="deck-dropdown"
        id="deck-dropdown"
        defaultValue={selectedDeck?.name || ''}
        onChange={handleDeckSelection}
      >
        <option value="" disabled>
          Select a deck
        </option>
        {decks.map(deck => (
          <option key={deck.name} value={deck.name}>
            {deck.name}
          </option>
        ))}
      </select>

      <form onSubmit={handleSubmit} className="flashcard-form">
        <div className="flashcard-container">
          <div className="flashcard-input">
            <input
              type="text"
              placeholder="Question"
              id="question-input"
              value={question}
              onChange={e => setQuestion(e.target.value)}
            />
            <textarea
              name="answer-field"
              id="answer-field"
              placeholder="Answer"
              value={answer}
              onChange={e => setAnswer(e.target.value)}
            />
          </div>

          <button className="clear-button" onClick={clearDeck}>
            Clear Deck
          </button>
          <button type="submit" id="submit-btn">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}