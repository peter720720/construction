import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Lock, ShieldCheck, Loader2, ArrowLeft } from 'lucide-react';
import axios from 'axios';

const ResetPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [formData, setFormData] = useState({ otp: '', newPassword: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Target endpoint configured explicitly for credential alteration execution
  const API_URL = 'http://localhost:5000/api/auth/reset-password';

  // Read email cached during the forgot-password step from memory
  useEffect(() => {
    const savedEmail = localStorage.getItem('resetEmail');
    if (!savedEmail) {
      setError('Session context lost. Please restart the password reset sequence.');
    } else {
      setEmail(savedEmail);
    }
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return setError('Missing identifier. Restart password recovery.');
    
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const payload = {
        email,
        otp: formData.otp.trim(),
        newPassword: formData.newPassword
      };

      const response = await axios.post(API_URL, payload);
      
      if (response.data.status === 'success' || response.data.message === 'Password reset successful!') {
        setSuccess('Password reset successful! Redirecting to credentials gateway...');
        
        // Purge operational layout memory allocations
        localStorage.removeItem('resetEmail');

        setTimeout(() => {
          navigate('/user-login');
        }, 2500);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid validation token parameters or code expired.');
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
        {/* Back Link Context Action Trigger */}
        <Link 
          to="/forgot-password" 
          className="inline-flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-zinc-400 hover:text-amber-500 transition-colors mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Resend Code</span>
        </Link>

        {/* Master Setup Header Group */}
        <div className="text-center mb-8">
          <div className="inline-flex p-3 bg-emerald-500/10 rounded-full text-emerald-500 border border-emerald-500/20 mb-3">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h1 className="text-2xl font-black tracking-tight uppercase">
            Verify <span className="text-amber-500">Security Code</span>
          </h1>
          <p className="text-xs text-zinc-400 dark:text-zinc-500 mt-2 font-medium">
            Paste the 6-digit OTP token sent to <span className="text-zinc-900 dark:text-white font-bold">{email || 'your inbox'}</span> and establish your fresh credentials.
          </p>
        </div>

        {/* Dynamic Operational System Alert Banners */}
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

        {/* Verification Handling Wrapper Form Frame */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* OTP Code Input Segment Box */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-2">
              6-Digit Verification Code (OTP)
            </label>
            <input
              type="text"
              name="otp"
              required
              maxLength={6}
              value={formData.otp}
              onChange={handleChange}
              placeholder="123456"
              className="w-full tracking-[0.5em] text-center font-black text-xl py-3 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl focus:outline-none focus:border-amber-500 dark:focus:border-amber-500 placeholder:tracking-normal placeholder:font-normal transition-colors text-zinc-900 dark:text-white"
            />
          </div>

          {/* New Password Core Parameter Field */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-2">
              New Secure Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
              <input
                type="password"
                name="newPassword"
                required
                minLength={6}
                value={formData.newPassword}
                onChange={handleChange}
                placeholder="••••••••"
                className="w-full pl-10 pr-4 py-3 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl text-sm focus:outline-none focus:border-amber-500 dark:focus:border-amber-500 transition-colors"
              />
            </div>
          </div>

          {/* Submission Processing Execution Trigger */}
          <button
            type="submit"
            disabled={loading || !email}
            className="w-full py-3.5 bg-zinc-950 dark:bg-zinc-100 text-white dark:text-zinc-950 hover:bg-amber-500 dark:hover:bg-amber-500 hover:text-zinc-950 font-bold text-xs uppercase tracking-wider rounded-xl transition-all duration-300 flex items-center justify-center space-x-2 shadow-md disabled:opacity-50"
          >
            {loading ? (
              <Loader2 className="w-4 h-4 animate-spin text-amber-500" />
            ) : (
              <span>Authorize Password Alteration</span>
            )}
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default ResetPassword;
