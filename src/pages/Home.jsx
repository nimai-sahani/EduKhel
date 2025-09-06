// Home.jsx
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import * as Tone from 'tone';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const navigate = useNavigate();
  const [synth, setSynth] = useState(null);
  const [isAudioStarted, setIsAudioStarted] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [glitchKey, setGlitchKey] = useState(0);
  const [isParticlesLoaded, setIsParticlesLoaded] = useState(false);

  useEffect(() => {
    // Initialize synth
    const newSynth = new Tone.Synth({
      oscillator: { type: "triangle" },
      envelope: { attack: 0.005, decay: 0.1, sustain: 0, release: 0.1 }
    }).toDestination();
    setSynth(newSynth);

    // Load tsparticles
    const script = document.createElement("script");
    script.src = "https://cdn.jsdelivr.net/npm/tsparticles@2.12.0/tsparticles.bundle.min.js";
    script.onload = () => {
      window.tsParticles.load({
        id: "tsparticles",
        options: {
          background: { color: "transparent" },
          particles: {
            number: { value: 60 },
            size: { value: 3 },
            move: { enable: true, speed: 1.5, direction: "none", random: true, straight: false, out_mode: "out" },
            opacity: { value: 0.7 },
            links: { enable: true, color: "#a78bfa", distance: 150, opacity: 0.4 },
          },
          interactivity: { events: { onHover: { enable: true, mode: "repulse" } } },
        },
      }).then(() => setIsParticlesLoaded(true));
    };
    document.head.appendChild(script);
  }, []);

  // Play hover sound
  const playSound = () => {
    if (synth && isAudioStarted) synth.triggerAttackRelease("C4", "8n");
  };

  // Start audio context
  const startAudio = async () => {
    if (!isAudioStarted) {
      await Tone.start();
      setIsAudioStarted(true);
    }
  };

  // Track mouse for tilt effect
  useEffect(() => {
    const handleMouseMove = (e) => setMousePosition({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const handleHoverStart = () => setGlitchKey(prev => prev + 1);

  const tiltStyle = (el) => {
    if (!el) return {};
    const rect = el.getBoundingClientRect();
    const x = mousePosition.x - (rect.left + rect.width / 2);
    const y = mousePosition.y - (rect.top + rect.height / 2);
    return { transform: `perspective(1000px) rotateX(${-y / 15}deg) rotateY(${x / 15}deg)` };
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-black text-white overflow-hidden font-sans" onClick={startAudio}>
      <div id="tsparticles" className="absolute inset-0 z-0" style={{ opacity: isParticlesLoaded ? 1 : 0, transition: "opacity 1s" }}></div>

      {/* Floating Rocket */}
      <motion.div className="absolute top-1/4 right-1/4 z-10 hidden lg:block"
        animate={{ y: [0, -30, 0], rotate: [0, 5, -5, 0] }}
        transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="150" height="150" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-yellow-400">
          <path d="M4.5 16.5c-1.5 1.5-3 0-3-3s1.5-3 3-3L12 1.5l3-3 3 3-3 3-3-3-3 3z" />
          <path d="M19.5 7.5c1.5-1.5 3 0 3 3s-1.5 3-3 3L12 22.5l-3 3-3-3 3-3 3 3 3-3z" />
          <path d="M12 12s2 2 4 0 4-4 0-4-4 4-4 4z" />
          <path d="M12 12s-2-2-4 0-4 4 0 4 4-4 4-4z" />
        </svg>
      </motion.div>

      {/* Hero Section */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen text-center px-4 py-16">
        <motion.h1
          key={glitchKey}
          className="text-6xl md:text-8xl font-extrabold bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-500 bg-clip-text text-transparent drop-shadow-lg cursor-pointer relative"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          whileHover={{ scale: 1.05, filter: "brightness(1.5)" }}
          onHoverStart={handleHoverStart}
        >
          EduKhel
        </motion.h1>

        <motion.p className="mt-6 text-lg md:text-2xl text-gray-300 max-w-2xl"
          initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 1 }}
        >
          Where <span className="text-pink-400 font-bold">Education</span> meets{" "}
          <span className="text-purple-400 font-bold">Gaming</span> 🎮✨
        </motion.p>

        <motion.div className="mt-10 flex flex-col sm:flex-row gap-6"
          initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1, duration: 1 }}
        >
          <motion.button
            onClick={() => navigate('/learning')}
            onMouseEnter={playSound}
            whileHover={{ scale: 1.1, boxShadow: "0px 0px 20px #f59e0b" }}
            className="px-6 py-3 bg-yellow-500 text-black rounded-full font-semibold text-lg shadow-lg hover:shadow-2xl transition-all duration-300"
          >
            Start Learning 📘
          </motion.button>
          <motion.button
            onClick={() => navigate('/gamehub')}
            onMouseEnter={playSound}
            whileHover={{ scale: 1.1, boxShadow: "0px 0px 20px #8b5cf6" }}
            className="px-6 py-3 bg-purple-600 rounded-full font-semibold text-lg shadow-lg hover:shadow-2xl transition-all duration-300"
          >
            Play Now 🎮
          </motion.button>
        </motion.div>
      </div>

      {/* Info Section */}
      <motion.div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-6 p-10 mt-10"
        initial="hidden" whileInView="visible" viewport={{ once: true }}
        variants={{
          hidden: { opacity: 0, y: 50 },
          visible: { opacity: 1, y: 0, transition: { duration: 0.8, staggerChildren: 0.2 } },
        }}
      >
        {["Learn Smarter", "Play Harder", "Compete & Win"].map((title, i) => (
          <motion.div
            key={i}
            className={`p-6 ${i===0 ? 'bg-purple-800' : i===1 ? 'bg-indigo-800' : 'bg-pink-800'} bg-opacity-50 rounded-2xl shadow-xl transition-transform duration-300 transform-gpu`}
            style={tiltStyle(document.getElementById(`card${i+1}`))}
            id={`card${i+1}`}
            variants={{ hidden: { opacity: 0, scale: 0.9 }, visible: { opacity: 1, scale: 1 } }}
            whileHover={{ scale: 1.05 }}
            onMouseEnter={playSound}
          >
            <h3 className="text-xl font-bold mb-2">{i===0 ? '📘 Learn Smarter' : i===1 ? '🎮 Play Harder' : '🏆 Compete & Win'}</h3>
            <p className="text-gray-300">
              {i===0 ? "Fun quizzes & challenges that make learning addictive."
              : i===1 ? "Interactive games that boost your knowledge & skills."
              : "Climb the leaderboard & earn rewards as you learn!"}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
