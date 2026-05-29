import React from 'react';
import { Link } from 'react-router-dom';
import { HardHat, Phone, Mail, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-zinc-900 text-zinc-400 border-t border-zinc-800 pt-16 pb-8 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-12 pb-12 border-b border-zinc-800">
        
        {/* Company Identity Column */}
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <HardHat className="w-7 h-7 text-amber-500" />
            <span className="text-xl font-black uppercase tracking-wider text-white">
              A.ADEOYE <span className="text-amber-500">Construction</span>
            </span>
          </div>
          <p className="text-sm text-zinc-500 leading-relaxed">
            Delivering premium industrial configurations, commercial complexes, and luxury residential projects with elite engineering standards.
          </p>
        </div>

        {/* Operational Coordinates Column */}
        <div className="space-y-4">
          <h3 className="text-white font-bold tracking-wide uppercase text-sm">OUR OFFICE</h3>
          <ul className="space-y-3 text-sm">
            <li className="flex items-start space-x-3">
              <MapPin className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
              <span>Ibadan, Oyo State, Nigeria</span>
            </li>
            <li className="flex items-center space-x-3">
              <Phone className="w-5 h-5 text-amber-500 shrink-0" />
              <span>+1 (555) 019-2834</span>
            </li>
            <li className="flex items-center space-x-3">
              <Mail className="w-5 h-5 text-amber-500 shrink-0" />
              <span>operations@A.ADEOYEconstruction.com</span>
            </li>
          </ul>
        </div>

        {/* Professional Networking Handles Column (Using Inline SVGs for brand safety) */}
        <div className="space-y-4">
          <h3 className="text-white font-bold tracking-wide uppercase text-sm">Connect With Us</h3>
          <p className="text-sm text-zinc-500">Stay up to date with our live building operations and structural engineering achievements.</p>
          <div className="flex items-center space-x-4">
            {/* Instagram SVG */}
            <a 
              href="https://instagram.com" 
              target="_blank" 
              rel="noreferrer" 
              className="p-2.5 rounded-full bg-zinc-800 text-zinc-400 hover:bg-amber-500 hover:text-zinc-950 transition-all duration-300 flex items-center justify-center"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
              </svg>
            </a>

            {/* X / Twitter SVG */}
            <a 
              href="https://twitter.com" 
              target="_blank" 
              rel="noreferrer" 
              className="p-2.5 rounded-full bg-zinc-800 text-zinc-400 hover:bg-amber-500 hover:text-zinc-950 transition-all duration-300 flex items-center justify-center"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/>
              </svg>
            </a>

            {/* LinkedIn SVG */}
            <a 
              href="https://linkedin.com" 
              target="_blank" 
              rel="noreferrer" 
              className="p-2.5 rounded-full bg-zinc-800 text-zinc-400 hover:bg-amber-500 hover:text-zinc-950 transition-all duration-300 flex items-center justify-center"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
                <rect width="4" height="12" x="2" y="9"/>
                <circle cx="4" cy="4" r="2"/>
              </svg>
            </a>
          </div>
        </div>

      </div>

      {/* Baseline Copyright and Secret Admin Entry Point */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-zinc-600">
        <p>© 2026 A.ADEOYE Construction Company. All rights reserved.</p>
        <div className="flex space-x-6 mt-4 sm:mt-0">
          <Link to="/admin-login" className="hover:text-amber-500 transition-colors">Admin Portal Gateway</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
