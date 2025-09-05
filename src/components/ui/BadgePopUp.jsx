import { motion, AnimatePresence } from "framer-motion";
import Confetti from "react-confetti";
import { useEffect, useState } from "react";

export default function BadgePopUp({ show, onClose, badgeName }) {
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    setWindowSize({ width: window.innerWidth, height: window.innerHeight });
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <>
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white text-black p-8 rounded-3xl shadow-2xl text-center relative"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
            >
              <h2 className="text-2xl font-extrabold mb-2">🏆 Badge Unlocked!</h2>
              <p className="text-lg font-semibold">{badgeName}</p>
              <button
                onClick={onClose}
                className="mt-4 px-4 py-2 bg-green-500 text-white rounded-lg font-bold hover:bg-green-600"
              >
                Close
              </button>
            </motion.div>
          </motion.div>
          <Confetti width={windowSize.width} height={windowSize.height} />
        </>
      )}
    </AnimatePresence>
  );
}
