import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import * as Tone from 'tone';

// Mock component for gamified elements
const GamifiedHeader = () => (
  <div className="relative z-20 flex justify-center pt-8">
    <motion.div
      className="bg-gray-800 bg-opacity-70 p-4 rounded-xl shadow-lg flex gap-4 text-sm md:text-base"
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

// A new component for individual game pages
const GamePage = ({ game, onGoBack }) => {
  const [isParticlesLoaded, setIsParticlesLoaded] = useState(false);
  const [synth, setSynth] = useState(null);
  const [isAudioStarted, setIsAudioStarted] = useState(false);

  useEffect(() => {
    const newSynth = new Tone.Synth({
      oscillator: { type: "sine" },
      envelope: { attack: 0.005, decay: 0.1, sustain: 0, release: 0.1 }
    }).toDestination();
    setSynth(newSynth);

    const particlesScript = document.createElement("script");
    particlesScript.src = "https://cdn.jsdelivr.net/npm/tsparticles@2.12.0/tsparticles.bundle.min.js";
    particlesScript.onload = () => {
      window.tsParticles.load({
        id: "tsparticles",
        options: {
          background: { color: "transparent" },
          particles: {
            number: { value: 80 },
            size: { value: 3 },
            move: { enable: true, speed: 2, direction: "none", random: true, straight: false, out_mode: "out" },
            opacity: { value: 0.8 },
            links: { enable: true, color: "#93c5fd", distance: 150, opacity: 0.5 },
          },
          interactivity: {
            events: {
              onHover: { enable: true, mode: "grab" },
            },
          },
        },
      }).then(() => {
        setIsParticlesLoaded(true);
      });
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

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-gray-900 via-indigo-900 to-blue-900 text-white font-sans overflow-hidden" onClick={startAudio}>
      <div id="tsparticles" className="absolute inset-0 z-0" style={{ opacity: isParticlesLoaded ? 1 : 0, transition: "opacity 1s" }}></div>
      <div className="relative z-10 p-6 flex flex-col items-center justify-center min-h-screen">
        <button
          onClick={onGoBack}
          className="absolute top-8 left-8 px-4 py-2 bg-gray-800 bg-opacity-70 text-white rounded-full font-semibold z-30 transition-transform hover:scale-105"
        >
          &larr; Go Back to Games
        </button>

        <motion.div
          className="w-full max-w-4xl bg-gradient-to-tr from-gray-800 via-gray-900 to-black rounded-3xl shadow-2xl p-8 flex flex-col items-center text-center"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
        >
          <img
            src={game.image}
            alt={game.title}
            className="w-full h-auto rounded-xl mb-6 shadow-lg border-2 border-yellow-400 max-w-lg"
          />
          <span className="text-sm font-semibold text-yellow-300 mb-2">{game.subject}</span>
          <h1 className="font-extrabold text-4xl md:text-5xl mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">{game.title}</h1>
          <p className="text-gray-300 text-lg mb-8">{game.description}</p>
          <div className="p-8 bg-gray-700 bg-opacity-50 rounded-xl w-full">
            <h2 className="text-2xl font-bold mb-4">Game Content Goes Here!</h2>
            <p className="text-gray-400">यह वह जगह है जहाँ असली गेम आएगा। आप यहां क्विज, पजल, या कोई भी गेम जोड़ सकते हैं।</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};


// Main GameHub component
export default function GameHub({ onGoHome }) {
  const [isParticlesLoaded, setIsParticlesLoaded] = useState(false);
  const [synth, setSynth] = useState(null);
  const [isAudioStarted, setIsAudioStarted] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [selectedGame, setSelectedGame] = useState(null);

  useEffect(() => {
    // Initialize a simple synth for sound effects
    const newSynth = new Tone.Synth({
      oscillator: { type: "sine" },
      envelope: { attack: 0.005, decay: 0.1, sustain: 0, release: 0.1 }
    }).toDestination();
    setSynth(newSynth);

    // Dynamically load the tsparticles library
    const particlesScript = document.createElement("script");
    particlesScript.src = "https://cdn.jsdelivr.net/npm/tsparticles@2.12.0/tsparticles.bundle.min.js";
    particlesScript.onload = () => {
      window.tsParticles.load({
        id: "tsparticles",
        options: {
          background: { color: "transparent" },
          particles: {
            number: { value: 80 },
            size: { value: 3 },
            move: { enable: true, speed: 2, direction: "none", random: true, straight: false, out_mode: "out" },
            opacity: { value: 0.8 },
            links: { enable: true, color: "#93c5fd", distance: 150, opacity: 0.5 },
          },
          interactivity: {
            events: {
              onHover: { enable: true, mode: "grab" },
            },
          },
        },
      }).then(() => {
        setIsParticlesLoaded(true);
      });
    };
    document.head.appendChild(particlesScript);

    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  // Function to play sound on button hover
  const playSound = () => {
    if (synth && isAudioStarted) {
      synth.triggerAttackRelease("E4", "8n");
    }
  };

  // Function to handle starting the audio context
  const startAudio = async () => {
    if (!isAudioStarted) {
      try {
        await Tone.start();
        setIsAudioStarted(true);
        console.log("Audio context started successfully.");
      } catch (error) {
        console.error("Failed to start audio context:", error);
      }
    }
  };

  const tiltStyle = (el) => {
    if (!el) return {};
    const rect = el.getBoundingClientRect();
    const x = mousePosition.x - (rect.left + rect.width / 2);
    const y = mousePosition.y - (rect.top + rect.height / 2);
    const tiltX = -y / 15;
    const tiltY = x / 15;
    return { transform: `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg)` };
  };

  const games = [
    {
      id: 1,
      title: "Algebraic Adventures",
      description: "Solve puzzles and challenges to master complex algebraic equations.",
      image: "https://placehold.co/400x250/5D3FD3/ffffff?text=Algebra+Adventure",
      subject: "Math",
    },
    {
      id: 2,
      title: "Periodic Table Quest",
      description: "Match elements and compounds to build new molecules in a fast-paced game.",
      image: "https://placehold.co/400x250/2E8B57/ffffff?text=Periodic+Table+Quest",
      subject: "Science",
    },
    {
      id: 3,
      title: "History Duel",
      description: "Test your knowledge of historical events and figures in an epic quiz battle.",
      image: "https://placehold.co/400x250/8B4513/ffffff?text=History+Duel",
      subject: "History",
    },
    {
      id: 4,
      title: "Grammar Galaxy",
      description: "Journey through space, correcting grammar errors and building perfect sentences.",
      image: "https://placehold.co/400x250/FF6347/ffffff?text=Grammar+Galaxy",
      subject: "English",
    },
    {
      id: 5,
      title: "Code Crusader",
      description: "Learn basic programming concepts by solving logic puzzles and coding challenges.",
      image: "https://placehold.co/400x250/4682B4/ffffff?text=Code+Crusader",
      subject: "Computer Science",
    },
    {
      id: 6,
      title: "Physics Forcefield",
      description: "Apply principles of physics to solve mind-bending puzzles and navigate levels.",
      image: "https://placehold.co/400x250/FFD700/ffffff?text=Physics+Forcefield",
      subject: "Physics",
    },
    {
      id: 7,
      title: "Global Explorer",
      description: "Explore world maps, identify countries and landmarks to become a geography master.",
      image: "https://placehold.co/400x250/33825D/ffffff?text=Global+Explorer",
      subject: "World Geography",
    },
    {
      id: 8,
      title: "Cosmic Voyager",
      description: "Navigate through the solar system, identify planets, and learn about our universe.",
      image: "https://placehold.co/400x250/1C004F/ffffff?text=Cosmic+Voyager",
      subject: "Our Universe",
    },
    {
      id: 9,
      title: "Communi-Quest",
      description: "Master the art of communication with vocabulary and creative writing challenges.",
      image: "https://placehold.co/400x250/FF8C00/ffffff?text=Communi-Quest",
      subject: "Communication",
    },
  ];

  const handleGameSelect = (game) => {
    setSelectedGame(game);
  };

  if (selectedGame) {
    return <GamePage game={selectedGame} onGoBack={() => setSelectedGame(null)} />;
  }

  return (
    <div
      className="relative min-h-screen bg-gradient-to-br from-gray-900 via-indigo-900 to-blue-900 text-white font-sans overflow-hidden"
      onClick={startAudio}
    >
      <div id="tsparticles" className="absolute inset-0 z-0" style={{ opacity: isParticlesLoaded ? 1 : 0, transition: "opacity 1s" }}></div>

      <GamifiedHeader />

      {/* Main Heading and Back Button */}
      <div className="relative z-10 flex flex-col items-center justify-center pt-16 px-6">
        <motion.h1
          className="text-5xl font-extrabold text-center mb-12 drop-shadow-lg"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
        >
          Welcome to the Game Hub 🎮
        </motion.h1>
        <button
          onClick={onGoHome}
          className="absolute top-8 left-8 px-4 py-2 bg-gray-800 bg-opacity-70 text-white rounded-full font-semibold z-30 transition-transform hover:scale-105"
        >
          &larr; Go Back Home
        </button>
      </div>

      <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 p-6 mt-6">
        {games.map((game) => (
          <motion.div
            key={game.id}
            id={`game-card-${game.id}`}
            className="bg-gradient-to-tr from-gray-800 via-gray-900 to-black rounded-3xl shadow-2xl p-5 flex flex-col justify-between transform transition duration-500 transform-gpu"
            style={tiltStyle(document.getElementById(`game-card-${game.id}`))}
            whileHover={{ scale: 1.05 }}
            onMouseEnter={playSound}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          >
            {/* Game Image */}
            <img
              src={game.image}
              alt={game.title}
              className="w-full h-auto rounded-xl mb-4 shadow-lg border-2 border-yellow-400"
            />
            
            <span className="text-sm font-semibold text-yellow-300 mb-2">{game.subject}</span>
            <h2 className="font-extrabold text-2xl mb-2">{game.title}</h2>
            <p className="text-gray-300 mb-4 text-sm">{game.description}</p>
            
            <motion.button
              onClick={() => handleGameSelect(game)}
              className="w-full bg-blue-500 text-white font-bold py-3 px-4 rounded-xl shadow-lg hover:bg-blue-600 hover:scale-105 transition duration-300 transform"
              whileHover={{ scale: 1.05, boxShadow: "0px 0px 20px #60a5fa" }}
            >
              Play Now ✨
            </motion.button>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
