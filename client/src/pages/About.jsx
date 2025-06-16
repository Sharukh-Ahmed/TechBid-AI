import React from 'react';
import { motion } from 'framer-motion';

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-800 to-purple-900 text-white px-6 md:px-24 py-16">
      {/* Page Heading */}
      <motion.h1
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-4xl md:text-6xl font-bold text-center mb-12"
      >
        About TechBid AI
      </motion.h1>

      {/* About the Project */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="mb-16 max-w-4xl mx-auto text-lg leading-8"
      >
        <p className="mb-6">
          <strong>TechBid AI</strong> is a smart estimation assistant designed specifically for the construction industry—including civil, mechanical, and electrical works. It streamlines the bidding process by helping contractors, estimators, and project managers generate market-aligned price estimates efficiently using AI.
        </p>
        <p>
          Built with cutting-edge technologies like React, Node.js, TailwindCSS, Framer Motion, and OpenRouter AI integrations, TechBid AI is fast, responsive, and user-friendly.
        </p>
      </motion.div>

      {/* About Me Section */}
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="max-w-4xl mx-auto bg-white/10 backdrop-blur-sm rounded-xl p-8 shadow-lg"
      >
        <h2 className="text-3xl font-semibold mb-4 text-purple-300">About Me – Sharukh Ahmed</h2>
        <p className="mb-4">
          I am a Mechanical Engineer turned Full-Stack Developer with hands-on experience in managing large industrial projects. My passion for technology led me to build digital solutions that solve real-world problems. This project merges my construction field expertise with my technical skills.
        </p>
        <p className="mb-4">
          <strong>Technical Skills:</strong> React, JavaScript, Node.js, Express, MongoDB, Tailwind CSS, Git & GitHub, REST APIs, and Framer Motion. I am continuously learning and evolving with tools like Redux and Next.js.
        </p>
        <p className="mb-4">
          <strong>Why This Project?</strong> My experience in the construction domain helped me identify the time-consuming and error-prone process of manual estimation during bidding. I built TechBid AI to automate this pain point and make estimation accessible, fast, and accurate.
        </p>
        <p className="text-purple-200 font-medium">
          I’m actively seeking frontend developer opportunities where I can contribute meaningfully, grow with a passionate team, and apply my skills to real-world applications. I bring not just technical skills but also practical problem-solving ability from the construction industry.
        </p>
      </motion.div>
    </div>
  );
};

export default About;
