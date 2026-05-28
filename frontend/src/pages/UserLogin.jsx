import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Lock, Loader2, LogIn } from 'lucide-react';
import axios from 'axios';

const UserLogin = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // 🏗️ DYNAMICALLY INJECT YOUR LIVE RENDER BASE ENVIRONMENT URL VARIABLE HERE
  const API_URL = `${import.meta.env.VITE_API_BASE_URL}/api/auth/user-login`;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const response = await axios.post(API_URL, formData);
      
      // Verification tracking for backend message definition matching matches
      if (response.data.status === 'success' || response.data.message === 'Login successful!') {
        setSuccess('Login successful! Accessing secure workspace dashboard...');
        
        // Save operational authentication strings safely to localStorage
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('userRole', response.data.role);
        localStorage.setItem('userName', response.data.data.user.name);

        setTimeout(() => {
          navigate('/user-dashboard');
        }, 2000);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid credentials. Please verify details.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-28 pb-16 flex items-center justify-center bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-50 transition-colors duration-300 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="w-full max-w-md bg-white dark:bg-zinc-900 p-8 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-xl"
      >
        {/* Core Sign-In Header Group */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-black tracking-tight uppercase">
            Client <span className="text-amber-500">Sign In</span>
          </h1>
          <p className="text-xs text-zinc-400 dark:text-zinc-500 mt-2 font-medium">
            Welcome back. Authenticate credentials to enter your management deck.
          </p>
        </div>

        {/* Dynamic State Feedback Banners */}
        {error && (
          <div className="mb-4 p-3 bg-red-500/10 border border-red-500/30 text-red-500 text-xs font-bold rounded-lg text-center">
            {error}
          </div>
        )}
        {success && (
          <div className="mb-4 p-3 bg-emerald-500/10 border border-emerald-500/30 text-emerald-500 text-xs font-bold rounded-lg text-center">
            {success}
          </div>
        )}

        {/* Sign In Execution Form Wrapper Node */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email Coordinates Input Frame */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-2">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                placeholder="client@example.com"
                className="w-full pl-10 pr-4 py-3 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl text-sm focus:outline-none focus:border-amber-500 dark:focus:border-amber-500 transition-colors"
              />
            </div>
          </div>

          {/* Password Parameter Input Frame */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                Password
              </label>
              <Link to="/forgot-password" className="text-xs text-amber-500 font-bold hover:underline">
                Forgot Password?
              </Link>
            </div>
            <div className="relative">
              <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
              <input
                type="password"
                name="password"
                required
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                className="w-full pl-10 pr-4 py-3 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl text-sm focus:outline-none focus:border-amber-500 dark:focus:border-amber-500 transition-colors"
              />
            </div>
          </div>

          {/* Submission Verification Execution Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 bg-zinc-950 dark:bg-zinc-100 text-white dark:text-zinc-950 hover:bg-amber-500 dark:hover:bg-amber-500 hover:text-zinc-950 font-bold text-xs uppercase tracking-wider rounded-xl transition-all duration-300 flex items-center justify-center space-x-2 shadow-md disabled:opacity-50"
          >
            {loading ? (
              <Loader2 className="w-4 h-4 animate-spin text-amber-500" />
            ) : (
              <>
                <span>Sign Into Account</span>
                <LogIn className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        {/* Alternate Routing Redirection Link Parameters Block */}
        <div className="mt-6 text-center text-xs text-zinc-500 dark:text-zinc-400">
          New to the platform?{' '}
          <Link to="/user-signup" className="text-amber-500 hover:underline font-bold">
            Create Account Here
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default UserLogin;
