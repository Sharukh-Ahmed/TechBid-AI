import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

const TeachOurAI = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-indigo-800 text-white flex flex-col items-center justify-center px-4 py-16 text-center">
      <motion.h1
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-4xl md:text-5xl font-bold text-purple-200 mb-4 drop-shadow"
      >
        Teach Our AI
      </motion.h1>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 1 }}
        className="text-lg md:text-xl text-purple-100 max-w-2xl"
      >
        <p>
          Help us make TechBid AI smarter! 🧠  
          Soon, you’ll be able to train our AI with your own project data, market knowledge, and estimation experience to get even better, personalized results.
        </p>
        <div className="mt-6 flex flex-col items-center">
          <Sparkles size={48} className="text-yellow-400 animate-pulse mb-2" />
          <span className="text-2xl font-semibold text-white">
            Coming Soon!
          </span>
        </div>
      </motion.div>
    </div>
  );
};

export default TeachOurAI;
