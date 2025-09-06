import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import * as Tone from "tone";
import MathQuiz from "../components/games/MathQuiz";
import MemoryGame from "../components/games/MemoryGame";
import WordPuzzle from "../components/games/WordPuzzle";
import TriviaQuiz from "../components/games/TriviaQuiz";

// Gamified header (level + points)
const GamifiedHeader = () => (
  <div className="relative z-20 flex justify-center pt-8">
    <motion.div
      className="bg-gray-800/70 backdrop-blur-md p-4 rounded-2xl shadow-lg flex gap-6 text-sm md:text-base"
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.5 }}
    >
      <div className="flex items-center gap-2 text-yellow-300">
        <span className="font-bold">Level:</span>
        <span>1</span>
      </div>
      <div className="flex items-center gap-2 text-purple-300">
        <span className="font-bold">Points:</span>
        <span>250</span>
      </div>
    </motion.div>
  </div>
);

// Individual game page
const GamePage = ({ game, onGoBack }) => {
  const [isParticlesLoaded, setIsParticlesLoaded] = useState(false);
  const [isAudioStarted, setIsAudioStarted] = useState(false);

  useEffect(() => {
    const particlesScript = document.createElement("script");
    particlesScript.src =
      "https://cdn.jsdelivr.net/npm/tsparticles@2.12.0/tsparticles.bundle.min.js";
    particlesScript.onload = () => {
      window.tsParticles.load({
        id: "tsparticles",
        options: {
          background: { color: "transparent" },
          particles: {
            number: { value: 70 },
            size: { value: 3 },
            move: { enable: true, speed: 2 },
            opacity: { value: 0.7 },
            links: { enable: true, color: "#60a5fa", distance: 150, opacity: 0.5 },
          },
          interactivity: { events: { onHover: { enable: true, mode: "grab" } } },
        },
      }).then(() => setIsParticlesLoaded(true));
    };
    document.head.appendChild(particlesScript);
  }, []);

  const startAudio = async () => {
    if (!isAudioStarted) {
      try {
        await Tone.start();
        setIsAudioStarted(true);
      } catch (error) {
        console.error("Failed to start audio context:", error);
      }
    }
  };

  const renderGame = () => {
    switch (game.id) {
      case 1: // Math Quiz
        return <MathQuiz onComplete={onGoBack} />;
      case 2: // Memory Game
        return <MemoryGame onComplete={onGoBack} />;
      case 3: // Word Puzzle
        return <WordPuzzle onComplete={onGoBack} />;
      case 4: // Trivia Quiz
        return <TriviaQuiz onComplete={onGoBack} />;
      default:
        return (
          <div className="text-center p-8">
            <h2 className="text-2xl font-bold mb-4">Game Coming Soon!</h2>
            <p className="text-gray-400 mb-6">This game is under development.</p>
            <motion.button
              onClick={onGoBack}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Back to Games
            </motion.button>
          </div>
        );
    }
  };

  return (
    <div
      className="relative min-h-screen bg-gradient-to-br from-gray-900 via-indigo-900 to-blue-900 text-white font-sans overflow-hidden"
      onClick={startAudio}
    >
      <div
        id="tsparticles"
        className="absolute inset-0 z-0"
        style={{ opacity: isParticlesLoaded ? 1 : 0, transition: "opacity 1s" }}
      ></div>
      <div className="relative z-10 p-6 flex flex-col items-center justify-center min-h-screen">
        <button
          onClick={onGoBack}
          className="absolute top-8 left-8 px-5 py-2 bg-gray-800/70 hover:bg-gray-700 text-white rounded-full font-semibold z-30 shadow-lg transition-transform hover:scale-105"
        >
          ⬅ Back to Games
        </button>

        <motion.div
          className="w-full max-w-6xl bg-gradient-to-tr from-gray-800 via-gray-900 to-black rounded-3xl shadow-2xl p-8 border border-gray-700/60"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
        >
          <div className="text-center mb-6">
            <span className="text-sm font-semibold text-yellow-300 mb-2">
              {game.subject}
            </span>
            <h1 className="font-extrabold text-4xl md:text-5xl mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
              {game.title}
            </h1>
            <p className="text-gray-300 text-lg">{game.description}</p>
          </div>
          
          {renderGame()}
        </motion.div>
      </div>
    </div>
  );
};

