import { motion } from "framer-motion";
import MiniGameCard from "@/components/game/MiniGameCard";
import ProgressBar from "@/components/ui/ProgressBar";
import BadgePopUp from "@/components/ui/BadgePopUp";
import useProgress from "@/hooks/useProgress";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import '../i18n'; // make sure path is correct

export default function LearningHub() {
  const { t } = useTranslation(); // hook initialization

  const lessons = [
    {
      id: 1,
      title: t('maths_real_life'),
      video: "https://www.youtube.com/watch?v=cCyKFCHQaJ8",
      pdf: "/materials/maths-real-life.pdf",
      game: t('maths_puzzle'),
    },
    {
      id: 2,
      title: t('time_speed_distance'),
      video: "https://www.youtube.com/watch?v=oMwAHfqsQLo",
      pdf: "/materials/time-speed-distance.pdf",
      game: t('speed_challenge'),
    },
    {
      id: 3,
      title: t('olympiad_math'),
      video: "https://www.youtube.com/watch?v=5z52fxHzg1E",
      pdf: "/materials/olympiad-maths.pdf",
      game: t('olympiad_quiz'),
    },
  ];

  const { progress, completeLesson } = useProgress(lessons);
  const [badge, setBadge] = useState({ show: false, name: "" });

  const handleCompleteLesson = (lessonId, lessonName) => {
    completeLesson(lessonId);
    setBadge({ show: true, name: `${lessonName} ${t('badge')}` });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-800 to-pink-700 text-white px-6 py-12">
      {/* Badge PopUp */}
      <BadgePopUp
        show={badge.show}
        badgeName={badge.name}
        onClose={() => setBadge({ show: false, name: "" })}
      />

      {/* Main Heading */}
      <motion.h1
        className="text-5xl font-extrabold text-center mb-12 drop-shadow-lg"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
      >
        {t('welcome')} 🌟
      </motion.h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {lessons.map((lesson) => (
          <motion.div
            key={lesson.id}
            className="bg-gradient-to-tr from-black via-gray-800 to-gray-900 rounded-3xl shadow-2xl p-5 flex flex-col justify-between transform transition duration-500 hover:scale-105 hover:rotate-1 hover:shadow-3xl"
            whileHover={{ scale: 1.05, rotate: 0 }}
          >
            {/* Video */}
            <motion.iframe
              src={lesson.video}
              title={lesson.title}
              width="100%"
              height="200"
              className="rounded-xl mb-4 shadow-lg border-2 border-yellow-400"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              allowFullScreen
            ></motion.iframe>

            {/* Lesson Title */}
            <h2 className="font-extrabold text-xl mb-2">{lesson.title}</h2>

            {/* PDF Download */}
            <motion.a
              href={lesson.pdf}
              download
              className="bg-yellow-400 text-black font-bold text-center py-2 rounded-lg mb-3 shadow-md hover:bg-yellow-500 hover:scale-105 transition"
              whileHover={{ scale: 1.05 }}
            >
              {t('download_pdf')}
            </motion.a>

            {/* Mini Game Card */}
            <MiniGameCard
              title={lesson.game}
              onStart={() => handleCompleteLesson(lesson.id, lesson.title)}
            />

            {/* Progress Bar */}
            <ProgressBar progress={progress[lesson.id] || 0} />
          </motion.div>
        ))}
      </div>
    </div>
  );
}
