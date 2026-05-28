import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Loader2, Key, ArrowLeft } from 'lucide-react';
import axios from 'axios';

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Target endpoint configured with environment base URL (falls back to localhost)
  const API_URL = `${import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000'}/api/auth/forgot-password`;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const response = await axios.post(API_URL, { email });
      
      if (response.data.status === 'success') {
        setSuccess('Verification OTP code dispatched to mailbox! Redirecting...');
        
        // Temporarily save the email in local storage for the next verification step
        localStorage.setItem('resetEmail', email);

        setTimeout(() => {
          navigate('/reset-password');
        }, 2000);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to dispatch verification code. Please retry.');
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
        {/* Back Link Trigger Node */}
        <Link 
          to="/user-login" 
          className="inline-flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-zinc-400 hover:text-amber-500 transition-colors mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Login</span>
        </Link>

        {/* Form Header Typography Group */}
        <div className="text-center mb-8">
          <div className="inline-flex p-3 bg-amber-500/10 rounded-full text-amber-500 border border-amber-500/20 mb-3">
            <Key className="w-6 h-6" />
          </div>
          <h1 className="text-2xl font-black tracking-tight uppercase">
            Recover <span className="text-amber-500">Password</span>
          </h1>
          <p className="text-xs text-zinc-400 dark:text-zinc-500 mt-2 font-medium">
            Enter your email handle below. We will send you a 6-digit security code to reset your access.
          </p>
        </div>

        {/* Dynamic Alert Status Feedback Banners */}
        {error && (
          <div className="mb-5 p-3 bg-red-500/10 border border-red-500/30 text-red-500 text-xs font-bold rounded-lg text-center">
            {error}
          </div>
        )}
        {success && (
          <div className="mb-5 p-3 bg-emerald-500/10 border border-emerald-500/30 text-emerald-500 text-xs font-bold rounded-lg text-center">
            {success}
          </div>
        )}

        {/* Transmission Input Form Field Wrapper */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-2">
              Registered Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => { setEmail(e.target.value); if (error) setError(''); }}
                placeholder="client@example.com"
                className="w-full pl-10 pr-4 py-3 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl text-sm focus:outline-none focus:border-amber-500 dark:focus:border-amber-500 transition-colors"
              />
            </div>
          </div>

          {/* Submission Execution Button Component */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 bg-zinc-950 dark:bg-zinc-100 text-white dark:text-zinc-950 hover:bg-amber-500 dark:hover:bg-amber-500 hover:text-zinc-950 font-bold text-xs uppercase tracking-wider rounded-xl transition-all duration-300 flex items-center justify-center space-x-2 shadow-md disabled:opacity-50"
          >
            {loading ? (
              <Loader2 className="w-4 h-4 animate-spin text-amber-500" />
            ) : (
              <span>Request Verification Code</span>
            )}
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default ForgotPassword;
