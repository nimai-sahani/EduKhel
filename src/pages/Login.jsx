// src/pages/Login.jsx
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function Login() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-900 via-purple-900 to-black relative overflow-hidden">
      {/* Background animation bubbles */}
      <div className="absolute inset-0">
        <div className="w-72 h-72 bg-purple-600 rounded-full blur-3xl opacity-30 absolute top-10 left-10 animate-pulse"></div>
        <div className="w-72 h-72 bg-indigo-600 rounded-full blur-3xl opacity-30 absolute bottom-10 right-10 animate-pulse"></div>
      </div>

      <motion.div
        className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl shadow-2xl p-10 w-full max-w-md relative z-10"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-3xl font-bold text-white text-center mb-6">
          🔑 Login to <span className="text-yellow-400">EduKhel</span>
        </h1>
        <form className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="Email"
            className="px-4 py-3 rounded-xl bg-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
          <input
            type="password"
            placeholder="Password"
            className="px-4 py-3 rounded-xl bg-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
          <motion.button
            type="submit"
            className="bg-yellow-400 text-black py-3 rounded-xl font-bold hover:bg-yellow-500 transition"
            whileTap={{ scale: 0.9 }}
          >
            🚀 Login
          </motion.button>
        </form>
        <p className="text-gray-300 text-center mt-4">
          Don’t have an account?{" "}
          <Link to="/signup" className="text-yellow-400 hover:underline">
            Signup
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
