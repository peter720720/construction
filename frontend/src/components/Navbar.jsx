import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { AnimatePresence, motion } from 'framer-motion';
import { Sun, Moon, Menu, X, HardHat } from 'lucide-react';

const Navbar = () => {
  const { isDarkMode, toggleTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const navLinks = [
    { title: 'Home', path: '/' },
    { title: 'About', path: '/about' },
    { title: 'Services', path: '/services' },
    { title: 'Contact', path: '/contact' },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full h-20 z-50 border-b border-zinc-200 dark:border-zinc-800 bg-white/95 dark:bg-zinc-900/95 shadow-sm transition-colors duration-300 select-none backdrop-blur-sm">      <div className="max-w-7xl mx-auto h-full px-4 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between h-full">

        {/* Logo Branding */}
        <Link to="/" className="flex items-center space-x-2 group cursor-pointer shrink-0">
          <HardHat className="w-8 h-8 text-amber-500 transform group-hover:rotate-12 transition-transform duration-300" />
          <span className="text-xl font-black uppercase tracking-wider transition-colors duration-300">
            A.ADEOYE <span className="text-amber-500">Construction</span>
          </span>
        </Link>

        {/* Wobble-Free Navigation Grid Links */}
        <div className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <Link
              key={link.title}
              to={link.path}
              className="nav-wobble-free-link transition-colors duration-200"
            >
              <span>{link.title}</span>
            </Link>
          ))}
        </div>

        {/* Action Controls */}
        <div className="hidden md:flex items-center space-x-4 shrink-0">
          <button
            onClick={toggleTheme}
            className="p-2.5 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors cursor-pointer flex items-center justify-center"
            aria-label="Toggle Theme Mode"
          >
            {isDarkMode ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5" />}
          </button>

          <button
            onClick={() => navigate('/user-login')}
            className="px-5 py-2.5 bg-zinc-950 dark:bg-zinc-100 hover:bg-amber-500 dark:hover:bg-amber-500 text-white dark:text-zinc-950 hover:text-zinc-950 font-bold text-xs uppercase tracking-wider rounded-lg transition-all duration-300 cursor-pointer"
          >
            Portal Login
          </button>
        </div>

        {/* Mobile triggers */}
        <div className="md:hidden flex items-center space-x-3 shrink-0">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 cursor-pointer"
          >
            {isDarkMode ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5" />}
          </button>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 rounded-lg text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

      </div>
    </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800 overflow-hidden"
          >
            <div className="px-4 pt-2 pb-6 space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.title}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className="block px-3 py-2.5 rounded-md font-medium text-sm cursor-pointer text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                >
                  {link.title}
                </Link>
              ))}
              <div className="pt-4 mt-2 border-t border-zinc-200 dark:border-zinc-800">
                <button
                  onClick={() => { setIsOpen(false); navigate('/user-login'); }}
                  className="w-full px-4 py-3 text-center rounded-lg bg-zinc-950 dark:bg-zinc-100 text-white dark:text-zinc-950 font-bold text-sm uppercase tracking-wider hover:bg-amber-500 dark:hover:bg-amber-500 cursor-pointer"
                >
                  Access Portal
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
