const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const User = require('../models/User');
const sendEmail = require('../utils/sendEmail');
const { getWelcomeTemplate, getOtpTemplate } = require('../utils/emailTemplates');

/**
 * Generates and signs a secure JWT Token for sessions
 */
const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || '7d',
  });
};

/**
 * Creates and sends a success token response to the client
 */
const createSendToken = (user, statusCode, res, customMessage = "Authentication successful!") => {
  const token = signToken(user._id);

  // Remove password from output display for safety
  user.password = undefined;

  res.status(statusCode).json({
    status: 'success',
    message: customMessage, // Custom explicit text message string mapping
    token,
    role: user.role,
    data: { user },
  });
};

// ==========================================
// 👥 USER & ADMIN AUTHENTICATION REGISTRATION
// ==========================================

/**
 * Standard User Registration Route - maps to /user-signup
 */
const userSignup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if account already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ status: 'fail', message: 'Email already registered.' });
    }

    // Force default 'user' role for standard registration paths
    const newUser = await User.create({ name, email, password, role: 'user' });

    // Send the beautifully formatted HTML welcome email
    try {
      const emailHtml = getWelcomeTemplate(newUser.name);
      await sendEmail({
        email: newUser.email,
        subject: `Welcome to Titan Construction, ${newUser.name}!`,
        html: emailHtml,
      });
    } catch (err) {
      console.error('Email Delivery Error:', err.message);
      // Fail silently without disrupting user access if email setup hits a glitch
    }

    createSendToken(newUser, 201, res, "Signup successful!");
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};

/**
 * Secure Admin Registration Route - maps to /admin-signup
 */
const adminSignup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ status: 'fail', message: 'Email already registered.' });
    }

    // Explicitly sets role permissions to 'admin'
    const newAdmin = await User.create({ name, email, password, role: 'admin' });

    createSendToken(newAdmin, 201, res, "Admin signup successful!");
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};

/**
 * Dedicated User Login - maps to /user-login
 * Enforces that only accounts with the 'user' role can log in
 */
const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ status: 'fail', message: 'Please provide email and password.' });
    }

    // Explicitly fetch password since schema hides it by default
    const user = await User.findOne({ email }).select('+password');

    if (!user || !(await user.correctPassword(password, user.password))) {
      return res.status(401).json({ status: 'fail', message: 'Incorrect email or password.' });
    }

    // Guard: Prevent Admins from accessing the regular user dashboard area
    if (user.role !== 'user') {
      return res.status(403).json({ 
        status: 'fail', 
        message: 'Access Denied. Please use the Admin Login portal.' 
      });
    }

    createSendToken(user, 200, res, "Login successful!");
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};

/**
 * Dedicated Admin Login - maps to /admin-login
 * Enforces that only accounts with the 'admin' role can log in
 */
const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ status: 'fail', message: 'Please provide email and password.' });
    }

    const user = await User.findOne({ email }).select('+password');

    if (!user || !(await user.correctPassword(password, user.password))) {
      return res.status(401).json({ status: 'fail', message: 'Incorrect email or password.' });
    }

    // Guard: Prevent regular users from logging into the management workspace
    if (user.role !== 'admin') {
      return res.status(403).json({ 
        status: 'fail', 
        message: 'Access Denied. Unauthorized clearance profile.' 
      });
    }

    createSendToken(user, 200, res, "Admin login successful!");
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};

// ==========================================
// 🔑 PASSWORD RECOVERY SYSTEM (OTP DISPATCH)
// ==========================================

/**
 * Forgot Password Endpoint - Dispatches a 6-digit verification token
 */
const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ status: 'fail', message: 'No profile found with that email address.' });
    }

    // Generate a secure 6-digit numeric OTP code string
    const otpCode = Math.floor(100000 + Math.random() * 900000).toString();

    // Store hashed representation inside database for strict comparisons
    user.resetPasswordOtp = crypto.createHash('sha256').update(otpCode).digest('hex');
    user.resetPasswordExpires = Date.now() + 15 * 60 * 1000; // Code expires in 15 minutes

    await user.save({ validateBeforeSave: false });

    // Send OTP to user's email
    try {
      const otpTemplateHtml = getOtpTemplate(user.name, otpCode);
      await sendEmail({
        email: user.email,
        subject: 'Your Password Security Reset Verification Code',
        html: otpTemplateHtml,
      });

      res.status(200).json({ status: 'success', message: 'Verification OTP code dispatched to mailbox.' });
    } catch (err) {
      user.resetPasswordOtp = undefined;
      user.resetPasswordExpires = undefined;
      await user.save({ validateBeforeSave: false });

      return res.status(500).json({ status: 'fail', message: 'Error sending email. Please try again later.' });
    }
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};

/**
 * Reset Password Endpoint - Verifies OTP and writes the new credentials
 */
const resetPassword = async (req, res) => {
  try {
    const { email, otp, newPassword } = req.body;

    if (!email || !otp || !newPassword) {
      return res.status(400).json({ status: 'fail', message: 'Please provide email, OTP code, and new password.' });
    }

    // Hash incoming validation token to run matching query checks
    const hashedOtp = crypto.createHash('sha256').update(otp).digest('hex');

    const user = await User.findOne({
      email,
      resetPasswordOtp: hashedOtp,
      resetPasswordExpires: { $gt: Date.now() }, // Verify expiration timestamp
    });

    if (!user) {
      return res.status(400).json({ status: 'fail', message: 'Invalid token verification code or link expired.' });
    }

    // Update credentials and clear configuration tracking nodes
    user.password = newPassword;
    user.resetPasswordOtp = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();

    createSendToken(user, 200, res, "Password reset successful!");
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};

module.exports = {
  userSignup,
  adminSignup,
  userLogin,
  adminLogin,
  forgotPassword,
  resetPassword,
};
