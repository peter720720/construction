import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, Send, Loader2 } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess('');

    // Simulate standard messaging pipelines execution delay
    setTimeout(() => {
      setLoading(false);
      setSuccess('Message transmitted successfully! Our operations desk will reach out shortly.');
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 1500);
  };

  return (
    <div className="min-h-screen pt-28 pb-16 bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-50 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Typography Section */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-block px-3 py-1.5 bg-amber-500/10 text-amber-500 rounded-full font-bold text-[10px] uppercase tracking-widest mb-4"
          >
            Connect With Us
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl sm:text-5xl font-black uppercase tracking-tight mb-4"
          >
            Initialize Your <span className="text-amber-500">Building Blueprint</span>
          </motion.h1>
          <motion.p className="text-sm text-zinc-500 dark:text-zinc-400 font-medium leading-relaxed">
            Reach out to our engineering estimators to discuss site evaluations, budget constraints, or premium project commissions.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          
          {/* Corporate Operational Coordinates (Left Panel) */}
          <div className="lg:col-span-1 space-y-4">
            {[
              { icon: <MapPin className="w-5 h-5" />, title: 'Our Office', val: 'Ibadan, Oyo State, Nigeria' },
              { icon: <Phone className="w-5 h-5" />, title: 'Operational Hotline', val: '+1 (555) 019-2834' },
              { icon: <Mail className="w-5 h-5" />, title: 'Electronic Mailbox', val: 'operations@A.ADEOYEconstruction.com' },
              { icon: <Clock className="w-5 h-5" />, title: 'Business Schedule', val: 'Mon - Fri: 08:00 AM - 06:00 PM' }
            ].map((item, idx) => (
              <div key={idx} className="p-5 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl flex items-start space-x-4">
                <div className="p-3 bg-amber-500/10 text-amber-500 rounded-xl shrink-0">{item.icon}</div>
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-400 mb-1">{item.title}</h4>
                  <p className="text-sm font-semibold leading-relaxed text-zinc-800 dark:text-zinc-200">{item.val}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Interactive Communications Portal Form (Right Panel) */}
          <div className="lg:col-span-2 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-6 md:p-8 rounded-2xl shadow-sm">
            <h3 className="text-lg font-black uppercase text-zinc-950 dark:text-white mb-6 border-b border-zinc-200 dark:border-zinc-800 pb-3">
              Transmit Project Request
            </h3>

            {success && (
              <div className="mb-6 p-3 bg-emerald-500/10 border border-emerald-500/30 text-emerald-500 text-xs font-bold rounded-xl text-center">
                {success}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-2">Your Name</label>
                  <input 
                    type="text" name="name" required value={formData.name} onChange={handleChange} placeholder="John Doe"
                    className="w-full px-4 py-3 bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl text-sm focus:outline-none focus:border-amber-500 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-2">Email Address</label>
                  <input 
                    type="email" name="email" required value={formData.email} onChange={handleChange} placeholder="client@example.com"
                    className="w-full px-4 py-3 bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl text-sm focus:outline-none focus:border-amber-500 transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-2">Subject Parameter</label>
                <input 
                  type="text" name="subject" required value={formData.subject} onChange={handleChange} placeholder="Luxury Residential Bid Consultation"
                  className="w-full px-4 py-3 bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl text-sm focus:outline-none focus:border-amber-500 transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-2">Detailed Project Brief</label>
                <textarea 
                  name="message" required value={formData.message} onChange={handleChange} rows={4} placeholder="Describe engineering scope, location parameters, or timelines..."
                  className="w-full px-4 py-3 bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl text-sm focus:outline-none focus:border-amber-500 transition-colors"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 bg-zinc-950 dark:bg-zinc-100 text-white dark:text-zinc-950 hover:bg-amber-500 dark:hover:bg-amber-500 hover:text-zinc-950 font-bold text-xs uppercase tracking-wider rounded-xl transition-all duration-300 flex items-center justify-center space-x-2 shadow-md disabled:opacity-50 cursor-pointer"
              >
                {loading ? (
                  <Loader2 className="w-4 h-4 animate-spin text-amber-500" />
                ) : (
                  <>
                    <span>Transmit Message Payload</span>
                    <Send className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          </div>

        </div>

      </div>
    </div>
  );
};

export default Contact;
