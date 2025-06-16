import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useState } from 'react';

export default function LandingPage() {
  const navigate = useNavigate();
  const [hovered, setHovered] = useState();

  return (
    <div className="h-screen w-full bg-gradient-to-b from-purple-900 via-black to-gray-900 text-white flex flex-col justify-center items-center px-4 relative overflow-hidden">
      {/* Animated Background Effect (Optional placeholder) */}
      <div className="absolute inset-0 z-0 animate-pulse bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-800/10 via-transparent to-transparent" />

      <motion.h1
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-5xl md:text-6xl font-bold text-center z-10"
      >
        TechBid AI
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
        className="text-lg md:text-xl text-center mt-4 max-w-2xl z-10"
      >
        Get real-time market-based price estimates for any item using our smart AI-powered calculator. Useful for bidding, procurement, and estimation needs.
      </motion.p>

    <motion.button
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1, delay: 1 }}
      onClick={() => navigate('/estimator')}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="mt-8 z-10 px-6 py-3 text-lg font-medium cursor-pointer bg-purple-600 hover:bg-purple-700 rounded-xl shadow-lg flex items-center gap-2 group text-white"
    >
      Get Estimations
      <motion.span
        initial={{ x: 0 }}
        animate={{ x: hovered ? 6 : 0 }}
        transition={{ type: 'spring', stiffness: 300 }}
        className="text-xl"
      >
        →
      </motion.span>
    </motion.button>
    </div>
  );
}
