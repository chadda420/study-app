
import './StudyMode.css';

export default function StudyMode({
  decks,
  selectedDeck,
  showAnswer,
  setShowAnswer,
  currentCardIndex,
  setCurrentCardIndex,
  setSelectedDeck,
  answer,
  question,
}) {
  function handleDeckSelection(deck) {
    setSelectedDeck(deck);
    setCurrentCardIndex(0);
    setShowAnswer(false);
  }

  const hasCards = selectedDeck?.cards?.length > 0;
  const currentCard = selectedDeck?.cards?.[currentCardIndex];

  return (
    <>
      <h1 className="study-header">
        {selectedDeck ? selectedDeck.name : "Choose a deck:"}
      </h1>

      {selectedDeck && (
        <div className="card-display">
          {hasCards ? (
            <>
              <h2 className="question-text">Question: </h2>
              <h3 className="id-text">Card #: {currentCard.id}</h3>
              <p>{currentCard?.question}</p>

              {showAnswer ? (
                <>
                  <h3>Answer:</h3>
                  <p>{currentCard?.answer}</p>

                  <div className="nav-buttons">
                    <button
                      onClick={() => {
                        setCurrentCardIndex(i => Math.max(i - 1, 0));
                        setShowAnswer(false);
                      }}
                    >
                      Previous
                    </button>
                    <button
                      onClick={() => {
                        setCurrentCardIndex(i =>
                          Math.min(i + 1, selectedDeck.cards.length - 1)
                        );
                        setShowAnswer(false);
                      }}
                    >
                      Next
                    </button>
                  </div>
                </>
              ) : (
                <button onClick={() => setShowAnswer(true)}>Show Answer</button>
              )}
            </>
          ) : (
            <p>This deck has no cards yet.</p>
          )}
        </div>
      )}

      {!selectedDeck && (
        <div className="decks-layout">
          {decks.map(deck => (
            <div
              className="deck-box"
              key={deck.name}
              onClick={() => handleDeckSelection(deck)}
            >
              {deck.name}
            </div>
          ))}
        </div>
      )}
    </>
  );
}