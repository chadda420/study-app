// import './ScrollDecks.css'

// export default function ScrollDecks({decks, deckIndex, setDeckIndex, selectedDeck, setSelectedDeck}){
//     return (
//         <div className="deck-sidebar">
//   {decks.slice(deckIndex, deckIndex + 3).map((deck, i) => (
//     <div
//       key={deck.name}
//       className={`deck-item ${selectedDeck === deckIndex + i ? 'selected' : ''}`}
//       onClick={() => setSelectedDeck(deckIndex + i)}
//     >
//       {deck.name}
//     </div>
//   ))}

//   {deckIndex + 3 < decks.length && (
//     <button onClick={() => setDeckIndex(prev => prev + 1)} className="arrow-button">↓</button>
//   )}
// </div>
//     )
// }