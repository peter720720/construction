import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { User, Mail, Lock, Loader2, ArrowRight } from 'lucide-react';
import axios from 'axios';

const UserSignup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Universal backend base URL configuration target mapping
  const API_URL = 'https://construction-m44o.onrender.com';

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
      
      // Catches and verifies your explicit "Signup successful!" message definition
      if (response.data.status === 'success' || response.data.message === 'Signup successful!') {
        setSuccess('Signup successful! Redirecting to user login panel...');
        
        // Save token to localStorage for authenticated route parsing
        localStorage.setItem('userToken', response.data.token);
        
        setTimeout(() => {
          navigate('/user-login');
        }, 2500);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed. Please check your credentials.');
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
        {/* Registration Header Group */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-black tracking-tight uppercase">
            Create <span className="text-amber-500">Account</span>
          </h1>
          <p className="text-xs text-zinc-400 dark:text-zinc-500 mt-2 font-medium">
            Join Titan Construction to manage and monitor your structural projects.
          </p>
        </div>

        {/* Dynamic State Alert Feedback Banners */}
        {error && (
          <div className="mb-4 p-3 bg-red-500/10 border border-red-500/30 text-red-500 text-xs font-bold rounded-lg text-center animate-shake">
            {error}
          </div>
        )}
        {success && (
          <div className="mb-4 p-3 bg-emerald-500/10 border border-emerald-500/30 text-emerald-500 text-xs font-bold rounded-lg text-center">
            {success}
          </div>
        )}

        {/* Registration Form Submission Form Wrapper Node */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Full Name Input Node */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-2">
              Full Name
            </label>
            <div className="relative">
              <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
              <input
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                placeholder="John Doe"
                className="w-full pl-10 pr-4 py-3 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl text-sm focus:outline-none focus:border-amber-500 dark:focus:border-amber-500 transition-colors"
              />
            </div>
          </div>

          {/* Email Address Input Node */}
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

          {/* Account Password Input Node */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-2">
              Password
            </label>
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

          {/* Submission Execution Button Node */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 bg-zinc-950 dark:bg-zinc-100 text-white dark:text-zinc-950 hover:bg-amber-500 dark:hover:bg-amber-500 hover:text-zinc-950 font-bold text-xs uppercase tracking-wider rounded-xl transition-all duration-300 flex items-center justify-center space-x-2 shadow-md disabled:opacity-50"
          >
            {loading ? (
              <Loader2 className="w-4 h-4 animate-spin text-amber-500" />
            ) : (
              <>
                <span>Register Account</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        {/* Client Account Context Redirection Link Footer */}
        <div className="mt-6 text-center text-xs text-zinc-500 dark:text-zinc-400">
          Already have an account?{' '}
          <Link to="/user-login" className="text-amber-500 hover:underline font-bold">
            Sign In Here
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default UserSignup;
