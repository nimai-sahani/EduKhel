 // src/App.jsx
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import OpenAI from "openai";

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

// ✅ OpenAI client setup
const client = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true, // frontend me chalane ke liye
});

function App() {
  const location = useLocation();
  const navigate = useNavigate();

  const [chatOpen, setChatOpen] = useState(false);
  const [messages, setMessages] = useState([
    { sender: "bot", text: "👋 Hi! I’m EduBot, your learning assistant. How can I help?" }
  ]);
  const [input, setInput] = useState("");
  const [hint, setHint] = useState("");
  const messagesEndRef = useRef(null);

  // Auto-scroll chat
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
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

  // ✅ Handle sending message with OpenAI
  const handleSend = async () => {
    if (!input.trim()) return;
    const newMessage = { sender: "user", text: input };
    setMessages((prev) => [...prev, newMessage]);
    setInput("");

    try {
      const response = await client.chat.completions.create({
        model: "gpt-3.5-turbo", // use "gpt-4" if available
        messages: [
          { role: "system", content: "You are EduBot, a helpful AI tutor for students. Be clear and concise." },
          { role: "user", content: input },
        ],
      });

      const botReply = response.choices[0].message.content;
      setMessages((prev) => [...prev, { sender: "bot", text: botReply }]);
    } catch (err) {
      console.error(err);
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: "⚠️ Error: Unable to connect to AI" }
      ]);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-black text-white">
      {/* Navbar */}
      <motion.div
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <Navbar />
      </motion.div>

      {/* Language Switcher */}
      <motion.div
        className="fixed top-20 right-6 z-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.6 }}
      >
        <LanguageSwitcher />
      </motion.div>

      {/* Floating AI Chatbot */}
      <div className="fixed bottom-6 right-6 z-50">
        {/* Bot Icon */}
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            boxShadow: [
              "0 0 15px rgba(236,72,153,0.6)",
              "0 0 25px rgba(168,85,247,0.9)",
              "0 0 15px rgba(236,72,153,0.6)"
            ],
          }}
          transition={{ duration: 2, repeat: Infinity }}
          className="rounded-full p-4 bg-gradient-to-r from-pink-500 to-purple-600 cursor-pointer"
          onClick={() => setChatOpen(!chatOpen)}
        >
          <span className="text-2xl">🤖</span>
        </motion.div>

        {/* Chat Window */}
        <AnimatePresence>
          {chatOpen && (
            <motion.div
              key="chat"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              transition={{ duration: 0.4 }}
              className="absolute bottom-16 right-0 w-80 bg-gray-900/95 rounded-2xl shadow-2xl border border-purple-700 backdrop-blur-lg flex flex-col"
            >
              {/* Header */}
              <div className="p-3 bg-gradient-to-r from-purple-800 to-pink-700 rounded-t-2xl flex justify-between items-center">
                <h3 className="font-bold text-white">EduBot AI</h3>
                <button onClick={() => setChatOpen(false)} className="text-white hover:text-pink-300">✖</button>
              </div>

              {/* Messages */}
              <div className="flex-1 p-3 overflow-y-auto max-h-64 space-y-2 scrollbar-thin scrollbar-thumb-purple-600 scrollbar-track-transparent">
                {messages.map((msg, i) => (
                  <div
                    key={i}
                    className={`p-2 rounded-lg text-sm max-w-[75%] ${
                      msg.sender === "bot"
                        ? "bg-purple-700 text-white self-start"
                        : "bg-green-600 text-white self-end ml-auto"
                    }`}
                  >
                    {msg.text}
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>

              {/* Hint */}
              {hint && (
                <div className="px-3 pb-2 text-xs text-pink-300">{hint}</div>
              )}

              {/* Quick Actions */}
              <div className="flex gap-2 px-3 pb-2">
                <button
                  className="flex-1 bg-indigo-600 hover:bg-indigo-500 rounded-lg px-2 py-1 text-xs"
                  onClick={() => navigate("/learning")}
                >
                  📘 Learning
                </button>
                <button
                  className="flex-1 bg-green-600 hover:bg-green-500 rounded-lg px-2 py-1 text-xs"
                  onClick={() => navigate("/gamehub")}
                >
                  🎮 Games
                </button>
                <button
                  className="flex-1 bg-pink-600 hover:bg-pink-500 rounded-lg px-2 py-1 text-xs"
                  onClick={() => navigate("/dashboard")}
                >
                  📊 Progress
                </button>
              </div>

              {/* Input */}
              <div className="flex items-center border-t border-purple-700 p-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSend()}
                  placeholder="Type a message..."
                  className="flex-1 bg-transparent outline-none text-white text-sm px-2"
                />
                <button
                  onClick={handleSend}
                  className="text-pink-400 hover:text-pink-300 text-lg px-2"
                >
                  ➤
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Main Routes */}
      <main className="flex-grow p-4 md:p-6">
        <motion.div
          key={location.pathname}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        >
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
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        <Footer />
      </motion.div>
    </div>
  );
}

export default App;
