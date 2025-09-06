import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const WordPuzzle = ({ onComplete }) => {
  const [currentWord, setCurrentWord] = useState('');
  const [scrambledWord, setScrambledWord] = useState('');
  const [userInput, setUserInput] = useState('');
  const [score, setScore] = useState(0);
  const [currentRound, setCurrentRound] = useState(1);
  const [gameComplete, setGameComplete] = useState(false);
  const [showHint, setShowHint] = useState(false);

  const words = [
    { word: 'EDUCATION', hint: 'The process of learning and teaching' },
    { word: 'KNOWLEDGE', hint: 'Information and understanding gained through experience' },
    { word: 'SCIENCE', hint: 'The study of the natural world through observation and experiment' },
    { word: 'MATHEMATICS', hint: 'The study of numbers, shapes, and patterns' },
    { word: 'HISTORY', hint: 'The study of past events' },
    { word: 'GEOGRAPHY', hint: 'The study of Earth and its features' },
    { word: 'LITERATURE', hint: 'Written works, especially those considered of superior artistic merit' },
    { word: 'PHYSICS', hint: 'The branch of science concerned with matter and energy' }
  ];

  useEffect(() => {
    if (currentRound <= words.length) {
      const wordData = words[currentRound - 1];
      setCurrentWord(wordData.word);
      setScrambledWord(scrambleWord(wordData.word));
      setUserInput('');
      setShowHint(false);
    } else {
      setGameComplete(true);
    }
  }, [currentRound]);

  const scrambleWord = (word) => {
    return word.split('').sort(() => Math.random() - 0.5).join('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (userInput.toUpperCase() === currentWord) {
      setScore(score + 1);
      setCurrentRound(currentRound + 1);
    } else {
      // Show error animation
      const input = document.getElementById('wordInput');
      input.classList.add('animate-pulse', 'bg-red-600');
      setTimeout(() => {
        input.classList.remove('animate-pulse', 'bg-red-600');
      }, 1000);
    }
  };

  const handleSkip = () => {
    setCurrentRound(currentRound + 1);
  };

  const resetGame = () => {
    setScore(0);
    setCurrentRound(1);
    setGameComplete(false);
    setUserInput('');
    setShowHint(false);
  };

  if (gameComplete) {
    const percentage = Math.round((score / words.length) * 100);
    return (
      <motion.div 
        className="text-center p-8"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-4xl font-bold mb-4 text-yellow-400">🎉 Word Master!</h2>
        <div className="text-6xl mb-4">
          {percentage >= 80 ? "🏆" : percentage >= 60 ? "🥈" : "🥉"}
        </div>
        <p className="text-2xl mb-4">Score: {score}/{words.length}</p>
        <p className="text-xl mb-6">Percentage: {percentage}%</p>
        <div className="flex gap-4 justify-center">
          <motion.button
            onClick={resetGame}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Play Again
          </motion.button>
          <motion.button
            onClick={onComplete}
            className="px-6 py-3 bg-green-600 text-white rounded-lg font-bold hover:bg-green-700 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Back to Games
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
      <div className="text-center mb-6">
        <h3 className="text-3xl font-bold mb-2">Word Puzzle Challenge</h3>
        <p className="text-lg text-gray-300 mb-4">Unscramble the letters to form the correct word!</p>
        <div className="flex justify-center gap-4">
          <div className="bg-blue-600 px-4 py-2 rounded-lg">
            <span className="font-bold">Round: {currentRound}/{words.length}</span>
          </div>
          <div className="bg-green-600 px-4 py-2 rounded-lg">
            <span className="font-bold">Score: {score}</span>
          </div>
        </div>
      </div>

      <div className="bg-gray-800 p-6 rounded-xl mb-6">
        <div className="text-center mb-6">
          <h4 className="text-xl font-semibold mb-4">Scrambled Word:</h4>
          <div className="text-4xl font-bold text-yellow-400 mb-4 tracking-widest">
            {scrambledWord}
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Your Answer:</label>
            <input
              id="wordInput"
              type="text"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value.toUpperCase())}
              className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white text-center text-xl font-bold focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Type your answer here..."
              autoComplete="off"
            />
          </div>

          <div className="flex gap-4">
            <motion.button
              type="submit"
              className="flex-1 bg-green-600 text-white py-3 px-4 rounded-lg font-bold hover:bg-green-700 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Submit Answer
            </motion.button>
            <motion.button
              type="button"
              onClick={handleSkip}
              className="flex-1 bg-gray-600 text-white py-3 px-4 rounded-lg font-bold hover:bg-gray-700 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Skip
            </motion.button>
          </div>
        </form>

        <div className="text-center mt-4">
          <motion.button
            onClick={() => setShowHint(!showHint)}
            className="text-blue-400 hover:text-blue-300 underline"
            whileHover={{ scale: 1.05 }}
          >
            {showHint ? 'Hide Hint' : 'Show Hint'}
          </motion.button>
          {showHint && (
            <motion.p 
              className="mt-2 text-gray-300 italic"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              {words[currentRound - 1]?.hint}
            </motion.p>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default WordPuzzle;
