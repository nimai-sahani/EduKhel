import { useEffect, useState } from "react";
import { openDB } from "idb";

const DB_NAME = "EduKhelDB";
const STORE_NAME = "progress";

export default function useProgress(lessons) {
  const [progress, setProgress] = useState({});

  // Initialize DB
  useEffect(() => {
    const init = async () => {
      const db = await openDB(DB_NAME, 1, {
        upgrade(db) {
          if (!db.objectStoreNames.contains(STORE_NAME)) {
            db.createObjectStore(STORE_NAME, { keyPath: "id" });
          }
        },
      });

      // Load progress for each lesson
      const allProgress = {};
      for (const lesson of lessons) {
        const record = await db.get(STORE_NAME, lesson.id);
        allProgress[lesson.id] = record ? record.progress : 0;
      }
      setProgress(allProgress);
    };
    init();
  }, [lessons]);

  // Update progress
  const completeLesson = async (lessonId) => {
    const db = await openDB(DB_NAME, 1);
    await db.put(STORE_NAME, { id: lessonId, progress: 100 });
    setProgress((prev) => ({ ...prev, [lessonId]: 100 }));
  };

  return { progress, completeLesson };
}
