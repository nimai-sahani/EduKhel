import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const MemoryGame = ({ onComplete }) => {
  const [cards, setCards] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedCards, setMatchedCards] = useState([]);
  const [moves, setMoves] = useState(0);
  const [gameComplete, setGameComplete] = useState(false);

  const symbols = ['🎮', '📚', '🧠', '⚡', '🏆', '🌟', '🎯', '🚀'];

  useEffect(() => {
    initializeGame();
  }, []);

  const initializeGame = () => {
    const gameCards = [...symbols, ...symbols]
      .sort(() => Math.random() - 0.5)
      .map((symbol, index) => ({
        id: index,
        symbol,
        isFlipped: false,
        isMatched: false
      }));
    
    setCards(gameCards);
    setFlippedCards([]);
    setMatchedCards([]);
    setMoves(0);
    setGameComplete(false);
  };

  const handleCardClick = (cardId) => {
    if (flippedCards.length >= 2 || flippedCards.includes(cardId) || matchedCards.includes(cardId)) {
      return;
    }

    const newFlippedCards = [...flippedCards, cardId];
    setFlippedCards(newFlippedCards);

    if (newFlippedCards.length === 2) {
      setMoves(moves + 1);
      
      const [firstCard, secondCard] = newFlippedCards;
      const firstSymbol = cards.find(card => card.id === firstCard)?.symbol;
      const secondSymbol = cards.find(card => card.id === secondCard)?.symbol;

      if (firstSymbol === secondSymbol) {
        setMatchedCards([...matchedCards, firstCard, secondCard]);
        setFlippedCards([]);
        
        if (matchedCards.length + 2 === cards.length) {
          setTimeout(() => setGameComplete(true), 500);
        }
      } else {
        setTimeout(() => {
          setFlippedCards([]);
        }, 1000);
      }
    }
  };

  const resetGame = () => {
    initializeGame();
  };

  if (gameComplete) {
    return (
      <motion.div 
        className="text-center p-8"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-4xl font-bold mb-4 text-yellow-400">🎉 Memory Master!</h2>
        <div className="text-6xl mb-4">🏆</div>
        <p className="text-2xl mb-4">Completed in {moves} moves!</p>
        <p className="text-xl mb-6">Excellent memory skills!</p>
        <div className="flex gap-4 justify-center">
          <motion.button
            onClick={resetGame}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Play Again
          </motion.button>
          <motion.button
            onClick={onComplete}
            className="px-6 py-3 bg-green-600 text-white rounded-lg font-bold hover:bg-green-700 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Back to Games
          </motion.button>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div 
      className="max-w-4xl mx-auto p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="text-center mb-6">
        <h3 className="text-3xl font-bold mb-2">Memory Game</h3>
        <p className="text-lg text-gray-300 mb-4">Find matching pairs of symbols!</p>
        <div className="bg-blue-600 px-6 py-2 rounded-lg inline-block">
          <span className="font-bold text-lg">Moves: {moves}</span>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-4 max-w-2xl mx-auto">
        {cards.map((card) => (
          <motion.div
            key={card.id}
            onClick={() => handleCardClick(card.id)}
            className={`aspect-square flex items-center justify-center text-4xl font-bold rounded-lg cursor-pointer transition-all duration-300 ${
              flippedCards.includes(card.id) || matchedCards.includes(card.id)
                ? 'bg-yellow-400 text-gray-900'
                : 'bg-blue-600 hover:bg-blue-500 text-white'
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            animate={{
              rotateY: flippedCards.includes(card.id) || matchedCards.includes(card.id) ? 0 : 180
            }}
            transition={{ duration: 0.6 }}
          >
            {flippedCards.includes(card.id) || matchedCards.includes(card.id) ? card.symbol : '?'}
          </motion.div>
        ))}
      </div>

      <div className="text-center mt-6">
        <motion.button
          onClick={resetGame}
          className="px-6 py-3 bg-gray-600 text-white rounded-lg font-bold hover:bg-gray-700 transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Reset Game
        </motion.button>
      </div>
    </motion.div>
  );
};

export default MemoryGame;
