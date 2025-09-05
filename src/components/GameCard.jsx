import { motion } from "framer-motion";
import { Link } from "react-router-dom";

function GameCard({ title, description, path, icon }) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="bg-white/10 backdrop-blur-lg p-6 rounded-2xl shadow-lg hover:shadow-2xl transition cursor-pointer"
    >
      <Link to={path} className="block text-center">
        <div className="text-5xl mb-3">{icon}</div>
        <h2 className="text-xl font-semibold text-white">{title}</h2>
        <p className="text-gray-200 text-sm mt-2">{description}</p>
      </Link>
    </motion.div>
  );
}

export default GameCard;
