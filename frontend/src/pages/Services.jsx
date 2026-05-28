import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { HardHat, Ruler, BrickWall, Paintbrush } from 'lucide-react';
import axios from 'axios';

const Services = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPortfolios = async () => {
      try {
        // 🏗️ NATIVE VITE ENVIRONMENT VARIABLES ROUTER PIPELINE WITH PROJECTS PATH ATTACHED
        const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/projects`);
        if (response.data.status === 'success') {
          setProjects(response.data.data.projects);
        }
      } catch (err) {
        console.error('Error loading corporate services data:', err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchPortfolios();
  }, []);

  // 🛠️ Array mapping distinct assets directly out of your public root folder
  const coreCapabilities = [
    { 
      icon: <Ruler className="w-5 h-5"/>, 
      title: 'Project Planning', 
      desc: 'Detailed architectural blueprints, site engineering, and feasibility studies.',
      image: '/images.jpg' // Construction Engineer asset
    },
    { 
      icon: <BrickWall className="w-5 h-5"/>, 
      title: 'General Contracting', 
      desc: 'Erecting premium residential blocks and high-rise commercial structures.',
      image: '/download.jpg' // Construction Site Overview asset
    },
    { 
      icon: <HardHat className="w-5 h-5"/>, 
      title: 'Civil Infrastructure', 
      desc: 'Heavy industrial foundational designs and large-scale regional setups.',
      image: '/images.jpg' // Fallback to worker asset
    },
    { 
      icon: <Paintbrush className="w-5 h-5"/>, 
      title: 'Luxury Finishes', 
      desc: 'High-end interior designs, landscape integrations, and turnkey solutions.',
      image: '/download.jpg' // Fallback to site asset
    }
  ];

  return (
    <div className="min-h-screen pt-28 pb-16 bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-50 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Summary */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-block px-3 py-1.5 bg-amber-500/10 text-amber-500 rounded-full font-bold text-[10px] uppercase tracking-widest mb-4">
            Our Core Competencies
          </div>
          <h1 className="text-4xl sm:text-5xl font-black uppercase tracking-tight mb-4">
            Professional <span className="text-amber-500">Building Solutions</span>
          </h1>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 font-medium leading-relaxed">
            From pre-construction layout evaluations to commercial erections and premium architectural mockups, we coordinate every phase with expert precision.
          </p>
        </div>

        {/* Capabilities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {coreCapabilities.map((srv, idx) => (
            <div key={idx} className="bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl overflow-hidden shadow-sm group hover:border-amber-500 transition-colors duration-300">
              
              {/* Dynamic Image Router Box */}
              <div className="h-40 w-full overflow-hidden relative bg-zinc-200 dark:bg-zinc-800 border-b border-zinc-200 dark:border-zinc-800">
                <img 
                  src={srv.image} 
                  alt={srv.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                {/* Floating Icon Badge */}
                <div className="absolute top-3 right-3 p-2 bg-zinc-950/80 text-amber-500 backdrop-blur-sm rounded-xl border border-zinc-800/50">
                  {srv.icon}
                </div>
              </div>

              {/* Text Layout Block */}
              <div className="p-5 space-y-2">
                <h3 className="text-base font-black uppercase tracking-wide text-zinc-950 dark:text-white">
                  {srv.title}
                </h3>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed font-medium">
                  {srv.desc}
                </p>
              </div>

            </div>
          ))}
        </div>

        {/* Dynamic Client Portfolio Loop Grid */}
        <h2 className="text-xl font-black uppercase tracking-wider text-zinc-950 dark:text-white mb-6 border-b border-zinc-200 dark:border-zinc-800 pb-2">
          Admin Upload Showcase Projects
        </h2>
        {loading ? (
          <div className="text-zinc-400 text-xs font-bold uppercase tracking-wider animate-pulse">Syncing architectural database nodes...</div>
        ) : projects.length === 0 ? (
          <div className="p-12 text-center text-zinc-400 border border-zinc-200 dark:border-zinc-800 rounded-2xl text-xs uppercase font-bold">
            No dynamic showcases currently published on file. Use the Admin Panel to publish.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((p) => (
              <div key={p._id} className="bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl overflow-hidden shadow-sm group">
                <div className="h-52 overflow-hidden relative">
                  <img src={p.imageUrl} alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <span className="absolute bottom-3 left-3 bg-zinc-950/80 text-white font-bold text-[10px] tracking-wider uppercase px-2 py-1 rounded border border-zinc-800">
                    {p.location}
                  </span>
                </div>
                <div className="p-5 space-y-2">
                  <h4 className="text-base font-black uppercase tracking-wide text-zinc-950 dark:text-white truncate">{p.title}</h4>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 font-medium line-clamp-2 leading-relaxed">{p.description}</p>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
};

export default Services;
