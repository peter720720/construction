const express = require('express');
const { 
  userSignup, 
  adminSignup, 
  userLogin,
  adminLogin, 
  forgotPassword, 
  resetPassword 
} = require('../controllers/authController');

const router = express.Router();

/**
 * ==========================================
 * 👥 ROUTE ENDPOINTS FOR CLIENT AUTHENTICATION
 * ==========================================
 */

// Target Endpoint: POST /api/auth/user-signup
router.post('/user-signup', userSignup);
router.post('/user-login', userLogin);

// Target Endpoint: POST /api/auth/admin-signup
router.post('/admin-signup', adminSignup);
router.post('/admin-login', adminLogin);

// Target Endpoint: POST /api/auth/forgot-password
router.post('/forgot-password', forgotPassword);

// Target Endpoint: POST /api/auth/reset-password
router.post('/reset-password', resetPassword);

module.exports = router;
