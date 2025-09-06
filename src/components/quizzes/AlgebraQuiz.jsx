import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const AlgebraQuiz = ({ onComplete }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [gameComplete, setGameComplete] = useState(false);

  const questions = [
    {
      question: "Solve for x: 2x + 5 = 13",
      options: ["x = 4", "x = 3", "x = 5", "x = 6"],
      correct: 0,
      explanation: "2x + 5 = 13, so 2x = 8, therefore x = 4"
    },
    {
      question: "What is the value of x in: 3x - 7 = 14",
      options: ["x = 5", "x = 6", "x = 7", "x = 8"],
      correct: 2,
      explanation: "3x - 7 = 14, so 3x = 21, therefore x = 7"
    },
    {
      question: "Solve: 4(x + 2) = 20",
      options: ["x = 2", "x = 3", "x = 4", "x = 5"],
      correct: 1,
      explanation: "4(x + 2) = 20, so x + 2 = 5, therefore x = 3"
    },
    {
      question: "What is x if: 2x + 3x = 25",
      options: ["x = 4", "x = 5", "x = 6", "x = 7"],
      correct: 1,
      explanation: "2x + 3x = 5x = 25, so x = 5"
    },
    {
      question: "Solve for x: x/3 + 4 = 7",
      options: ["x = 6", "x = 9", "x = 12", "x = 15"],
      correct: 1,
      explanation: "x/3 + 4 = 7, so x/3 = 3, therefore x = 9"
    }
  ];

  useEffect(() => {
    if (timeLeft > 0 && !gameComplete) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && !gameComplete) {
      setGameComplete(true);
    }
  }, [timeLeft, gameComplete]);

  const handleAnswer = (answerIndex) => {
    if (showResult || gameComplete) return;
    
    setSelectedAnswer(answerIndex);
    setShowResult(true);
    
    if (answerIndex === questions[currentQuestion].correct) {
      setScore(score + 1);
    }
    
    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer(null);
        setShowResult(false);
        setTimeLeft(30);
      } else {
        setGameComplete(true);
      }
    }, 3000);
  };

  const resetGame = () => {
    setCurrentQuestion(0);
    setScore(0);
    setTimeLeft(30);
    setSelectedAnswer(null);
    setShowResult(false);
    setGameComplete(false);
  };

  if (gameComplete) {
    const percentage = Math.round((score / questions.length) * 100);
    return (
      <motion.div 
        className="text-center p-8"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-4xl font-bold mb-4 text-yellow-400">🎉 Algebra Quiz Complete!</h2>
        <div className="text-6xl mb-4">
          {percentage >= 80 ? "🏆" : percentage >= 60 ? "🥈" : "🥉"}
        </div>
        <p className="text-2xl mb-4">Score: {score}/{questions.length}</p>
        <p className="text-xl mb-6">Percentage: {percentage}%</p>
        <div className="flex gap-4 justify-center">
          <motion.button
            onClick={resetGame}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Try Again
          </motion.button>
          <motion.button
            onClick={onComplete}
            className="px-6 py-3 bg-green-600 text-white rounded-lg font-bold hover:bg-green-700 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Back to Learning
          </motion.button>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div 
      className="max-w-2xl mx-auto p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-2xl font-bold">Algebra Quiz</h3>
        <div className="flex gap-4">
          <div className="bg-blue-600 px-4 py-2 rounded-lg">
            <span className="font-bold">Score: {score}</span>
          </div>
          <div className="bg-red-600 px-4 py-2 rounded-lg">
            <span className="font-bold">Time: {timeLeft}s</span>
          </div>
        </div>
      </div>

      <div className="bg-gray-800 p-6 rounded-xl mb-6">
        <h4 className="text-xl font-semibold mb-4">
          Question {currentQuestion + 1} of {questions.length}
        </h4>
        <p className="text-2xl font-bold text-yellow-400 mb-6">
          {questions[currentQuestion].question}
        </p>
        
        <div className="grid grid-cols-2 gap-4">
          {questions[currentQuestion].options.map((option, index) => (
            <motion.button
              key={index}
              onClick={() => handleAnswer(index)}
              disabled={showResult || gameComplete}
              className={`p-4 rounded-lg font-bold text-lg transition-all ${
                showResult
                  ? index === questions[currentQuestion].correct
                    ? "bg-green-600 text-white"
                    : index === selectedAnswer
                    ? "bg-red-600 text-white"
                    : "bg-gray-700 text-gray-400"
                  : "bg-blue-600 hover:bg-blue-700 text-white"
              }`}
              whileHover={!showResult ? { scale: 1.05 } : {}}
              whileTap={!showResult ? { scale: 0.95 } : {}}
            >
              {option}
            </motion.button>
          ))}
        </div>
      </div>

      {showResult && (
        <motion.div 
          className="text-center bg-gray-700 p-4 rounded-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <p className={`text-xl font-bold mb-2 ${
            selectedAnswer === questions[currentQuestion].correct 
              ? "text-green-400" 
              : "text-red-400"
          }`}>
            {selectedAnswer === questions[currentQuestion].correct 
              ? "✅ Correct!" 
              : "❌ Incorrect!"
            }
          </p>
          <p className="text-gray-300 text-sm">
            {questions[currentQuestion].explanation}
          </p>
        </motion.div>
      )}
    </motion.div>
  );
};

export default AlgebraQuiz;
