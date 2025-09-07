import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Navbar = ({ isLoggedIn, onLoginToggle, onLogout }) => {
    return (
        <motion.nav
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ type: "spring", stiffness: 120, damping: 20 }}
            className="fixed top-0 left-0 w-full z-50 bg-gray-900 bg-opacity-80 backdrop-blur-lg shadow-xl p-4 flex justify-between items-center"
        >
            {/* Logo Section */}
            <div className="flex items-center space-x-2">
                <img
                    src="src/assets/EduKhel_Logo.jpg"
                    alt="EduKhel Logo"
                    className="w-10 h-10 rounded-full border-2 border-yellow-400"
                />
                <span className="text-2xl font-bold tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-yellow-400">
                    EduKhel
                </span>
            </div>

            {/* Navigation Links */}
            <div className="hidden md:flex items-center space-x-6 text-lg font-medium">
                <Link to="/" className="text-gray-300 hover:text-white transition-colors">
                    Home
                </Link>
                <Link to="/dashboard" className="text-gray-300 hover:text-white transition-colors">
                    Dashboard
                </Link>

                {isLoggedIn ? (
                    <>
                        {/* Profile Icon */}
                        <Link to="/profile">
                            <motion.button
                                className="p-2 rounded-full bg-purple-600 hover:bg-purple-700 transition-colors transform hover:scale-110 shadow-lg"
                                whileTap={{ scale: 0.9 }}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.121 17.804A7.96 7.96 0 0112 15c2.251 0 4.359.79 6.096 2.052M12 12a4 4 0 100-8 4 4 0 000 8z" />
                                </svg>
                            </motion.button>
                        </Link>
                        {/* Logout Button */}
                        <motion.button
                            onClick={onLogout}
                            className="px-6 py-2 rounded-full text-white font-semibold bg-red-600 hover:bg-red-700 transition-colors transform hover:scale-105 shadow-md"
                            whileTap={{ scale: 0.95 }}
                        >
                            Logout
                        </motion.button>
                    </>
                ) : (
                    <>
                        {/* Combined Login/Signup Button with redirection */}
                        <Link to="/Login">
                            <motion.button
                                onClick={onLoginToggle}
                                className="px-6 py-2 rounded-full text-white font-semibold bg-gradient-to-r from-green-500 to-lime-500 hover:from-green-600 hover:to-lime-600 transition-colors transform hover:scale-105 shadow-md"
                                whileTap={{ scale: 0.95 }}
                            >
                                Login / Sign Up
                            </motion.button>
                        </Link>
                    </>
                )}
            </div>

            {/* Mobile Menu (hamburger) - Placeholder */}
            <div className="md:hidden">
                <button className="text-white text-3xl focus:outline-none">
                    ☰
                </button>
            </div>
        </motion.nav>
    );
};

export default Navbar;
