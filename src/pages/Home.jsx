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
  const [searchQuery, setSearchQuery] = useState('');
  const [showFeedback, setShowFeedback] = useState(false);

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
            number: { value: 80 },
            size: { value: 3 },
            move: { enable: true, speed: 2, direction: "none", random: true, straight: false, out_mode: "out" },
            opacity: { value: 0.7 },
            links: { enable: true, color: "#a78bfa", distance: 150, opacity: 0.4 },
          },
          interactivity: { events: { onHover: { enable: true, mode: "repulse" } } },
        },
      }).then(() => setIsParticlesLoaded(true));
    };
    document.head.appendChild(script);

    // --- Botpress Chatbot Integration ---
    // Remove any existing botpress scripts to avoid duplicates
    const existingInject = document.getElementById("botpress-inject");
    if (existingInject) existingInject.remove();

    // Inject Botpress inject.js
    const botpressScript = document.createElement("script");
    botpressScript.src = "https://cdn.botpress.cloud/webchat/v3.2/inject.js";
    botpressScript.defer = true;
    botpressScript.id = "botpress-inject";
    document.body.appendChild(botpressScript);

    botpressScript.onload = () => {
      window.botpressWebChat.init({
        configUrl: "https://files.bpcontent.cloud/2025/09/05/17/20250905173043-0LG6T3LS.json",
        // You can add more options here if needed
      });
    };
  }, []);

  // Play hover sound (hover sound chalao)
  const playSound = () => {
    if (synth && isAudioStarted) synth.triggerAttackRelease("C4", "8n");
  };

  // Start audio context (audio context shuru karo)
  const startAudio = async () => {
    if (!isAudioStarted) {
      await Tone.start();
      setIsAudioStarted(true);
    }
  };

  // Track mouse for tilt effect (tilt effect ke liye mouse ko track karo)
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

  const handleSearch = (e) => {
    e.preventDefault();
    // Implement search functionality (search functionality laagu karo)
    console.log('Searching for:', searchQuery);
  };

  const gamifiedLearningFeatures = [
    {
      title: "What is Gamified Learning?",
      description: "Gamified learning combines educational content with game mechanics like points, badges, levels, and rewards to make learning more engaging and motivating.",
      icon: "🎯",
      color: "from-blue-500 to-cyan-500",
      video: "https://youtu.be/_bloPf5zrzA"
    },
    {
      title: "Advantages of Gamification",
      description: "Increases engagement by 90%, improves retention rates, provides instant feedback, and makes learning fun and addictive.",
      icon: "⚡",
      color: "from-yellow-500 to-orange-500",
      video: "https://youtu.be/wgnIwWX_ZcE"
    },
    {
      title: "Where is it used?",
      description: "Perfect for K-12 education, corporate training, skill development, language learning, and professional certification programs.",
      icon: "🚀",
      color: "from-purple-500 to-pink-500",
      video: "https://youtu.be/wgnIwWX_ZcE?si=AW_4pHXvJB3xREb5"
    },
    {
      title: "Proven Effectiveness",
      description: "Studies show 67% better learning outcomes, 40% higher completion rates, and 3x more engagement compared to traditional methods.",
      icon: "🏆",
      color: "from-green-500 to-emerald-500",
      video: "https://youtu.be/BAf5-VFzCKE"
    }
  ];

  const feedbackOptions = [
    { id: 1, text: "Amazing learning experience! 🎉", rating: 5 },
    { id: 2, text: "Games are so much fun! 🎮", rating: 5 },
    { id: 3, text: "Great way to learn! 📚", rating: 4 },
    { id: 4, text: "Love the challenges! ⚡", rating: 5 },
    { id: 5, text: "Best educational platform! 🌟", rating: 5 }
  ];

  // Helper to replace underscores with spaces for visible text (visible text ke liye underscores ko spaces se badalne mein madad karta hai)
  const formatText = (text) => typeof text === "string" ? text.replace(/_/g, " ") : text;

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-black text-white overflow-hidden font-sans" onClick={startAudio}>
    
      <div id="tsparticles" className="absolute inset-0 z-0" style={{ opacity: isParticlesLoaded ? 1 : 0, transition: "opacity 1s" }}></div>

      {/* Search Bar (search bar) */}
      <motion.div 
        className="fixed top-24 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-md px-4"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.6 }}
      >
        <form onSubmit={handleSearch} className="relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search for topics, games, or quizzes..."
            className="w-full px-6 py-3 bg-white/10 backdrop-blur-lg border border-white/20 rounded-full text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all duration-300 pr-12"
          />
          <button
            type="submit"
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-yellow-400 hover:text-yellow-300 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>
        </form>
      </motion.div>

      {/* Floating Elements (floating elements) */}
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

      {/* Hero Section (hero section) */}
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
Turn your education into an epic adventure.
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
Start Learning
          </motion.button>
          <motion.button
            onClick={() => navigate('/gamehub')}
            onMouseEnter={playSound}
            whileHover={{ scale: 1.1, boxShadow: "0px 0px 20px #8b5cf6" }}
            className="px-6 py-3 bg-purple-600 rounded-full font-semibold text-lg shadow-lg hover:shadow-2xl transition-all duration-300"
          >
Play Now
          </motion.button>
        </motion.div>
      </div>

      {/* Gamified Learning Intro Video Section (gamified learning intro video section) */}
      <motion.section 
        className="relative z-10 py-20 px-4"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={{
          hidden: { opacity: 0, y: 50 },
          visible: { opacity: 1, y: 0, transition: { duration: 0.8 } }
        }}
      >
        <div className="max-w-6xl mx-auto">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-yellow-400 to-pink-500 bg-clip-text text-transparent mb-4">
