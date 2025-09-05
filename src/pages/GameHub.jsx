import { motion } from "framer-motion";
import GameCard from "../components/GameCard";

function GameHub() {
  const games = [
    { title: "Quiz Master", description: "Test your GK knowledge!", path: "/quiz", icon: "🧠" },
    { title: "Puzzle Solver", description: "Sharpen your mind!", path: "/puzzle", icon: "🧩" },
    { title: "Memory Flip", description: "Challenge your memory!", path: "/memory", icon: "🃏" },
    { title: "Sudoku", description: "Classic number challenge!", path: "/sudoku", icon: "🔢" },
  ];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-purple-700 to-indigo-900 text-white p-6">
      <motion.h1
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="text-4xl font-bold mb-4"
      >
        🎮 Game Hub
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="mb-6 text-lg text-gray-200"
      >
        Choose a game to start playing
      </motion.p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full max-w-2xl">
        {games.map((game, i) => (
          <motion.div
            key={i}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: i * 0.2 }}
          >
            <GameCard {...game} />
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default GameHub;
