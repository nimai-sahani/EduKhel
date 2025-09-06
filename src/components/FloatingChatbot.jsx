import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

function FloatingChatbot() {
  const [chatOpen, setChatOpen] = useState(false);
  const [messages, setMessages] = useState([
    { sender: "bot", text: "👋 Hi, I’m EduBot, your guide on this learning adventure! What's on your mind today?" },
    { sender: "bot", text: "You can ask me about our **games**, **courses**, **pricing**, or **help** with your account." }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const getPredefinedReply = (userMessage) => {
    const lowerCaseMsg = userMessage.toLowerCase().trim();
    if (lowerCaseMsg.includes("hi") || lowerCaseMsg.includes("hello") || lowerCaseMsg.includes("hey")) {
      return "Hello there! Welcome to EduKhel. How can I assist you? You can ask about our games, courses, or pricing.";
    } else if (lowerCaseMsg.includes("game") || lowerCaseMsg.includes("play")) {
      return "We have a variety of educational games! We offer games on math, science, and history. Which subject are you interested in?";
    } else if (lowerCaseMsg.includes("math")) {
        return "Our math games make numbers fun! You can play 'Math Quest' for algebra or 'Fraction Frenzy' for a challenge. Which one sounds more exciting?";
    } else if (lowerCaseMsg.includes("science")) {
        return "Explore the wonders of science with our interactive games! Try 'Planet Puzzle' to learn about the solar system or 'Chemistry Chaos' for fun with elements.";
    } else if (lowerCaseMsg.includes("history")) {
        return "Dive into the past with our history games! 'Time Traveler's Trials' will take you through ancient civilizations. What historical period fascinates you?";
    } else if (lowerCaseMsg.includes("course") || lowerCaseMsg.includes("subject") || lowerCaseMsg.includes("learn")) {
      return "Our courses are designed to make learning fun! We cover topics from elementary to high school level. Let me know which subject you'd like to explore.";
    } else if (lowerCaseMsg.includes("price") || lowerCaseMsg.includes("cost") || lowerCaseMsg.includes("pricing") || lowerCaseMsg.includes("subscription")) {
      return "We offer flexible pricing plans, including a free trial to get you started! For detailed information, please check our pricing page.";
    } else if (lowerCaseMsg.includes("account") || lowerCaseMsg.includes("login") || lowerCaseMsg.includes("password")) {
      return "I can help with account issues! Please visit the 'Help' section on our website for instructions on how to reset your password or manage your account.";
    } else if (lowerCaseMsg.includes("forgot password")) {
        return "No problem! You can reset your password by clicking on 'Forgot Password' on the login page. We'll send a link to your registered email.";
    } else if (lowerCaseMsg.includes("contact") || lowerCaseMsg.includes("talk to someone")) {
      return "You can reach our support team via email at support@edukhel.com. We're here to help!";
    } else if (lowerCaseMsg.includes("how it works") || lowerCaseMsg.includes("how to use")) {
        return "Getting started is easy! Just sign up, choose a game or course you're interested in, and start playing to learn. It's that simple!";
    } else if (lowerCaseMsg.includes("thank")) {
      return "You're welcome! Is there anything else I can help you with?";
    } else if (lowerCaseMsg.includes("bye") || lowerCaseMsg.includes("goodbye")) {
      return "Goodbye! Hope you have a wonderful time on EduKhel. See you soon!";
    } else {
      return "I'm sorry, I couldn't understand that. My knowledge is limited to topics about our platform. Please try asking about 'games', 'courses', 'pricing', or 'help'.";
    }
  };

  const handleSend = () => {
    if (!input.trim()) return;
    const userMsg = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    setTimeout(() => {
      const botReply = getPredefinedReply(userMsg.text);
      setMessages((prev) => [...prev, { sender: "bot", text: botReply }]);
      setLoading(false);
    }, 1000);
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <motion.div
        animate={{
          scale: [1, 1.1, 1],
          boxShadow: [
            "0 0 15px rgba(236,72,153,0.6)",
            "0 0 25px rgba(168,85,247,0.9)",
            "0 0 15px rgba(236,72,153,0.6)",
          ],
        }}
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
              <button
                onClick={() => setChatOpen(false)}
                className="text-gray-300 hover:text-pink-400"
              >
                ✖
              </button>
            </div>

            <div className="flex-1 overflow-y-auto mb-2 space-y-2 flex flex-col-reverse" style={{ direction: 'rtl' }}>
              <div ref={messagesEndRef} />
              {messages.slice().reverse().map((msg, i) => (
                <div
                  key={i}
                  className={`p-2 rounded-lg text-sm max-w-[75%] ${
                    msg.sender === "bot"
                      ? "bg-purple-700 text-white self-start"
                      : "bg-pink-600 text-white self-end ml-auto"
                  }`}
                  style={{ direction: 'ltr' }}
                >
                  {msg.text}
                </div>
              ))}
              {loading && (
                <p className="text-gray-400 text-xs animate-pulse">EduBot is typing...</p>
              )}
            </div>

            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                className="flex-1 rounded-lg px-3 py-2 text-white text-sm bg-white/20 placeholder-gray-300"
                placeholder="Ask me anything..."
              />
              <button
                onClick={handleSend}
                disabled={loading}
                className="bg-pink-600 hover:bg-pink-500 rounded-lg px-3 py-2 text-sm transition disabled:opacity-50"
              >
                Send
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default FloatingChatbot;
