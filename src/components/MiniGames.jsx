import { useState } from "react";
import { motion } from "framer-motion";

// Reusable Question Component
const Question = ({ question, options, correct, onAnswer }) => {
  const [selected, setSelected] = useState(null);

  const handleClick = (option) => {
    setSelected(option);
    setTimeout(() => {
      onAnswer(option === correct);
      setSelected(null);
    }, 1000);
  };

  return (
    <div className="p-4 bg-gray-800 rounded-xl mb-4">
      <h3 className="text-lg font-semibold mb-3">{question}</h3>
      <div className="grid grid-cols-2 gap-3">
        {options.map((opt, idx) => (
          <button
            key={idx}
            onClick={() => handleClick(opt)}
            className={`p-2 rounded-lg ${
              selected === opt
                ? opt === correct
                  ? "bg-green-600"
                  : "bg-red-600"
                : "bg-gray-700 hover:bg-gray-600"
            }`}
          >
            {opt}
          </button>
        ))}
      </div>
    </div>
  );
};

// 1. Math Game
export const MathGame = () => {
  const [score, setScore] = useState(0);
  const questions = [
    { q: "Solve: 5x = 20", options: ["2", "4", "5", "10"], correct: "4" },
    { q: "Solve: 2x + 3 = 7", options: ["1", "2", "3", "4"], correct: "2" },
  ];

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Math Challenge 🧮</h2>
      <p className="mb-2">Score: {score}</p>
      {questions.map((ques, i) => (
        <Question
          key={i}
          question={ques.q}
          options={ques.options}
          correct={ques.correct}
          onAnswer={(isCorrect) => setScore((s) => s + (isCorrect ? 1 : 0))}
        />
      ))}
    </div>
  );
};

// 2. Science Game
export const ScienceGame = () => {
  const [score, setScore] = useState(0);
  const questions = [
    { q: "Symbol of Sodium?", options: ["S", "So", "Na", "Sn"], correct: "Na" },
    { q: "Symbol of Gold?", options: ["Ag", "Au", "Go", "Gd"], correct: "Au" },
  ];

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Periodic Table Quest ⚛️</h2>
      <p className="mb-2">Score: {score}</p>
      {questions.map((ques, i) => (
        <Question
          key={i}
          question={ques.q}
          options={ques.options}
          correct={ques.correct}
          onAnswer={(isCorrect) => setScore((s) => s + (isCorrect ? 1 : 0))}
        />
      ))}
    </div>
  );
};

// 3. History Game
export const HistoryGame = () => {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">History Duel 🏰</h2>
      <p>Arrange these events in order: </p>
      <ul className="list-disc pl-6">
        <li>World War I</li>
        <li>French Revolution</li>
        <li>World War II</li>
      </ul>
      <p className="mt-2 text-gray-400">👉 (Interactive drag & drop coming soon)</p>
    </div>
  );
};

// 4. Grammar Game
export const GrammarGame = () => {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Grammar Galaxy ✍️</h2>
      <p>Find the error: “He go to school everyday.”</p>
      <p className="mt-2 text-green-400">✅ Correct: “He goes to school every day.”</p>
    </div>
  );
};

// 5. Code Game
export const CodeGame = () => {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Code Crusader 💻</h2>
      <p>What will this output?</p>
      <pre className="bg-gray-900 p-2 rounded-md text-sm">
        {`let x = 5;
console.log(x * 2);`}
      </pre>
      <p className="mt-2">👉 Answer: 10</p>
    </div>
  );
};

// 6. Physics Game
export const PhysicsGame = () => {
  const [force, setForce] = useState(null);
  const calculateForce = () => {
    const mass = 10;
    const acc = 2;
    setForce(mass * acc);
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Physics Forcefield ⚡</h2>
      <button
        onClick={calculateForce}
        className="bg-blue-600 px-4 py-2 rounded-lg"
      >
        Calculate Force (m=10, a=2)
      </button>
      {force && <p className="mt-2">Force = {force} N</p>}
    </div>
  );
};

// 7. Geography Game
export const GeographyGame = () => {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Global Explorer 🌍</h2>
      <p>Flag Quiz coming soon 🏳️</p>
    </div>
  );
};

// 8. Universe Game
export const UniverseGame = () => {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Cosmic Voyager 🚀</h2>
      <p>Which is the largest planet?</p>
      <p className="text-green-400 mt-2">✅ Jupiter</p>
    </div>
  );
};

// 9. Communication Game
export const CommunicationGame = () => {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Communi-Quest 🗣️</h2>
      <p>Meaning of "Eloquent"?</p>
      <p className="text-green-400 mt-2">✅ Fluent or persuasive in speaking</p>
    </div>
  );
};
