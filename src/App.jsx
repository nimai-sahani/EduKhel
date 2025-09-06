// src/App.jsx
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import GameHub from "./pages/GameHub";
import Quiz from "./pages/Quiz";
import Puzzle from "./pages/Puzzle";
import Memory from "./pages/Memory";
import Sudoku from "./pages/Sudoku";
import Leaderboard from "./pages/Leaderboard";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import LearningHub from "./pages/LearningHub";
import LanguageSwitcher from "./components/LanguageSwitcher";

function App() {
  const location = useLocation();
  const navigate = useNavigate();

  const [chatOpen, setChatOpen] = useState(false);
  const [messages, setMessages] = useState([
    { sender: "bot", text: "👋 Hi! I’m EduBot, your learning assistant. How can I help?", time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) }
  ]);
  const [input, setInput] = useState("");
  const [hint, setHint] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  // Auto-scroll chat
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Load Botpress chatbot
  useEffect(() => {
    const script1 = document.createElement("script");
    script1.src = "https://cdn.botpress.cloud/webchat/v3.2/inject.js";
    script1.defer = true;
    document.head.appendChild(script1);

    const script2 = document.createElement("script");
    script2.src = "https://files.bpcontent.cloud/2025/09/05/17/20250905173043-QRDWD4YI.js";
    script2.defer = true;
    document.head.appendChild(script2);

    return () => {
      // Cleanup scripts if needed
      document.head.removeChild(script1);
      document.head.removeChild(script2);
    };
  }, []);

  // Page-specific hints
  useEffect(() => {
    switch (location.pathname) {
      case "/learning":
        setHint("📘 Dive into today’s Math video and unlock XP with the mini quiz!");
        break;
      case "/gamehub":
        setHint("🎮 Challenge yourself! Sudoku and Puzzle await you!");
        break;
      case "/dashboard":
        setHint("📊 Track your XP, collect badges, and beat the leaderboard!");
        break;
      default:
        setHint("👋 Welcome Explorer! Begin your journey with the Learning Hub!");
    }
  }, [location.pathname]);

  // Predefined responses with context memory
  const getPredefinedReply = (msg, history) => {
    const text = msg.toLowerCase();

    if (text.includes("hi") || text.includes("hello") || text.includes("hey")) 
      return "Hello there! 👋 Welcome to EduKhel. How can I assist you today?";

    if (text.includes("game") || text.includes("play")) 
      return "🎮 We have Math, Science, and History games! Which subject excites you?";

    if (text.includes("math")) 
      return "🧮 Math Quest & Fraction Frenzy are fun! Want me to take you there?";

    if (text.includes("science")) 
      return "🔬 Try Planet Puzzle or Chemistry Chaos! 🚀 Which one sounds exciting?";

    if (text.includes("history")) 
      return "📜 Time Traveler's Trials will take you to ancient civilizations. 🌍";

    if (text.includes("course") || text.includes("subject") || text.includes("learn")) 
      return "📘 We make learning fun! Tell me the subject and I’ll suggest activities.";

    if (text.includes("price") || text.includes("cost") || text.includes("subscription")) 
      return "💰 Our pricing is flexible! Free trial available too. Want to see plans?";

    if (text.includes("account") || text.includes("login") || text.includes("password")) 
      return "🔐 Need account help? Check 'Help' section or reset password via email.";

    if (text.includes("forgot password")) 
      return "➡️ Click 'Forgot Password' on login page. We'll email you a reset link.";

    if (text.includes("contact") || text.includes("support")) 
      return "📩 Reach us at support@edukhel.com. We're always here to help!";

    if (text.includes("how it works") || text.includes("how to use")) 
      return "⚡ Simple! Sign up → pick a game/course → start learning! 🚀";

    if (text.includes("thank")) 
      return "🙏 You’re welcome! Anything else I can help you with?";

    if (text.includes("bye") || text.includes("goodbye")) 
      return "👋 Goodbye! Keep learning with EduKhel. See you soon!";

    // Contextual memory: last 5 messages check
    if (history.some(h => h.text.includes("math"))) 
      return "Looks like you’re into Math! Should I open Math Quest for you?";
    
    if (history.some(h => h.text.includes("science"))) 
      return "Science is fun! 🚀 Let’s try Chemistry Chaos today.";

    return "🤔 Hmm… I can only answer about games, courses, pricing, or help right now.";
  };

  // Send message
  const handleSend = () => {
    if (!input.trim()) return;
    const userMsg = { sender: "user", text: input, time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    setTimeout(() => {
      const history = messages.slice(-5); // last 5 msgs for context
      const reply = getPredefinedReply(input, history);
      setMessages((prev) => [...prev, { sender: "bot", text: reply, time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) }]);
      setLoading(false);
    }, 1000);
  };

  // Quick Suggestions
  const suggestions = ["🎮 Games", "📘 Learning", "💰 Pricing", "🔐 Account Help"];

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-black text-white">
      {/* Navbar */}
      <motion.div initial={{ y: -100, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.6 }}>
        <Navbar />
      </motion.div>

      {/* Language Switcher */}
      <motion.div className="fixed top-20 right-6 z-50" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8, duration: 0.6 }}>
        <LanguageSwitcher />
      </motion.div>

      {/* Botpress Chatbot Integration */}
      <div className="fixed bottom-6 right-6 z-50">
        <motion.div
          animate={{ scale: [1, 1.1, 1], boxShadow: ["0 0 15px rgba(236,72,153,0.6)", "0 0 25px rgba(168,85,247,0.9)", "0 0 15px rgba(236,72,153,0.6)"] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="rounded-full p-4 bg-gradient-to-r from-pink-500 to-purple-600 cursor-pointer"
          onClick={() => setChatOpen(!chatOpen)}
        >
          <span className="text-2xl">🤖</span>
        </motion.div>
      </div>

      {/* Main Routes */}
      <main className="flex-grow p-4 md:p-6">
        <motion.div key={location.pathname} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} transition={{ duration: 0.5, ease: "easeInOut" }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/learning" element={<LearningHub />} />
            <Route path="/gamehub" element={<GameHub />} />
            <Route path="/quiz" element={<Quiz />} />
            <Route path="/puzzle" element={<Puzzle />} />
            <Route path="/memory" element={<Memory />} />
            <Route path="/sudoku" element={<Sudoku />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
          </Routes>
        </motion.div>
      </main>

      {/* Footer */}
      <motion.div initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.7, ease: "easeOut" }}>
        <Footer />
      </motion.div>
    </div>
  );
}

export default App;
