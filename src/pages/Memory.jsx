// src/pages/MemoryFlip.jsx
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const cardsArray = ["🐱", "🐶", "🐭", "🐹", "🐸", "🐼", "🦊", "🐻"];

function shuffle(array) {
  return [...array, ...array]
    .sort(() => Math.random() - 0.5)
    .map((card, index) => ({ id: index, card, flipped: false, matched: false }));
}

export default function MemoryFlip() {
  const [cards, setCards] = useState(shuffle(cardsArray));
  const [firstCard, setFirstCard] = useState(null);
  const [secondCard, setSecondCard] = useState(null);
  const [disabled, setDisabled] = useState(false);
  const [points, setPoints] = useState(0);
  const [showTutorial, setShowTutorial] = useState(true);
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    if (firstCard && secondCard) {
      setDisabled(true);
      if (firstCard.card === secondCard.card) {
        setCards(prev =>
          prev.map(c =>
            c.card === firstCard.card ? { ...c, matched: true } : c
          )
        );
        resetTurn();
      } else {
        setTimeout(() => {
          setCards(prev =>
            prev.map(c =>
              c.id === firstCard.id || c.id === secondCard.id
                ? { ...c, flipped: false }
                : c
            )
          );
          resetTurn();
        }, 1000);
      }
    }
  }, [firstCard, secondCard]);

  useEffect(() => {
    if (cards.every(card => card.matched)) {
      setPoints(points + 50);
      setGameOver(true);
    }
  }, [cards]);

  const handleFlip = (card) => {
    if (disabled || card.flipped || card.matched) return;
    setCards(prev =>
      prev.map(c => (c.id === card.id ? { ...c, flipped: true } : c))
    );
    if (!firstCard) setFirstCard(card);
    else setSecondCard(card);
  };

  const resetTurn = () => {
    setFirstCard(null);
    setSecondCard(null);
    setDisabled(false);
  };

  const restartGame = () => {
    setCards(shuffle(cardsArray));
    setFirstCard(null);
    setSecondCard(null);
    setDisabled(false);
    setGameOver(false);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-purple-700 to-indigo-900 text-white p-6">
      <h1 className="text-3xl font-bold mb-4">🃏 Memory Flip Game</h1>
      <p className="mb-4">Points: <span className="font-bold">{points}</span></p>

      {/* Tutorial Modal */}
      {showTutorial && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="bg-white text-black rounded-2xl p-6 w-80 text-center">
            <h2 className="text-xl font-bold mb-3">How to Play</h2>
            <p className="mb-4">Flip two cards at a time. If they match, they stay open. Match all pairs to win 🎉.</p>
            <button
              onClick={() => setShowTutorial(false)}
              className="px-4 py-2 bg-purple-600 text-white rounded-lg"
            >
              Got it!
            </button>
          </div>
        </div>
      )}

      {/* Cards Grid */}
      <div className="grid grid-cols-4 gap-3">
        {cards.map((card) => (
          <motion.div
            key={card.id}
            onClick={() => handleFlip(card)}
            className={`w-16 h-20 flex items-center justify-center rounded-xl cursor-pointer
              ${card.flipped || card.matched ? "bg-white text-black" : "bg-gray-700"}`}
            initial={{ rotateY: 0 }}
            animate={{ rotateY: card.flipped || card.matched ? 180 : 0 }}
            transition={{ duration: 0.5 }}
          >
            {(card.flipped || card.matched) && (
              <span className="text-2xl">{card.card}</span>
            )}
          </motion.div>
        ))}
      </div>

      {/* Game Over Modal */}
      {gameOver && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="bg-white text-black rounded-2xl p-6 w-80 text-center">
            <h2 className="text-xl font-bold mb-3">🎉 You Won!</h2>
            <p className="mb-4">+50 points added to your score.</p>
            <button
              onClick={restartGame}
              className="px-4 py-2 bg-green-500 text-white rounded-lg mr-2"
            >
              Play Again
            </button>
            <button
              onClick={() => setGameOver(false)}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