// Main GameHub
export default function GameHub({ onGoHome }) {
  const [isParticlesLoaded, setIsParticlesLoaded] = useState(false);
  const [synth, setSynth] = useState(null);
  const [isAudioStarted, setIsAudioStarted] = useState(false);
  const [selectedGame, setSelectedGame] = useState(null);

  useEffect(() => {
    const newSynth = new Tone.Synth().toDestination();
    setSynth(newSynth);

    const particlesScript = document.createElement("script");
    particlesScript.src =
      "https://cdn.jsdelivr.net/npm/tsparticles@2.12.0/tsparticles.bundle.min.js";
    particlesScript.onload = () => {
      window.tsParticles.load({
        id: "tsparticles",
        options: {
          background: { color: "transparent" },
          particles: {
            number: { value: 70 },
            size: { value: 3 },
            move: { enable: true, speed: 2 },
            opacity: { value: 0.7 },
            links: { enable: true, color: "#93c5fd", distance: 150, opacity: 0.5 },
          },
          interactivity: { events: { onHover: { enable: true, mode: "grab" } } },
        },
      }).then(() => setIsParticlesLoaded(true));
    };
    document.head.appendChild(particlesScript);
  }, []);

  const playSound = () => {
    if (synth && isAudioStarted) synth.triggerAttackRelease("E4", "8n");
  };

  const startAudio = async () => {
    if (!isAudioStarted) {
      try {
        await Tone.start();
        setIsAudioStarted(true);
      } catch (error) {
        console.error("Failed to start audio context:", error);
      }
    }
  };

  const games = [
    {
      id: 1,
      title: "Math Quiz Challenge",
      description: "Test your math skills with timed algebra problems and equations.",
      image: "https://placehold.co/400x250/5D3FD3/ffffff?text=Math+Quiz",
      subject: "Math",
    },
    {
      id: 2,
      title: "Memory Master",
      description: "Train your memory by matching pairs of symbols in this classic game.",
      image: "https://placehold.co/400x250/2E8B57/ffffff?text=Memory+Game",
      subject: "Memory",
    },
    {
      id: 3,
      title: "Word Puzzle",
      description: "Unscramble letters to form educational words and expand your vocabulary.",
      image: "https://placehold.co/400x250/8B4513/ffffff?text=Word+Puzzle",
      subject: "Language",
    },
    {
      id: 4,
      title: "Trivia Challenge",
      description: "Answer questions from various subjects to test your general knowledge.",
      image: "https://placehold.co/400x250/FF6347/ffffff?text=Trivia+Quiz",
      subject: "General Knowledge",
    },
    {
      id: 5,
      title: "Code Crusader",
      description: "Solve coding puzzles to level up your programming skills.",
      image: "https://placehold.co/400x250/4682B4/ffffff?text=Code+Crusader",
      subject: "Computer Science",
    },
    {
      id: 6,
      title: "Physics Forcefield",
      description: "Apply physics concepts to unlock new levels.",
      image: "https://placehold.co/400x250/FFD700/ffffff?text=Physics+Forcefield",
      subject: "Physics",
    },
    {
      id: 7,
      title: "Global Explorer",
      description: "Explore maps & landmarks to master geography.",
      image: "https://placehold.co/400x250/33825D/ffffff?text=Global+Explorer",
      subject: "Geography",
    },
  ];

  if (selectedGame) {
    return <GamePage game={selectedGame} onGoBack={() => setSelectedGame(null)} />;
  }

  return (
    <div
      className="relative min-h-screen bg-gradient-to-br from-gray-900 via-indigo-900 to-blue-900 text-white font-sans overflow-hidden"
      onClick={startAudio}
    >
      <div
        id="tsparticles"
        className="absolute inset-0 z-0"
        style={{ opacity: isParticlesLoaded ? 1 : 0, transition: "opacity 1s" }}
      ></div>

      <GamifiedHeader />

      <div className="relative z-10 flex flex-col items-center justify-center pt-16 px-6">
        <motion.h1
          className="text-5xl font-extrabold text-center mb-12 drop-shadow-lg bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600 bg-clip-text text-transparent"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
        >
          🎮 Welcome to the Game Hub
        </motion.h1>
        <button
          onClick={onGoHome}
          className="absolute top-8 left-8 px-5 py-2 bg-gray-800/70 hover:bg-gray-700 text-white rounded-full font-semibold z-30 shadow-lg transition-transform hover:scale-105"
        >
          ⬅ Back Home
        </button>
      </div>

      <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 p-6 mt-6">
        {games.map((game) => (
          <motion.div
            key={game.id}
            className="bg-gradient-to-tr from-gray-800 via-gray-900 to-black rounded-3xl shadow-2xl p-5 flex flex-col justify-between border border-gray-700/50 hover:border-yellow-400/70 transition"
            whileHover={{ scale: 1.05, rotate: 1 }}
            onMouseEnter={playSound}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          >
            <img
              src={game.image}
              alt={game.title}
              className="w-full h-auto rounded-xl mb-4 shadow-lg border-2 border-yellow-400"
            />

            <span className="text-sm font-semibold text-yellow-300 mb-2">
              {game.subject}
            </span>
            <h2 className="font-extrabold text-2xl mb-2">{game.title}</h2>
            <p className="text-gray-300 mb-4 text-sm">{game.description}</p>

            <motion.button
              onClick={() => setSelectedGame(game)}
              className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold py-3 px-4 rounded-xl shadow-lg hover:scale-105 transition duration-300"
              whileHover={{ boxShadow: "0px 0px 25px #60a5fa" }}
            >
              Play Now ✨
            </motion.button>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
