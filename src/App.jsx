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
    { sender: "bot", text: "👋 Hi! I’m EduBot, your learning assistant. How can I help?" }
  ]);
  const [input, setInput] = useState("");
  const [hint, setHint] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  // Auto-scroll chat
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

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

  // Predefined responses
  const getPredefinedReply = (msg) => {
    const text = msg.toLowerCase();
    if (text.includes("hi") || text.includes("hello") || text.includes("hey")) return "Hello there! Welcome to EduKhel. How can I assist you?";
    if (text.includes("game") || text.includes("play")) return "We have a variety of educational games! Math, Science, History – which interests you?";
    if (text.includes("math")) return "Math games like 'Math Quest' or 'Fraction Frenzy' are ready for you. Which one sounds fun?";
    if (text.includes("science")) return "Science games like 'Planet Puzzle' or 'Chemistry Chaos' await. Explore and learn!";
    if (text.includes("history")) return "History games like 'Time Traveler's Trials' take you to ancient civilizations. Which era do you like?";
    if (text.includes("course") || text.includes("subject") || text.includes("learn")) return "Our courses make learning fun! Which subject do you want to explore?";
    if (text.includes("price") || text.includes("cost") || text.includes("pricing") || text.includes("subscription")) return "Check our pricing page for flexible plans, including a free trial!";
    if (text.includes("account") || text.includes("login") || text.includes("password")) return "Need account help? Visit the 'Help' section for password or account issues.";
    if (text.includes("forgot password")) return "Click 'Forgot Password' on login page. We'll send a reset link to your email.";
    if (text.includes("contact") || text.includes("talk to someone")) return "Reach support via support@edukhel.com. We're here to help!";
    if (text.includes("how it works") || text.includes("how to use")) return "Sign up, pick a game or course, and start learning! Simple!";
    if (text.includes("thank")) return "You're welcome! Anything else I can help with?";
    if (text.includes("bye") || text.includes("goodbye")) return "Goodbye! Enjoy EduKhel. See you soon!";
    return "I'm sorry, I can only answer basic queries about games, courses, pricing, or help.";
  };

  // Send message
  const handleSend = () => {
    if (!input.trim()) return;
    const userMsg = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    setTimeout(() => {
      const reply = getPredefinedReply(input);
      setMessages((prev) => [...prev, { sender: "bot", text: reply }]);
      setLoading(false);
    }, 800);
  };

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

      {/* Floating Chatbot */}
      <div className="fixed bottom-6 right-6 z-50">
        <motion.div
          animate={{ scale: [1, 1.1, 1], boxShadow: ["0 0 15px rgba(236,72,153,0.6)", "0 0 25px rgba(168,85,247,0.9)", "0 0 15px rgba(236,72,153,0.6)"] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="rounded-full p-4 bg-gradient-to-r from-pink-500 to-purple-600 cursor-pointer"
          onClick={() => setChatOpen(!chatOpen)}
        >
          <span className="text-2xl">🤖</span>
        </motion.div>

        <AnimatePresence>
          {chatOpen && (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              transition={{ duration: 0.4 }}
              className="absolute bottom-16 right-0 w-80 h-96 bg-gray-900/95 rounded-2xl shadow-2xl p-4 border border-purple-700 backdrop-blur-lg flex flex-col"
            >
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-bold text-lg text-pink-400">EduBot AI</h3>
                <button onClick={() => setChatOpen(false)} className="text-gray-300 hover:text-pink-400">✖</button>
              </div>

              <div className="flex-1 overflow-y-auto mb-2 space-y-2 flex flex-col-reverse" style={{ direction: 'rtl' }}>
                <div ref={messagesEndRef} />
                {messages.slice().reverse().map((msg, i) => (
                  <div
                    key={i}
                    className={`p-2 rounded-lg text-sm max-w-[75%] ${msg.sender === "bot" ? "bg-purple-700 text-white self-start" : "bg-pink-600 text-white self-end ml-auto"}`}
                    style={{ direction: 'ltr' }}
                  >
                    {msg.text}
                  </div>
                ))}
                {loading && <p className="text-gray-400 text-xs animate-pulse">EduBot is typing...</p>}
              </div>

              {hint && <div className="px-3 pb-2 text-xs text-pink-300">{hint}</div>}

              <div className="flex gap-2 px-3 pb-2">
                <button className="flex-1 bg-indigo-600 hover:bg-indigo-500 rounded-lg px-2 py-1 text-xs" onClick={() => navigate("/learning")}>📘 Learning</button>
                <button className="flex-1 bg-green-600 hover:bg-green-500 rounded-lg px-2 py-1 text-xs" onClick={() => navigate("/gamehub")}>🎮 Games</button>
                <button className="flex-1 bg-pink-600 hover:bg-pink-500 rounded-lg px-2 py-1 text-xs" onClick={() => navigate("/dashboard")}>📊 Progress</button>
              </div>

              <div className="flex items-center border-t border-purple-700 p-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSend()}
                  className="flex-1 bg-transparent outline-none text-white text-sm px-2"
                  placeholder="Type a message..."
                />
                <button onClick={handleSend} className="text-pink-400 hover:text-pink-300 text-lg px-2">➤</button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
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
