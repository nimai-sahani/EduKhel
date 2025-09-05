// src/pages/LearningHub.jsx
import { motion } from "framer-motion";
import { useState } from "react";

export default function LearningHub() {
  const lessons = [
    {
      title: "English Grammar Basics - Dear Sir",
      video: "https://www.youtube.com/embed/UuGpm01SPcA",
      pdf: "/materials/english-grammar.pdf",
      game: "Mini Quiz: Identify Parts of Speech",
    },
    {
      title: "Tenses Made Easy - Dear Sir",
      video: "https://www.youtube.com/embed/2pVQYtI0a1E",
      pdf: "/materials/tenses-notes.pdf",
      game: "Mini Quiz: Tense Practice",
    },
    {
      title: "Maths Tricks for Exams",
      video: "https://www.youtube.com/embed/kbZs9pXdH7E",
      pdf: "/materials/maths-shortcuts.pdf",
      game: "Puzzle: Solve Maths Tricks",
    },
  ];

  const [completed, setCompleted] = useState(
    Array(lessons.length).fill({ video: false, pdf: false, game: false })
  );

  const handleComplete = (lessonIdx, type) => {
    const newCompleted = [...completed];
    newCompleted[lessonIdx] = { ...newCompleted[lessonIdx], [type]: true };
    setCompleted(newCompleted);
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-700 to-purple-900 text-white px-6 py-12">
      <motion.h1
        className="text-4xl font-extrabold text-center mb-8"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
      >
        📚 Learning Hub
      </motion.h1>

      {/* Progress Tracker */}
      <div className="mb-12">
        {lessons.map((lesson, idx) => {
          const progress =
            (Object.values(completed[idx]).filter(Boolean).length / 3) * 100;
          return (
            <div key={idx} className="mb-4">
              <p className="font-semibold">{lesson.title}</p>
              <div className="w-full bg-gray-300 h-3 rounded-full overflow-hidden">
                <motion.div
                  className="bg-green-400 h-3"
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.5 }}
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* Lessons */}
      <div className="space-y-12">
        {lessons.map((lesson, idx) => (
          <motion.div
            key={idx}
            className="flex flex-col md:flex-row gap-6 items-start bg-black bg-opacity-30 p-6 rounded-xl shadow-xl"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            {/* Video */}
            <div className="md:w-1/3 w-full rounded-xl overflow-hidden shadow-lg">
              <iframe
                width="100%"
                height="200"
                src={lesson.video}
                title={lesson.title}
                allowFullScreen
                className="rounded-xl"
                onLoad={() => handleComplete(idx, "video")}
              ></iframe>
              <p className="p-3 text-lg font-semibold">{lesson.title}</p>
            </div>

            {/* PDF */}
            <motion.a
              href={lesson.pdf}
              download
              onClick={() => handleComplete(idx, "pdf")}
              className={`md:w-1/3 w-full p-6 rounded-xl shadow-md flex items-center justify-center text-center font-semibold cursor-pointer transition ${
                completed[idx].pdf
                  ? "bg-yellow-500 text-black"
                  : "bg-white text-black hover:bg-yellow-300"
              }`}
              whileHover={{ scale: 1.05 }}
            >
              📘 {lesson.title} Notes
            </motion.a>

            {/* Game / Quiz */}
            <motion.div
              onClick={() => handleComplete(idx, "game")}
              className={`md:w-1/3 w-full p-6 rounded-xl shadow-md flex items-center justify-center text-center font-semibold cursor-pointer transition ${
                completed[idx].game
                  ? "bg-green-600"
                  : "bg-green-500 hover:bg-green-600"
              }`}
              whileHover={{ scale: 1.05, y: -3 }}
            >
              🎮 {lesson.game}
            </motion.div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
