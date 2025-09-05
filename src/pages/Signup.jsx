// src/pages/Signup.jsx
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function Signup() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 via-indigo-900 to-black relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute inset-0">
        <div className="w-80 h-80 bg-blue-600 rounded-full blur-3xl opacity-30 absolute top-16 left-16 animate-pulse"></div>
        <div className="w-80 h-80 bg-indigo-500 rounded-full blur-3xl opacity-30 absolute bottom-16 right-16 animate-pulse"></div>
      </div>

      <motion.div
        className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl shadow-2xl p-10 w-full max-w-md relative z-10"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="text-3xl font-bold text-white text-center mb-6">
          ✨ Signup for <span className="text-blue-400">EduKhel</span>
        </h1>
        <form className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Full Name"
            className="px-4 py-3 rounded-xl bg-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="email"
            placeholder="Email"
            className="px-4 py-3 rounded-xl bg-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="password"
            placeholder="Password"
            className="px-4 py-3 rounded-xl bg-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <motion.button
            type="submit"
            className="bg-blue-400 text-black py-3 rounded-xl font-bold hover:bg-blue-500 transition"
            whileTap={{ scale: 0.9 }}
          >
            🎮 Create Account
          </motion.button>
        </form>
        <p className="text-gray-300 text-center mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-400 hover:underline">
            Login
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
