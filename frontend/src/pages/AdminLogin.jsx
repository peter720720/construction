import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShieldAlert, Mail, Lock, Loader2, KeyRound } from 'lucide-react';
import axios from 'axios';

const AdminLogin = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Target endpoint configured explicitly for Administrative Clearance Profiles
  const API_URL = 'http://localhost:5000/api/auth/admin-login';

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
      
      // Verification check matching your custom backend message definitions
      if (response.data.status === 'success' || response.data.message === 'Admin login successful!') {
        setSuccess('Admin login successful! Launching secure management workspace...');
        
        // Save operational authentication strings safely to session storage blocks
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('userRole', response.data.role);
        localStorage.setItem('adminName', response.data.data.user.name);

        setTimeout(() => {
          navigate('/admin-dashboard');
        }, 2000);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Access Denied. Invalid authorization credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-28 pb-16 flex items-center justify-center bg-zinc-950 text-zinc-50 px-4 pattern-dark">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        className="w-full max-w-md bg-zinc-900/80 backdrop-blur-md p-8 rounded-2xl border border-zinc-800 shadow-2xl relative overflow-hidden"
      >
        {/* Top Accent Warning Bar Line */}
        <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-amber-500 to-amber-600" />

        {/* Security Portal Header Group */}
        <div className="text-center mb-8">
          <div className="inline-flex p-3 bg-amber-500/10 rounded-full border border-amber-500/20 text-amber-500 mb-3">
            <ShieldAlert className="w-6 h-6" />
          </div>
          <h1 className="text-2xl font-black tracking-wider uppercase text-white">
            Admin <span className="text-amber-500">Gateway</span>
          </h1>
          <p className="text-xs text-zinc-500 mt-2 font-medium">
            Authorized building management personnel credentials verification portal.
          </p>
        </div>

        {/* Dynamic System Alert Feedback Indicators */}
        {error && (
          <div className="mb-5 p-3 bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-bold rounded-xl text-center">
            {error}
          </div>
        )}
        {success && (
          <div className="mb-5 p-3 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold rounded-xl text-center">
            {success}
          </div>
        )}

        {/* Authorization Submission Form Wrapper */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email Address Parameter Frame */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-zinc-400 mb-2">
              Management Email
            </label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                placeholder="admin@titanconstruction.com"
                className="w-full pl-10 pr-4 py-3 bg-zinc-950 border border-zinc-800 rounded-xl text-sm focus:outline-none focus:border-amber-500 text-white placeholder-zinc-600 transition-colors"
              />
            </div>
          </div>

          {/* Secure Access Password Parameter Frame */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-zinc-400">
                Security Password
              </label>
            </div>
            <div className="relative">
              <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
              <input
                type="password"
                name="password"
                required
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                className="w-full pl-10 pr-4 py-3 bg-zinc-950 border border-zinc-800 rounded-xl text-sm focus:outline-none focus:border-amber-500 text-white placeholder-zinc-600 transition-colors"
              />
            </div>
          </div>

          {/* Verification Execution Call Action Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 bg-amber-500 hover:bg-amber-600 text-zinc-950 font-black text-xs uppercase tracking-widest rounded-xl transition-all duration-300 flex items-center justify-center space-x-2 shadow-lg disabled:opacity-50 mt-2"
          >
            {loading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <>
                <span>Authorize Entry</span>
                <KeyRound className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        {/* Public Interface Fallback Exit Node Link */}
        <div className="mt-6 text-center text-xs text-zinc-500">
          Not an administrator?{' '}
          <Link to="/" className="text-amber-500 hover:underline font-bold">
            Return to Homepage
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default AdminLogin;
