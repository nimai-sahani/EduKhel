import { motion } from "framer-motion";

export default function ProgressBar({ progress }) {
  return (
    <div className="w-full bg-gray-700 h-4 rounded-full mt-3 overflow-hidden">
      <motion.div
        className="bg-green-400 h-4 rounded-full"
        initial={{ width: 0 }}
        animate={{ width: `${progress}%` }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      ></motion.div>
    </div>
  );
}
