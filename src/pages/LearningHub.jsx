import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import * as Tone from 'tone';
import AlgebraQuiz from "../components/quizzes/AlgebraQuiz";
import ScienceQuiz from "../components/quizzes/ScienceQuiz";

// Mock component for gamified header
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
      <div className="flex items-center gap-2 text-lime-300">
        <span className="font-bold">Badges:</span>
        <span>⭐</span>
      </div>
    </motion.div>
  </div>
);

// A new component for individual learning topic pages
const LearningTopicPage = ({ topic, onGoBack }) => {
  const [isParticlesLoaded, setIsParticlesLoaded] = useState(false);
  const [synth, setSynth] = useState(null);
  const [isAudioStarted, setIsAudioStarted] = useState(false);
  const [showQuiz, setShowQuiz] = useState(false);

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

  const renderQuiz = () => {
    switch (topic.subject) {
      case "Math":
        return <AlgebraQuiz onComplete={() => setShowQuiz(false)} />;
      case "Science":
        return <ScienceQuiz onComplete={() => setShowQuiz(false)} />;
      default:
        return (
          <div className="text-center p-8">
            <h2 className="text-2xl font-bold mb-4">Quiz Coming Soon!</h2>
            <p className="text-gray-400 mb-6">This quiz is under development.</p>
            <motion.button
              onClick={() => setShowQuiz(false)}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Back to Learning
            </motion.button>
          </div>
        );
    }
  };

  if (showQuiz) {
    return (
      <div className="relative min-h-screen bg-gradient-to-br from-gray-900 via-indigo-900 to-blue-900 text-white font-sans overflow-hidden" onClick={startAudio}>
        <div id="tsparticles" className="absolute inset-0 z-0" style={{ opacity: isParticlesLoaded ? 1 : 0, transition: "opacity 1s" }}></div>
        <div className="relative z-10 p-6 flex flex-col items-center justify-center min-h-screen">
          <button
            onClick={() => setShowQuiz(false)}
            className="absolute top-8 left-8 px-4 py-2 bg-gray-800 bg-opacity-70 text-white rounded-full font-semibold z-30 transition-transform hover:scale-105"
          >
            &larr; Back to Topic
          </button>

          <motion.div
            className="w-full max-w-6xl bg-gradient-to-tr from-gray-800 via-gray-900 to-black rounded-3xl shadow-2xl p-8 border border-gray-700/60"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          >
            {renderQuiz()}
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-gray-900 via-indigo-900 to-blue-900 text-white font-sans overflow-hidden" onClick={startAudio}>
      <div id="tsparticles" className="absolute inset-0 z-0" style={{ opacity: isParticlesLoaded ? 1 : 0, transition: "opacity 1s" }}></div>
      <div className="relative z-10 p-6 flex flex-col items-center justify-center min-h-screen">
        <button
          onClick={onGoBack}
          className="absolute top-8 left-8 px-4 py-2 bg-gray-800 bg-opacity-70 text-white rounded-full font-semibold z-30 transition-transform hover:scale-105"
        >
          &larr; Go Back to Learning Hub
        </button>

        <motion.div
          className="w-full max-w-4xl bg-gradient-to-tr from-gray-800 via-gray-900 to-black rounded-3xl shadow-2xl p-8 flex flex-col items-center text-center"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
        >
          <img
            src={topic.image}
            alt={topic.title}
            className="w-full h-auto rounded-xl mb-6 shadow-lg border-2 border-yellow-400 max-w-lg"
          />
          <span className="text-sm font-semibold text-yellow-300 mb-2">{topic.subject}</span>
          <h1 className="font-extrabold text-4xl md:text-5xl mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">{topic.title}</h1>
          <p className="text-gray-300 text-lg mb-8">{topic.description}</p>
          <div className="p-8 bg-gray-700 bg-opacity-50 rounded-xl w-full">
            <h2 className="text-2xl font-bold mb-4">Watch & Learn! 📺</h2>
            <p className="text-gray-400 mb-6">Start your learning journey with this educational video:</p>
            
            {topic.videoUrl && (
              <div className="relative w-full h-64 md:h-80 rounded-xl overflow-hidden mb-6">
                <iframe
                  src={`https://www.youtube.com/embed/${topic.videoUrl.split('v=')[1]?.split('&')[0]}`}
                  title={topic.title}
                  className="w-full h-full"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            )}
            
            <div className="flex gap-4">
              <motion.button
                className="px-6 py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => window.open(topic.videoUrl, '_blank')}
              >
                Watch on YouTube 🎬
              </motion.button>
              <motion.button
                className="px-6 py-3 bg-green-600 text-white rounded-xl font-bold hover:bg-green-700 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowQuiz(true)}
              >
                Take Quiz 📝
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

// Main Learning Hub component
export default function LearningHub({ onGoHome }) {
  const [isParticlesLoaded, setIsParticlesLoaded] = useState(false);
  const [synth, setSynth] = useState(null);
  const [isAudioStarted, setIsAudioStarted] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [selectedTopic, setSelectedTopic] = useState(null);

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

    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  const playSound = () => {
    if (synth && isAudioStarted) {
      synth.triggerAttackRelease("E4", "8n");
    }
  };

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

  const topics = [
    {
      id: 1,
      title: "Introduction to Algebra for Kids",
      description: "An exciting journey to solve equations and complex problems.",
      image: "https://placehold.co/400x250/5D3FD3/ffffff?text=Math+Adventure",
      subject: "Math",
      videoUrl: "https://www.youtube.com/watch?v=z0OIXIZKfo0"
    },
    {
      id: 2,
      title: "EQUATIONS for Kids – Solving Equations with Addition and Subtraction",
      description: "Learn to solve equations step by step with fun examples.",
      image: "https://placehold.co/400x250/2E8B57/ffffff?text=Math+Equations",
      subject: "Math",
      videoUrl: "https://www.youtube.com/watch?v=dtnvT4CtJAc"
    },
    {
      id: 3,
      title: "What Is Universe? | Size Of The Universe | The Dr Binocs Show",
      description: "Explore the mysteries of our vast universe and its incredible size.",
      image: "https://placehold.co/400x250/1C004F/ffffff?text=Universe+Exploration",
      subject: "Science",
      videoUrl: "https://www.youtube.com/watch?v=Vw_TBtAf1Bc"
    },
    {
      id: 4,
      title: "Science Mysteries",
      description: "Combine elements to create new compounds and unravel the mysteries of science.",
      image: "https://placehold.co/400x250/2E8B57/ffffff?text=Science+Mystery",
      subject: "Science",
      videoUrl: "https://www.youtube.com/watch?v=zJEuHStX_8E"
    },
    {
      id: 5,
      title: "History Hunt",
      description: "An exciting quiz battle to learn about historical events and figures.",
      image: "https://placehold.co/400x250/8B4513/ffffff?text=History+Hunt",
      subject: "History",
      videoUrl: "https://www.youtube.com/watch?v=N89JIkHyD6Q"
    },
    {
      id: 6,
      title: "English Video",
      description: "Master the art of communication with vocabulary and creative writing challenges.",
      image: "https://placehold.co/400x250/FF8C00/ffffff?text=English+Learning",
      subject: "English",
      videoUrl: "https://www.youtube.com/watch?v=25lG5C7ygW4"
    },
    {
      id: 7,
      title: "Fundamentals of Computer",
      description: "Learn the basics of computer science and how computers work.",
      image: "https://placehold.co/400x250/4682B4/ffffff?text=Computer+Fundamentals",
      subject: "Computer Science",
      videoUrl: "https://www.youtube.com/watch?v=y34Xlt2RxEk&t=56s"
    },
    {
      id: 8,
      title: "Physics Forcefield",
      description: "Apply principles of physics to solve mind-bending puzzles.",
      image: "https://placehold.co/400x250/FFD700/ffffff?text=Physics+Forcefield",
      subject: "Physics",
      videoUrl: "https://www.youtube.com/watch?v=RWsvTUixZjI&t=489s"
    },
    {
      id: 9,
      title: "Geography Exploration",
      description: "Explore world maps and become a geography master.",
      image: "https://placehold.co/400x250/33825D/ffffff?text=Geography+Exploration",
      subject: "World Geography",
      videoUrl: "https://www.youtube.com/watch?v=W0wTC7Toc3s&t=93s"
    },
  ];

  const handleTopicSelect = (topic) => {
    setSelectedTopic(topic);
  };

  if (selectedTopic) {
    return <LearningTopicPage topic={selectedTopic} onGoBack={() => setSelectedTopic(null)} />;
  }

  return (
    <div
      className="relative min-h-screen bg-gradient-to-br from-gray-900 via-indigo-900 to-blue-900 text-white font-sans overflow-hidden"
      onClick={startAudio}
    >
      <div id="tsparticles" className="absolute inset-0 z-0" style={{ opacity: isParticlesLoaded ? 1 : 0, transition: "opacity 1s" }}></div>

      <GamifiedHeader />

      <div className="relative z-10 flex flex-col items-center justify-center pt-16 px-6">
        <motion.h1
          className="text-5xl font-extrabold text-center mb-12 drop-shadow-lg"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
        >
          Welcome to the World of Knowledge! 🧠
        </motion.h1>
        <button
          onClick={onGoHome}
          className="absolute top-8 left-8 px-4 py-2 bg-gray-800 bg-opacity-70 text-white rounded-full font-semibold z-30 transition-transform hover:scale-105"
        >
          &larr; Go Back Home
        </button>
      </div>

      <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 p-6 mt-6">
        {topics.map((topic) => (
          <motion.div
            key={topic.id}
            id={`topic-card-${topic.id}`}
            className="bg-gradient-to-tr from-gray-800 via-gray-900 to-black rounded-3xl shadow-2xl p-5 flex flex-col justify-between transform transition duration-500 transform-gpu"
            style={tiltStyle(document.getElementById(`topic-card-${topic.id}`))}
            whileHover={{ scale: 1.05 }}
            onMouseEnter={playSound}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          >
            <img
              src={topic.image}
              alt={topic.title}
              className="w-full h-auto rounded-xl mb-4 shadow-lg border-2 border-yellow-400"
            />
            
            <span className="text-sm font-semibold text-yellow-300 mb-2">{topic.subject}</span>
            <h2 className="font-extrabold text-2xl mb-2">{topic.title}</h2>
            <p className="text-gray-300 mb-4 text-sm">{topic.description}</p>
            
            <motion.button
              onClick={() => handleTopicSelect(topic)}
              className="w-full bg-blue-500 text-white font-bold py-3 px-4 rounded-xl shadow-lg hover:bg-blue-600 hover:scale-105 transition duration-300 transform"
              whileHover={{ scale: 1.05, boxShadow: "0px 0px 20px #60a5fa" }}
            >
              Start Playing ✨
            </motion.button>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
