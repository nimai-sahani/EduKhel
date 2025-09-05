import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Particles from "react-tsparticles"; // for particle background
import { loadFull } from "tsparticles";

function Home() {
  const particlesInit = async (main) => {
    await loadFull(main);
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-black text-white overflow-hidden">
      {/* Particle Background */}
      <Particles
        id="tsparticles"
        init={particlesInit}
        options={{
          background: { color: "transparent" },
          particles: {
            number: { value: 60 },
            size: { value: 3 },
            move: { enable: true, speed: 1 },
            opacity: { value: 0.7 },
            links: { enable: true, color: "#a78bfa" },
          },
        }}
        className="absolute inset-0"
      />

      {/* Floating Emojis */}
      <motion.div
        className="absolute top-24 left-16 text-6xl"
        animate={{ y: [0, -20, 0] }}
        transition={{ repeat: Infinity, duration: 3 }}
      >
        📖
      </motion.div>
      <motion.div
        className="absolute bottom-32 right-20 text-6xl"
        animate={{ y: [0, 25, 0] }}
        transition={{ repeat: Infinity, duration: 4 }}
      >
        🎮
      </motion.div>
      <motion.div
        className="absolute top-40 right-1/4 text-6xl"
        animate={{ y: [0, -15, 0] }}
        transition={{ repeat: Infinity, duration: 2.5 }}
      >
        🎓
      </motion.div>

      {/* Hero Section */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen text-center px-4">
        <motion.h1
          className="text-6xl md:text-8xl font-extrabold bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-500 bg-clip-text text-transparent drop-shadow-lg"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
        >
          EduKhel
        </motion.h1>

        <motion.p
          className="mt-6 text-lg md:text-2xl text-gray-300 max-w-2xl"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          Where <span className="text-pink-400 font-bold">Education</span> meets{" "}
          <span className="text-purple-400 font-bold">Gaming</span> 🎮✨
        </motion.p>

        {/* Buttons */}
        <motion.div
          className="mt-10 flex gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
        >
          <Link to="/learning">
            <motion.button
              whileHover={{ scale: 1.1, boxShadow: "0px 0px 20px #f59e0b" }}
              className="px-6 py-3 bg-yellow-500 text-black rounded-2xl font-semibold text-lg shadow-lg"
            >
              Start Learning 📘
            </motion.button>
          </Link>

          <Link to="/gamehub">
            <motion.button
              whileHover={{ scale: 1.1, boxShadow: "0px 0px 20px #8b5cf6" }}
              className="px-6 py-3 bg-purple-600 rounded-2xl font-semibold text-lg shadow-lg"
            >
              Play Now 🎮
            </motion.button>
          </Link>
        </motion.div>
      </div>

      {/* Info Section */}
      <motion.div
        className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-6 p-10 mt-10"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={{
          hidden: { opacity: 0, y: 50 },
          visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
        }}
      >
        <div className="p-6 bg-purple-800 bg-opacity-50 rounded-2xl shadow-lg hover:scale-105 transition">
          <h3 className="text-xl font-bold mb-2">📘 Learn Smarter</h3>
          <p className="text-gray-300">
            Fun quizzes & challenges that make learning addictive.
          </p>
        </div>
        <div className="p-6 bg-indigo-800 bg-opacity-50 rounded-2xl shadow-lg hover:scale-105 transition">
          <h3 className="text-xl font-bold mb-2">🎮 Play Harder</h3>
          <p className="text-gray-300">
            Interactive games that boost your knowledge & skills.
          </p>
        </div>
        <div className="p-6 bg-pink-800 bg-opacity-50 rounded-2xl shadow-lg hover:scale-105 transition">
          <h3 className="text-xl font-bold mb-2">🏆 Compete & Win</h3>
          <p className="text-gray-300">
            Climb the leaderboard & earn rewards as you learn!
          </p>
        </div>
      </motion.div>
    </div>
  );
}

export default Home;