Why Gamified Learning?
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Experience the power of fun and interactive education.
            </p>
          </motion.div>

          {/* Video Section with Multiple Videos (multiple videos ke saath video section) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            {gamifiedLearningFeatures.map((feature, index) => (
              <motion.div 
                key={index}
                className="relative bg-gradient-to-br from-purple-800 to-pink-800 rounded-3xl p-6 overflow-hidden"
                whileHover={{ scale: 1.02 }}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.2 }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 via-pink-500/20 to-purple-600/20 animate-pulse"></div>
                <div className="relative z-10">
                  <div className="flex items-center mb-4">
                    <div className={`w-12 h-12 bg-gradient-to-r ${feature.color} rounded-full flex items-center justify-center text-2xl mr-4`}>
                      {feature.icon}
                    </div>
                    <h3 className="text-xl font-bold text-white">{feature.title}</h3>
                  </div>
                  
                  {/* YouTube Embed (YouTube embed) */}
                  <div className="relative mb-4 rounded-xl overflow-hidden" style={{ position: "relative", width: "100%", height: 0, paddingBottom: "56.25%" }}>
                    <iframe
                      src={feature.video.replace("youtu.be/", "www.youtube.com/embed/")}
                      title={feature.title}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      style={{ border: "none", width: "100%", height: "100%", position: "absolute", left: 0, top: 0, overflow: "hidden" }}
                    ></iframe>
                  </div>
                  
                  <p className="text-gray-300 text-sm">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Features Grid (features grid) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {gamifiedLearningFeatures.map((feature, index) => (
              <motion.div
                key={index}
                className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-6 hover:bg-white/20 transition-all duration-300"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
                onMouseEnter={playSound}
              >
                <div className={`w-16 h-16 bg-gradient-to-r ${feature.color} rounded-full flex items-center justify-center text-2xl mb-4 mx-auto`}>
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-3 text-center">{feature.title}</h3>
                <p className="text-gray-300 text-sm text-center">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Enhanced Info Section (enhanced info section) */}
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
            <h3 className="text-xl font-bold mb-2">{i===0 ? `📘 ${title}` : i===1 ? `🎮 ${title}` : `🏆 ${title}`}</h3>
            <p className="text-gray-300">
              {i===0 ? "Engage with fun quizzes and challenging missions that make learning feel like a game."
              : i===1 ? "Dive into interactive games designed to teach complex subjects in an enjoyable, hands-on way."
              : "Track your progress, earn rewards, and climb the leaderboard to prove you're the best."}
            </p>
          </motion.div>
        ))}
      </motion.div>

      {/* Feedback Section (feedback section) */}
      <motion.section 
        className="relative z-10 py-20 px-4"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={{
          hidden: { opacity: 0, y: 50 },
          visible: { opacity: 1, y: 0, transition: { duration: 0.8 } }
        }}
      >
        <div className="max-w-6xl mx-auto">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-yellow-400 to-pink-500 bg-clip-text text-transparent mb-4">
What Our Learners Say
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Join thousands of students who have transformed their learning experience.
            </p>
          </motion.div>

          {/* Feedback Cards (feedback cards) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {feedbackOptions.map((feedback, index) => (
              <motion.div
                key={feedback.id}
                className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-6 hover:bg-white/20 transition-all duration-300 cursor-pointer"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
                onClick={() => setShowFeedback(true)}
              >
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className={`text-xl ${i < feedback.rating ? 'text-yellow-400' : 'text-gray-600'}`}>⭐</span>
                  ))}
                </div>
                <p className="text-gray-300 mb-4">{feedback.text}</p>
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-gradient-to-r from-yellow-400 to-pink-500 rounded-full flex items-center justify-center text-white font-bold mr-3">
                    {String.fromCharCode(65 + index)}
                  </div>
                  <div>
                    <p className="text-white font-semibold">Student {index + 1}</p>
                    <p className="text-gray-400 text-sm">Verified Learner</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Call to Action (call to action) */}
          <motion.div 
            className="text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <motion.button
              className="px-8 py-4 bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600 text-black rounded-full font-bold text-lg hover:shadow-2xl transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowFeedback(true)}
            >
Share Your Feedback
            </motion.button>
          </motion.div>
        </div>
      </motion.section>

      {/* Feedback Modal (feedback modal) */}
      {showFeedback && (
        <motion.div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setShowFeedback(false)}
        >
          <motion.div 
            className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 max-w-md w-full"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-2xl font-bold text-white mb-6 text-center">Share Your Feedback! 💬</h3>
            <textarea
              placeholder="Tell us about your learning experience..."
              className="w-full h-32 px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all duration-300 mb-6"
            />
            <div className="flex gap-4">
              <button
                onClick={() => setShowFeedback(false)}
                className="flex-1 px-4 py-3 bg-white/20 text-white rounded-xl font-semibold hover:bg-white/30 transition-all duration-300"
              >
                Cancel
              </button>
              <button
                onClick={() => setShowFeedback(false)}
                className="flex-1 px-4 py-3 bg-gradient-to-r from-yellow-400 to-pink-500 text-black rounded-xl font-semibold hover:shadow-lg transition-all duration-300"
              >
                Submit Feedback
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* REMOVE custom chatbot button and modal (custom chatbot button aur modal hatayein) */}
      {/* The Botpress widget will appear automatically (Botpress widget automatically dikhai dega) */}
    </div>
  );
}
