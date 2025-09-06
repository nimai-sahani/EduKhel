import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { askEduBot } from "../utils/chatApi";

function FloatingChatbot() {
  const [chatOpen, setChatOpen] = useState(false);
  const [messages, setMessages] = useState([
    { sender: "bot", text: "👋 Hi, I’m EduBot! Ask me anything about learning or games." },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;
    const userMsg = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    const botReply = await askEduBot(userMsg.text);
    setMessages((prev) => [...prev, { sender: "bot", text: botReply }]);
    setLoading(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Bot Orb Icon */}
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

      {/* Chat Window */}
      <AnimatePresence>
        {chatOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ duration: 0.4 }}
            className="absolute bottom-16 right-0 w-80 h-96 bg-gray-900/95 rounded-2xl shadow-2xl p-4 border border-purple-700 backdrop-blur-lg flex flex-col"
          >
            {/* Header */}
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-bold text-lg text-pink-400">EduBot AI</h3>
              <button
                onClick={() => setChatOpen(false)}
                className="text-gray-300 hover:text-pink-400"
              >
                ✖
              </button>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto mb-2 space-y-2">
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`p-2 rounded-lg text-sm max-w-[75%] ${
                    msg.sender === "bot"
                      ? "bg-purple-700 text-white self-start"
                      : "bg-pink-600 text-white self-end ml-auto"
                  }`}
                >
                  {msg.text}
                </div>
              ))}
              {loading && (
                <p className="text-gray-400 text-xs animate-pulse">EduBot is typing...</p>
              )}
            </div>

            {/* Input Box */}
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                className="flex-1 rounded-lg px-3 py-2 text-black text-sm"
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
