import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const FloatingElement = ({ children, delay = 0, duration = 3 }) => (
  <motion.div
    animate={{
      y: [0, -20, 0],
      rotate: [0, 5, -5, 0],
    }}
    transition={{
      duration,
      repeat: Infinity,
      delay,
      ease: "easeInOut"
    }}
  >
    {children}
  </motion.div>
);

const SocialButton = ({ icon, text, onClick, color }) => (
  <motion.button
    onClick={onClick}
    className={`flex items-center justify-center px-6 py-3 rounded-full ${color} text-white font-medium hover:shadow-lg transition-all duration-300 transform hover:scale-105`}
    whileTap={{ scale: 0.95 }}
    whileHover={{ y: -2 }}
  >
    {icon}
    <span className="ml-3">{text}</span>
  </motion.button>
);

const ProgressStep = ({ step, currentStep, title }) => (
  <div className="flex items-center">
    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
      step <= currentStep 
        ? 'bg-gradient-to-r from-yellow-400 to-pink-500 text-black' 
        : 'bg-white/20 text-gray-400'
    }`}>
      {step}
    </div>
    <span className={`ml-2 text-sm ${
      step <= currentStep ? 'text-white' : 'text-gray-400'
    }`}>
      {title}
    </span>
  </div>
);

export default function Signup() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleCheckboxChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.checked
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      // Handle signup logic here
    }, 2000);
  };

  const steps = [
    { step: 1, title: "Personal Info" },
    { step: 2, title: "Account Setup" },
    { step: 3, title: "Preferences" }
  ];

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-10 left-10 w-40 h-40 bg-yellow-400 rounded-full blur-2xl opacity-20 animate-pulse"></div>
        <div className="absolute top-32 right-20 w-56 h-56 bg-purple-500 rounded-full blur-3xl opacity-15 animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-20 left-1/4 w-48 h-48 bg-pink-500 rounded-full blur-2xl opacity-20 animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-32 right-10 w-44 h-44 bg-cyan-400 rounded-full blur-2xl opacity-15 animate-pulse" style={{ animationDelay: '0.5s' }}></div>
      </div>

      {/* Floating Adventure Elements */}
      <FloatingElement delay={0}>
        <div className="absolute top-1/5 left-1/5 text-7xl opacity-20">⚔️</div>
      </FloatingElement>
      <FloatingElement delay={1}>
        <div className="absolute top-1/4 right-1/5 text-6xl opacity-20">🗺️</div>
      </FloatingElement>
      <FloatingElement delay={2}>
        <div className="absolute bottom-1/4 left-1/6 text-5xl opacity-20">🏰</div>
      </FloatingElement>
      <FloatingElement delay={0.5}>
        <div className="absolute bottom-1/3 right-1/6 text-6xl opacity-20">⚡</div>
      </FloatingElement>

      <div className="w-full max-w-lg relative z-10">
        {/* Main Signup Card */}
        <motion.div
          className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl p-8 relative overflow-hidden"
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {/* Card Background Pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-yellow-400 via-purple-500 to-pink-500"></div>
            <div className="absolute top-6 left-6 w-12 h-12 border-2 border-white rounded-full"></div>
            <div className="absolute top-12 right-12 w-8 h-8 border-2 border-white rounded-full"></div>
            <div className="absolute bottom-12 left-12 w-6 h-6 border-2 border-white rounded-full"></div>
            <div className="absolute bottom-6 right-6 w-16 h-16 border-2 border-white rounded-full"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-20 h-20 border-2 border-white rounded-full"></div>
          </div>

          {/* Header */}
          <div className="text-center mb-8 relative z-10">
            <motion.div
              className="inline-block mb-4"
              animate={{ 
                rotate: [0, 10, -10, 0],
                scale: [1, 1.1, 1]
              }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <div className="w-20 h-20 bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600 rounded-full flex items-center justify-center text-3xl">
                🚀
              </div>
            </motion.div>
            <h1 className="text-4xl font-bold text-white mb-2">
              Begin Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-pink-500">Quest!</span>
            </h1>
            <p className="text-gray-300 text-sm">
              Join thousands of learners on their educational adventure
            </p>
          </div>

          {/* Progress Steps */}
          <motion.div
            className="flex justify-center mb-8 space-x-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            {steps.map((step) => (
              <ProgressStep
                key={step.step}
                step={step.step}
                currentStep={currentStep}
                title={step.title}
              />
            ))}
          </motion.div>

          {/* Signup Form */}
          <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 gap-4"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all duration-300"
                  placeholder="Enter your full name"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all duration-300"
                  placeholder="Enter your email"
                  required
                />
              </div>
            </motion.div>

            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 gap-4"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all duration-300 pr-12"
                    placeholder="Create password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                  >
                    {showPassword ? "🙈" : "👁️"}
                  </button>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Confirm Password
                </label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all duration-300 pr-12"
                    placeholder="Confirm password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                  >
                    {showConfirmPassword ? "🙈" : "👁️"}
                  </button>
                </div>
              </div>
            </motion.div>

            <motion.div
              className="flex items-start"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
            >
              <input
                type="checkbox"
                name="agreeToTerms"
                checked={formData.agreeToTerms}
                onChange={handleCheckboxChange}
                className="w-4 h-4 text-yellow-400 bg-white/10 border-white/20 rounded focus:ring-yellow-400 mt-1"
                required
              />
              <label className="ml-3 text-sm text-gray-300">
                I agree to the{" "}
                <a href="#" className="text-yellow-400 hover:text-yellow-300 transition-colors">
                  Terms of Service
                </a>{" "}
                and{" "}
                <a href="#" className="text-yellow-400 hover:text-yellow-300 transition-colors">
                  Privacy Policy
                </a>
              </label>
            </motion.div>

            <motion.button
              type="submit"
              disabled={isLoading || !formData.agreeToTerms}
              className="w-full bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600 text-black py-4 rounded-xl font-bold hover:from-yellow-500 hover:via-pink-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden"
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin mr-2"></div>
                  Creating your account...
                </div>
              ) : (
                "🗺️ Begin Your Adventure!"
              )}
            </motion.button>
          </form>

          {/* Divider */}
          <motion.div
            className="flex items-center my-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
          >
            <div className="flex-grow border-t border-gray-600"></div>
            <span className="flex-shrink mx-4 text-gray-400 text-sm">Or join with</span>
            <div className="flex-grow border-t border-gray-600"></div>
          </motion.div>

          {/* Social Signup Buttons */}
          <motion.div
            className="space-y-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
          >
            <SocialButton
              icon={<svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>}
              text="Continue with Google"
              color="bg-white/20 hover:bg-white/30"
            />
            <SocialButton
              icon={<svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>}
              text="Continue with Facebook"
              color="bg-blue-600 hover:bg-blue-700"
            />
          </motion.div>

          {/* Login Link */}
          <motion.p
            className="text-center mt-8 text-gray-300 text-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
          >
            Already have an account?{" "}
            <Link to="/login" className="text-yellow-400 hover:text-yellow-300 font-bold transition-colors">
              Sign in here! 🔑
            </Link>
          </motion.p>
        </motion.div>

        {/* Back to Home Link */}
        <motion.div
          className="text-center mt-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <Link to="/" className="text-gray-400 hover:text-white transition-colors text-sm flex items-center justify-center">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Home
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
