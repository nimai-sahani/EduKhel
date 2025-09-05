import { motion } from "framer-motion";

const players = [
  { name: "Nimai", score: 95 },
  { name: "Aryan", score: 88 },
  { name: "Sanya", score: 82 },
  { name: "Ravi", score: 75 },
  { name: "Priya", score: 68 },
];

function Leaderboard() {
  return (
    <div className="bg-gray-800/60 p-6 rounded-2xl shadow-lg">
      {players.map((player, index) => (
        <motion.div
          key={index}
          className="flex justify-between items-center p-3 bg-gray-900/70 rounded-lg mb-3"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.2 }}
        >
          <span className="font-semibold">{index + 1}. {player.name}</span>
          <span className="text-yellow-400 font-bold">{player.score}</span>
        </motion.div>
      ))}
    </div>
  );
}

export default Leaderboard;
