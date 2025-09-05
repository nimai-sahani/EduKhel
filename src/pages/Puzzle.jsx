// src/pages/PuzzleSolver.jsx
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const generatePuzzle = () => {
  let arr = [1, 2, 3, 4, 5, 6, 7, 8, null];
  // shuffle
  return arr.sort(() => Math.random() - 0.5);
};

export default function PuzzleSolver() {
  const [tiles, setTiles] = useState(generatePuzzle());
  const [points, setPoints] = useState(0);
  const [showTutorial, setShowTutorial] = useState(true);
  const [gameOver, setGameOver] = useState(false);

  const moveTile = (index) => {
    const emptyIndex = tiles.indexOf(null);
    const validMoves = [emptyIndex - 1, emptyIndex + 1, emptyIndex - 3, emptyIndex + 3];
    if (validMoves.includes(index)) {
      const newTiles = [...tiles];
      [newTiles[index], newTiles[emptyIndex]] = [newTiles[emptyIndex], newTiles[index]];
      setTiles(newTiles);
    }
  };

  useEffect(() => {
    const isSolved = tiles.every((val, idx) => val === (idx < 8 ? idx + 1 : null));
    if (isSolved) {
      setPoints(points + 100);
      setGameOver(true);
    }
  }, [tiles]);

  const restart = () => {
    setTiles(generatePuzzle());
    setGameOver(false);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-pink-600 to-red-800 text-white p-6">
      <h1 className="text-3xl font-bold mb-4">🧩 Sliding Puzzle</h1>
      <p className="mb-4">Points: <span className="font-bold">{points}</span></p>

      {/* Tutorial Modal */}
      {showTutorial && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="bg-white text-black rounded-2xl p-6 w-80 text-center">
            <h2 className="text-xl font-bold mb-3">How to Play</h2>
            <p className="mb-4">
              Slide the numbered tiles into the empty space. Arrange them in order
              from 1 → 8 to win 🎉
            </p>
            <button
              onClick={() => setShowTutorial(false)}
              className="px-4 py-2 bg-pink-600 text-white rounded-lg"
            >
              Let's Go!
            </button>
          </div>
        </div>
      )}

      {/* Puzzle Grid */}
      <div className="grid grid-cols-3 gap-2 mb-6">
        {tiles.map((tile, index) => (
          <motion.div
            key={index}
            onClick={() => moveTile(index)}
            className={`w-20 h-20 flex items-center justify-center rounded-xl cursor-pointer
              ${tile ? "bg-white text-black" : "bg-gray-700"}`}
            whileTap={{ scale: 0.9 }}
          >
            {tile}
          </motion.div>
        ))}
      </div>

      {/* Restart Button */}
      <button
        onClick={restart}
        className="px-4 py-2 bg-yellow-400 text-black rounded-lg"
      >
        Restart
      </button>

      {/* Game Over Modal */}
      {gameOver && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="bg-white text-black rounded-2xl p-6 w-80 text-center">
            <h2 className="text-xl font-bold mb-3">🎉 Puzzle Solved!</h2>
            <p className="mb-4">+100 points added to your score.</p>
            <button
              onClick={restart}
              className="px-4 py-2 bg-green-500 text-white rounded-lg"
            >
              Play Again
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
