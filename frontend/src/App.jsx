import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Page Component Imports
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Contact from './pages/Contact';
import UserSignup from './pages/UserSignup';
import UserLogin from './pages/UserLogin';
import UserDashboard from './pages/UserDashboard';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-50 transition-colors duration-300">
        
        {/* Global Navigation Header Bar Element */}
        <Navbar />
        
        {/* Master Active Content Route View Wrapper */}
        <main className="flex-grow">
          <Routes>
            {/* Core Lowercase Public Corporate Showrooms */}
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/contact" element={<Contact />} />

            {/* User Access Workspace Routing Nodes */}
            <Route path="/user-signup" element={<UserSignup />} />
            <Route path="/user-login" element={<UserLogin />} />
            <Route path="/user-dashboard" element={<UserDashboard />} />

            {/* Administration Interface Portal Pathways */}
            <Route path="/admin-login" element={<AdminLogin />} />
            <Route path="/admin-dashboard" element={<AdminDashboard />} />

            {/* Account Password Recovery Sequences */}
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />

            {/* Catch-All Fallback Fault Redirection Handler */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
        
        {/* Global Branding Info Legal Footer Element */}
        <Footer />
        
      </div>
    </Router>
  );
}

export default App;
