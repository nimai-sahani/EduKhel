import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/Button";

function Sudoku() {
  const INITIAL_GRID = [
    [1, 0, 3, 4],
    [0, 3, 4, 0],
    [0, 4, 1, 0],
    [2, 1, 0, 3],
  ];

  const SUDOKU_SOLUTION = [
    [1, 2, 3, 4],
    [4, 3, 2, 1],
    [3, 4, 1, 2],
    [2, 1, 4, 3],
  ];

  const [grid, setGrid] = useState(INITIAL_GRID);
  const [showTutorial, setShowTutorial] = useState(true);
  const [gameResult, setGameResult] = useState(null); // "win" | "lose"
  const [showSolution, setShowSolution] = useState(false);
  const [rewardPoints, setRewardPoints] = useState(0);

  const handleChange = (row, col, value) => {
    if (INITIAL_GRID[row][col] !== 0) return; // Prevent editing fixed numbers
    const newGrid = [...grid.map((r) => [...r])];
    newGrid[row][col] = parseInt(value) || 0;
    setGrid(newGrid);
  };

  const checkSolution = () => {
    if (JSON.stringify(grid) === JSON.stringify(SUDOKU_SOLUTION)) {
      setGameResult("win");
      setRewardPoints((prev) => prev + 50);
    } else {
      setGameResult("lose");
      setShowSolution(true);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-indigo-900 to-purple-800 text-white p-6">
      <h1 className="text-4xl font-bold mb-6">🧩 Sudoku Challenge</h1>

      {/* Tutorial Modal */}
      <AnimatePresence>
        {showTutorial && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50"
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              className="bg-white text-black p-6 rounded-2xl shadow-xl max-w-md text-center"
            >
              <h2 className="text-2xl font-bold mb-3">Welcome to Sudoku!</h2>
              <p className="mb-4">
                Fill in the empty boxes with numbers (1–4). Each row & column
                must contain all numbers without repeating.
              </p>
              <Button onClick={() => setShowTutorial(false)}>Got it!</Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Sudoku Grid */}
      <div className="grid grid-cols-4 gap-2 mb-6">
        {grid.map((row, rIdx) =>
          row.map((num, cIdx) => (
            <input
              key={`${rIdx}-${cIdx}`}
              type="number"
              min="1"
              max="4"
              value={num === 0 ? "" : num}
              onChange={(e) => handleChange(rIdx, cIdx, e.target.value)}
              className={`w-14 h-14 text-center text-xl font-bold rounded-lg border-2 
                ${INITIAL_GRID[rIdx][cIdx] !== 0 ? "bg-gray-700 text-white" : "bg-white text-black"}
                focus:outline-none focus:ring-2 focus:ring-yellow-400`}
            />
          ))
        )}
      </div>

      <Button onClick={checkSolution} className="px-6 py-2 text-lg">
        ✅ Submit
      </Button>

      {/* Game Result */}
      <AnimatePresence>
        {gameResult === "win" && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ opacity: 0 }}
            className="mt-6 text-center"
          >
            <h2 className="text-2xl font-bold text-green-400">🎉 Correct!</h2>
            <p className="text-lg">You earned +50 points 🪙</p>
            <p className="mt-2">Total Rewards: {rewardPoints}</p>
          </motion.div>
        )}

        {gameResult === "lose" && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ opacity: 0 }}
            className="mt-6 text-center"
          >
            <h2 className="text-2xl font-bold text-red-400">❌ Wrong Answer</h2>
            <p className="text-lg">Here’s the correct solution 👇</p>

            {showSolution && (
              <div className="grid grid-cols-4 gap-2 mt-4">
                {SUDOKU_SOLUTION.map((row, rIdx) =>
                  row.map((num, cIdx) => (
                    <div
                      key={`${rIdx}-${cIdx}`}
                      className="w-14 h-14 flex items-center justify-center rounded-lg bg-green-200 text-black font-bold"
                    >
                      {num}
                    </div>
                  ))
                )}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default Sudoku;
