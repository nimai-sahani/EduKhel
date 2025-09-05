import { motion } from "framer-motion";

export default function MiniGameCard({ title, onStart }) {
  return (
    <motion.div
      className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black p-4 rounded-xl shadow-2xl cursor-pointer hover:scale-105 transition transform hover:rotate-1"
      whileHover={{ scale: 1.07, rotate: 1 }}
      onClick={onStart}
    >
      <h3 className="font-extrabold text-lg mb-1">{title}</h3>
      <p className="text-sm">Tap to play mini-game 🎮</p>
    </motion.div>
  );
}
