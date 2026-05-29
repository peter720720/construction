import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { Sun, Moon, HardHat } from 'lucide-react';

const Navbar = () => {
  const { isDarkMode, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const navLinks = [
    { title: 'Home', path: '/' },
    { title: 'About', path: '/about' },
    { title: 'Services', path: '/services' },
    { title: 'Contact', path: '/contact' },
  ];

  return (
    <>
      <nav className="fixed top-0 left-0 w-full z-50 border-b border-zinc-200 dark:border-zinc-800 bg-white/95 dark:bg-zinc-900/95 shadow-sm transition-colors duration-300 select-none backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">

            {/* Logo Branding */}
            <Link to="/" className="flex items-center space-x-2 group cursor-pointer shrink-0">
              <HardHat className="w-8 h-8 text-amber-500 transform group-hover:rotate-12 transition-transform duration-300" />
              <span className="text-lg md:text-xl font-black uppercase tracking-wider transition-colors duration-300">
                A.ADEOYE <span className="text-amber-500">Construction</span>
              </span>
            </Link>

            {/* Desktop Navigation Links */}
            <div className="hidden lg:flex items-center space-x-8 text-sm">
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
            <div className="flex items-center space-x-4 shrink-0">
              <button
                onClick={toggleTheme}
                className="p-2.5 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors cursor-pointer flex items-center justify-center"
                aria-label="Toggle Theme Mode"
              >
                {isDarkMode ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5" />}
              </button>

              <button
                onClick={() => navigate('/user-login')}
                className="hidden lg:inline-flex px-5 py-2.5 bg-zinc-950 dark:bg-zinc-100 hover:bg-amber-500 dark:hover:bg-amber-500 text-white dark:text-zinc-950 hover:text-zinc-950 font-bold text-xs uppercase tracking-wider rounded-lg transition-all duration-300 cursor-pointer"
              >
                SIGN IN
              </button>
            </div>

          </div>
        </div>
      </nav>

      {/* Mobile bottom navigation bar */}
      <div className="lg:hidden fixed bottom-0 left-0 w-full z-50 bg-white dark:bg-zinc-900 border-t border-zinc-200 dark:border-zinc-800">
        <div className="max-w-7xl mx-auto px-3 sm:px-4">
          <div className="flex gap-2 py-3 pb-4">
            {navLinks.map((link) => (
              <Link
                key={link.title}
                to={link.path}
                className="flex-1 text-center rounded-full px-3 py-2 text-sm font-semibold text-zinc-700 dark:text-zinc-300 bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition"
              >
                {link.title}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
