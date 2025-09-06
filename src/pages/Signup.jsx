import React from 'react';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const SocialButton = ({ icon, text, onClick }) => (
    <motion.button
        onClick={onClick}
        className="flex items-center justify-center px-6 py-3 rounded-full bg-white/20 text-white font-medium hover:bg-white/30 transition-colors transform hover:scale-105 shadow-lg"
        whileTap={{ scale: 0.95 }}
    >
        {icon}
        <span className="ml-3">{text}</span>
    </motion.button>
);

const Signup = () => {
    return (
        <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-gray-900 via-indigo-900 to-blue-900 relative overflow-hidden">
            {/* Background Animations */}
            <div className="absolute inset-0 z-0">
                <div className="absolute w-80 h-80 bg-purple-600 rounded-full blur-3xl opacity-20 top-1/4 left-1/4 animate-pulse-slow"></div>
                <div className="absolute w-96 h-96 bg-indigo-600 rounded-full blur-3xl opacity-20 bottom-1/4 right-1/4 animate-pulse-medium"></div>
                <div className="absolute w-64 h-64 bg-yellow-400 rounded-full blur-3xl opacity-20 top-1/2 left-1/3 animate-pulse-fast"></div>
            </div>

            <motion.div
                className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl shadow-2xl p-8 md:p-12 w-full max-w-sm relative z-10"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.6 }}
            >
                <h1 className="text-3xl md:text-4xl font-bold text-white text-center mb-6 leading-tight">
                    <span className="text-yellow-400">Embark</span> on a New <br />
                    <span className="text-white">Adventure! ⚔️</span>
                </h1>
                
                <form className="flex flex-col gap-4">
                    <motion.input
                        type="text"
                        placeholder="Full Name"
                        className="px-4 py-3 rounded-xl bg-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                        whileFocus={{ scale: 1.02 }}
                    />
                    <motion.input
                        type="email"
                        placeholder="Email"
                        className="px-4 py-3 rounded-xl bg-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                        whileFocus={{ scale: 1.02 }}
                    />
                    <motion.input
                        type="password"
                        placeholder="Password"
                        className="px-4 py-3 rounded-xl bg-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                        whileFocus={{ scale: 1.02 }}
                    />
                    <motion.button
                        type="submit"
                        className="bg-yellow-400 text-black py-3 rounded-xl font-bold hover:bg-yellow-500 transition shadow-lg"
                        whileTap={{ scale: 0.95 }}
                    >
                        🗺️ Begin Your Quest
                    </motion.button>
                </form>

                <div className="flex items-center my-6">
                    <div className="flex-grow border-t border-gray-600"></div>
                    <span className="flex-shrink mx-4 text-gray-400 text-sm">Or brave it with</span>
                    <div className="flex-grow border-t border-gray-600"></div>
                </div>

                <div className="flex flex-col space-y-3">
                    <SocialButton
                        icon={<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c6.623 0 12 5.377 12 12s-5.377 12-12 12-12-5.377-12-12 5.377-12 12-12zm-2.43 16.58c-1.37-1.12-2.2-2.8-2.2-4.58s.83-3.46 2.2-4.58c.95-.78 2.2-1.22 3.55-1.22 1.35 0 2.6.44 3.55 1.22l-1.38 1.13c-.63-.5-1.42-.78-2.17-.78-.75 0-1.54.28-2.17.78-1.07.87-1.72 2.1-1.72 3.45s.65 2.58 1.72 3.45c.63.5 1.42.78 2.17.78.75 0 1.54-.28 2.17-.78l1.38 1.13c-.95.78-2.2 1.22-3.55 1.22-1.35 0-2.6-.44-3.55-1.22zm-2.69-5.18c.63-.51 1.42-.78 2.17-.78s1.54.28 2.17.78l1.38 1.13c-.95.78-2.2 1.22-3.55 1.22-1.35 0-2.6-.44-3.55-1.22l1.38-1.13z"/></svg>}
                        text="Google"
                    />
                    <SocialButton
                        icon={<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-2.454 18.067l-2.454-2.454c-1.846 1.846-4.856 1.846-6.702 0l-1.637-1.637c-1.846-1.846-1.846-4.856 0-6.702l2.454-2.454c1.846-1.846 4.856-1.846 6.702 0l1.637 1.637c1.846 1.846 1.846 4.856 0 6.702l-2.454 2.454z"/></svg>}
                        text="Facebook"
                    />
                </div>

                <p className="text-gray-300 text-center mt-6 text-sm">
                    Already an adventurer?{" "}
                    <Link to="/auth" className="text-yellow-400 hover:underline font-bold transition-colors">
                        Login
                    </Link>
                </p>
            </motion.div>
        </div>
    );
};

export default function SignupWrapper() {
    return (
        <Router>
            <Signup />
        </Router>
    );
}
