import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { LayoutDashboard, LogOut, HardHat, FileText, Calendar } from 'lucide-react';
import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

const UserDashboard = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState('');
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Session Guard check
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('userRole');
    const savedName = localStorage.getItem('userName');

    if (!token || role !== 'user') {
      localStorage.clear();
      navigate('/user-login');
    } else {
      setUserName(savedName || 'Valued Client');
      fetchAssignedProjects();
    }
  }, [navigate]);

  const fetchAssignedProjects = async () => {
    try {
      const response = await axios.get(`${API_BASE}/api/projects`);
      if (response.data.status === 'success') {
        setProjects(response.data.data.projects);
      }
    } catch (err) {
      console.error('Error bringing projects:', err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate('/user-login');
  };

  return (
    <div className="min-h-screen pt-24 pb-12 bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-50 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Dynamic Greeting Header Card */}
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 md:p-8 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-4"
        >
          <div>
            <div className="flex items-center space-x-2 text-amber-500 mb-1 font-bold text-xs uppercase tracking-wider">
              <LayoutDashboard className="w-4 h-4" />
              <span>Client Dashboard Portal</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-black uppercase">
              Welcome Back, <span className="text-amber-500">{userName}</span>
            </h1>
            <p className="text-xs text-zinc-400 mt-1">Monitor live corporate building assignments and structural updates.</p>
          </div>
          <button 
            onClick={handleLogout}
            className="flex items-center space-x-2 px-4 py-2.5 rounded-xl border border-red-500/20 bg-red-500/5 text-red-500 hover:bg-red-500 hover:text-white font-bold text-xs uppercase tracking-wider transition-all"
          >
            <LogOut className="w-4 h-4" />
            <span>Terminate Session</span>
          </button>
        </motion.div>

        {/* Project Tracking Showcase Grid */}
        <h2 className="text-lg font-black uppercase tracking-wider mb-6">Current Operations & Completed Works</h2>
        {loading ? (
          <div className="text-center py-12 font-medium text-zinc-400">Loading tracking array nodes...</div>
        ) : projects.length === 0 ? (
          <div className="bg-white dark:bg-zinc-900 text-center py-16 border border-zinc-200 dark:border-zinc-800 rounded-2xl text-zinc-400 text-sm">
            No live projects matching tracking channels currently active.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, index) => (
              <motion.div
                key={project._id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl overflow-hidden shadow-md group"
              >
                <div className="h-48 overflow-hidden relative bg-zinc-100 dark:bg-zinc-800">
                  <img 
                    src={project.imageUrl} 
                    alt={project.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute bottom-3 left-3 bg-zinc-950/80 text-white font-bold text-[10px] uppercase tracking-wider px-2 py-1 rounded border border-zinc-800 backdrop-blur-sm">
                    {project.location}
                  </div>
                </div>
                <div className="p-5 space-y-3">
                  <h3 className="text-base font-black uppercase text-zinc-950 dark:text-white line-clamp-1">{project.title}</h3>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 line-clamp-2 leading-relaxed">{project.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
};

export default UserDashboard;
