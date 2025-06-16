import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import logo from '../assets/TechBid AI RB.png';
import black_arrow_icon from '../assets/black_arrow_icon.svg';

const Navbar = () => {
    const navigate = useNavigate();
    const [menuOpen, setMenuOpen] = useState(false);
    const [hovered, setHovered] = useState(false);
    const dropdownRef = useRef(null); // Ref for mobile menu

    // Close menu when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setMenuOpen(false);
            }
        };

        if (menuOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [menuOpen]);

    return (
        <motion.nav
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="h-[70px] relative w-full px-6 md:px-16 lg:px-24 xl:px-32 flex items-center justify-between z-30 bg-gradient-to-r from-black to-purple-900 shadow-lg shadow-violet-900/30 backdrop-blur-md"
        >
            {/* Logo */}
            <Link to="/" onClick={() => setMenuOpen(false)}>
                <motion.img
                    whileHover={{ scale: 1.05 }}
                    className="h-50"
                    src={logo}
                    alt="TechBid AI Logo"
                />
            </Link>

            {/* Desktop Menu */}
            <ul className="text-white md:flex hidden items-center gap-10 text-lg font-medium">
                <li><Link className="hover:text-white/70 transition" to="/">Home</Link></li>
                <li><Link className="hover:text-white/70 transition" to="/estimator">Estimator</Link></li>
                <li><Link className="hover:text-white/70 transition" to="/about">About</Link></li>
            </ul>

            {/* Get Started Button (Desktop) */}
            <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, delay: 1 }}
                onClick={() => navigate('/teach-ai')}
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
                className="hidden sm:flex px-6 py-3 text-lg font-medium cursor-pointer bg-white hover:text-purple-700 rounded-xl shadow-lg items-center gap-2 group text-black"
            >
                Teach Our AI
                <motion.span
                    initial={{ x: 0 }}
                    animate={{ x: hovered ? 6 : 0 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                    className="text-xl"
                >
                    →
                </motion.span>
            </motion.button>

            {/* Mobile Menu Toggle Button */}
            <button
                aria-label="menu-btn"
                type="button"
                onClick={() => setMenuOpen(!menuOpen)}
                className="menu-btn inline-block md:hidden active:scale-90 transition"
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30" fill="#fff">
                    <path d="M3 7a1 1 0 1 0 0 2h24a1 1 0 1 0 0-2zm0 7a1 1 0 1 0 0 2h24a1 1 0 1 0 0-2zm0 7a1 1 0 1 0 0 2h24a1 1 0 1 0 0-2z" />
                </svg>
            </button>

            {/* Mobile Menu Dropdown */}
            {menuOpen && (
                <motion.div
                    ref={dropdownRef}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="mobile-menu absolute top-[70px] left-0 w-full bg-gradient-to-r from-black to-purple-900 p-6 md:hidden z-40"
                >
                    <ul className="flex flex-col space-y-4 text-white text-lg">
                        <li><Link onClick={() => setMenuOpen(false)} to="/" className="text-sm">Home</Link></li>
                        <li><Link onClick={() => setMenuOpen(false)} to="/estimator" className="text-sm">Estimator</Link></li>
                        <li><Link onClick={() => setMenuOpen(false)} to="/about" className="text-sm">About</Link></li>
                    </ul>
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6 }}
                        className="md:hidden mt-4"
                    >
                        <Link
                            to="/teach-ai"
                            onClick={() => setMenuOpen(false)}
                            className="w-full flex items-center justify-center gap-2 bg-white text-black text-sm font-medium py-3 rounded-xl shadow-lg transition-all duration-200 hover:text-purple-700 active:scale-95"
                        >
                            Teach Our AI
                            <motion.span
                                initial={{ x: 0 }}
                                animate={{ x: hovered ? 6 : 0 }}
                                transition={{ type: 'spring', stiffness: 300 }}
                                className="text-xl"
                            >
                                →
                            </motion.span>
                        </Link>
                    </motion.div>
                </motion.div>
            )}
        </motion.nav>
    );
};

export default Navbar;
