import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Target, Award, Milestone } from 'lucide-react';

const About = () => {
  return (
    <div className="min-h-screen pt-28 pb-16 bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-50 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* 1. Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-block px-3 py-1.5 bg-amber-500/10 text-amber-500 rounded-full font-bold text-[10px] uppercase tracking-widest mb-4"
          >
            Our Corporate Identity
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl sm:text-5xl font-black uppercase tracking-tight mb-4"
          >
            Engineering With <span className="text-amber-500">Absolute Precision</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-sm text-zinc-500 dark:text-zinc-400 font-medium leading-relaxed"
          >
            Titan Construction coordinates luxury properties, master planned communities, and heavy architectural complexes with premier engineering tolerances.
          </motion.p>
        </div>

        {/* 2. Core Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {[
            { icon: <ShieldCheck className="w-5 h-5" />, title: 'Elite Standard', desc: 'Strict regulatory quality tracking loops to ensure structure structural safety rules.' },
            { icon: <Target className="w-5 h-5" />, title: 'Perfect Vision', desc: 'Translating spatial concept layouts from structural design drafts into real masterworks.' },
            { icon: <Award className="w-5 h-5" />, title: 'Vetted Quality', desc: 'Oversight managed strictly by industry certified engineers and development planners.' },
            { icon: <Milestone className="w-5 h-5" />, title: 'Global Impact', desc: 'Deploying optimized commercial setups across fast-developing regional hubs.' }
          ].map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="p-6 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl space-y-4"
            >
              <div className="p-3 bg-amber-500/10 text-amber-500 rounded-xl inline-block">{item.icon}</div>
              <h3 className="text-base font-black uppercase tracking-wide">{item.title}</h3>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed font-medium">{item.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* 3. Corporate Statement Bar */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="p-8 md:p-12 bg-zinc-950 text-white rounded-3xl border border-zinc-800 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full blur-3xl" />
          <div className="max-w-3xl space-y-4">
            <h2 className="text-xl md:text-2xl font-black uppercase tracking-wide text-amber-500">Our Core Mission Statement</h2>
            <p className="text-xs md:text-sm text-zinc-400 font-medium leading-relaxed">
              We pledge to elevate infrastructural integrity by deploying leading technologies, high-grade materials, and rigorous timeline tracking frameworks. Our high-profile clients count on us to build assets that stand the test of time.
            </p>
          </div>
        </motion.div>

      </div>
    </div>
  );
};

export default About;
