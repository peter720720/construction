import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Building2, Shield, Hammer, Users } from 'lucide-react';

const Home = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-white dark:bg-zinc-950 text-zinc-950 dark:text-white transition-colors duration-300">

            {/* 1. HERO CORE HERO CALLOUT BANNER SEGMENT */}
            <section className="relative min-h-screen flex items-center justify-center px-4 pt-20 bg-gradient-to-b from-zinc-200 to-zinc-50 dark:from-zinc-900 dark:to-zinc-950 transition-all duration-300">
                <div className="max-w-5xl mx-auto text-center space-y-6 z-10">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6 }}
                        className="inline-flex items-center space-x-2 bg-amber-500/10 border border-amber-500/20 text-amber-500 font-black text-[10px] uppercase tracking-widest px-3 py-1.5 rounded-full"
                    >
                        <Building2 className="w-3.5 h-3.5" />
                        <span>BUILDING THE FUTURE</span>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 25 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.15 }}
                        className="text-4xl sm:text-6xl lg:text-7xl font-black uppercase tracking-tight leading-none text-zinc-950 dark:text-white"
                    >
                       WE BUILD <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-yellow-600">LANDMARKS THAT LAST</span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        className="max-w-2xl mx-auto text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 font-medium leading-relaxed"
                    >
                        “We deliver modern construction solutions designed with precision, durability, and excellence — creating structures that stand strong for generations.”
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.45 }}
                        className="pt-4"
                    >
                        <button
                            onClick={() => navigate('/user-signup')}
                            className="px-8 py-4 bg-zinc-950 dark:bg-zinc-100 text-white dark:text-zinc-950 hover:bg-amber-500 dark:hover:bg-amber-500 hover:text-zinc-950 font-black text-xs uppercase tracking-widest rounded-xl transition-all duration-300 shadow-xl inline-flex items-center space-x-3 cursor-pointer"
                        >
                            <span>START YOUR PROJECT</span>
                            <ArrowRight className="w-4 h-4 text-amber-500" />
                        </button>

                    </motion.div>
                </div>
            </section>

            {/* 2. CORPORATE CORE VALUES AND METRICS SUMMARY */}
            <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {[
                        { icon: <Shield className="w-6 h-6" />, title: 'QUALITY ASSURANCE', desc: 'Every project undergoes rigorous quality inspections to ensure durability, safety, and compliance with industry standards..' },
                        { icon: <Hammer className="w-6 h-6" />, title: 'PROJECT MANAGEMENT', desc: 'Our experienced project managers oversee planning, execution, and delivery to ensure projects stay on schedule and within budget.' },
                        { icon: <Users className="w-6 h-6" />, title: 'SUSTAINABLE BUILDING', desc: 'We implement environmentally responsible construction practices and energy-efficient solutions for long-term value.' }
                    ].map((item, index) => (
                        <motion.div
                            key={item.title}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.15 }}
                            className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-6 rounded-2xl shadow-sm space-y-3 group hover:border-amber-500 transition-colors"
                        >
                            <div className="p-3 bg-zinc-100 dark:bg-zinc-800 rounded-xl text-amber-500 inline-block">{item.icon}</div>
                            <h3 className="text-base font-black uppercase tracking-wide text-zinc-950 dark:text-white">{item.title}</h3>
                            <p className="text-xs text-zinc-500 dark:text-zinc-400 font-medium leading-relaxed">{item.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </section>

        </div>
    );
};

export default Home;
