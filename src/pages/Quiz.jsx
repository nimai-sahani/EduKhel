// src/pages/Quiz.jsx
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, XCircle, Timer } from "lucide-react";

const questions = [
  {
    question: "Who is known as the Father of Computers?",
    options: ["Charles Babbage", "Alan Turing", "Bill Gates", "Steve Jobs"],
    answer: "Charles Babbage",
  },
  {
    question: "What is the capital of Odisha?",
    options: ["Cuttack", "Puri", "Bhubaneswar", "Sambalpur"],
    answer: "Bhubaneswar",
  },
  {
    question: "Which planet is known as the Red Planet?",
    options: ["Earth", "Mars", "Venus", "Jupiter"],
    answer: "Mars",
  },
];

export default function Quiz() {
  const [currentQ, setCurrentQ] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const [timeLeft, setTimeLeft] = useState(15);

  const progress = ((currentQ + 1) / questions.length) * 100;

  // Timer effect
  useEffect(() => {
    if (timeLeft === 0) {
      handleNext();
      return;
    }
    const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
    return () => clearTimeout(timer);
  }, [timeLeft]);

  const handleAnswer = (option) => {
    setSelected(option);
    setShowAnswer(true);
    if (option === questions[currentQ].answer) {
      setScore(score + 1);
    }
    setTimeout(() => {
      handleNext();
    }, 1500);
  };

  const handleNext = () => {
    setSelected(null);
    setShowAnswer(false);
    setTimeLeft(15);
    if (currentQ < questions.length - 1) {
      setCurrentQ(currentQ + 1);
    } else {
      alert(`🎉 Quiz Over! Your score: ${score}/${questions.length}`);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800 p-6 text-white">
      {/* Progress bar */}
      <div className="w-full max-w-2xl mb-6">
        <div className="w-full bg-gray-700 rounded-full h-3 overflow-hidden">
          <motion.div
            className="bg-green-400 h-3"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.6 }}
          />
        </div>
        <div className="flex justify-between mt-2 text-sm">
          <span>
            Question {currentQ + 1}/{questions.length}
          </span>
          <span className="flex items-center gap-1">
            <Timer size={16} /> {timeLeft}s
          </span>
        </div>
      </div>

      {/* Question card */}
      <motion.div
        key={currentQ}
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -40 }}
        transition={{ duration: 0.5 }}
        className="bg-white text-gray-800 rounded-2xl shadow-xl p-8 w-full max-w-2xl"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">
          {questions[currentQ].question}
        </h2>
        <div className="grid gap-4">
          {questions[currentQ].options.map((option, index) => {
            const isCorrect = option === questions[currentQ].answer;
            const isSelected = option === selected;

            return (
              <motion.button
                key={index}
                whileTap={{ scale: 0.95 }}
                onClick={() => !showAnswer && handleAnswer(option)}
                className={`w-full px-4 py-3 rounded-xl text-left font-medium shadow-md transition-all
                  ${
                    showAnswer
                      ? isCorrect
                        ? "bg-green-500 text-white"
                        : isSelected
                        ? "bg-red-500 text-white"
                        : "bg-gray-200"
                      : "bg-gray-100 hover:bg-blue-200"
                  }`}
              >
                {option}
                {showAnswer &&
                  (isCorrect ? (
                    <CheckCircle className="inline ml-2" size={20} />
                  ) : isSelected ? (
                    <XCircle className="inline ml-2" size={20} />
                  ) : null)}
              </motion.button>
            );
          })}
        </div>
      </motion.div>

      {/* Score Display */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="mt-6 bg-black/40 px-6 py-3 rounded-xl text-lg"
      >
        🎯 Score: {score}
      </motion.div>
    </div>
  );
}
