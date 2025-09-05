import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Trophy, Gamepad2, BookOpen } from "lucide-react";
import Leaderboard from "./Leaderboard";

function Dashboard() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-black text-white px-6 py-10">
      {/* Hero Section */}
      <motion.h1
        className="text-5xl font-extrabold text-center mb-10"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        🚀 EduKhel Dashboard
      </motion.h1>

      {/* Quick Links */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-12">
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="bg-purple-800/60 p-6 rounded-2xl shadow-xl flex flex-col items-center"
        >
          <Gamepad2 size={40} className="mb-3 text-yellow-400" />
          <h2 className="text-xl font-semibold mb-2">Game Hub</h2>
          <p className="text-sm text-gray-300 mb-4">Play fun learning games.</p>
          <Link
            to="/gamehub"
            className="px-4 py-2 bg-yellow-400 text-black font-bold rounded-lg"
          >
            Play Now
          </Link>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.05 }}
          className="bg-indigo-800/60 p-6 rounded-2xl shadow-xl flex flex-col items-center"
        >
          <BookOpen size={40} className="mb-3 text-green-400" />
          <h2 className="text-xl font-semibold mb-2">Quiz</h2>
          <p className="text-sm text-gray-300 mb-4">Test your knowledge.</p>
          <Link
            to="/quiz"
            className="px-4 py-2 bg-green-400 text-black font-bold rounded-lg"
          >
            Start Quiz
          </Link>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.05 }}
          className="bg-pink-800/60 p-6 rounded-2xl shadow-xl flex flex-col items-center"
        >
          <Trophy size={40} className="mb-3 text-pink-300" />
          <h2 className="text-xl font-semibold mb-2">Leaderboard</h2>
          <p className="text-sm text-gray-300 mb-4">
            See top performers & ranks.
          </p>
          <a href="#leaderboard">
            <button className="px-4 py-2 bg-pink-400 text-black font-bold rounded-lg">
              View Leaderboard
            </button>
          </a>
        </motion.div>
      </div>

      {/* Leaderboard Section */}
      <section id="leaderboard" className="max-w-4xl mx-auto mt-16">
        <motion.h2
          className="text-3xl font-bold text-center mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          🏆 Top Players
        </motion.h2>
        <Leaderboard />
      </section>
    </div>
  );
}

export default Dashboard;
