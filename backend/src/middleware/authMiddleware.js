const jwt = require('jsonwebtoken');
const User = require('../models/User');

/**
 * Main Protection Route: Verifies the user is logged in
 */
const protect = async (req, res, next) => {
  try {
    let token;

    // Read the authorization token from the incoming request headers
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      return res.status(401).json({
        status: 'fail',
        message: 'You are not logged in. Please log in to get access.',
      });
    }

    // Verify token validity
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Check if the user account still exists in the database
    const currentUser = await User.findById(decoded.id);
    if (!currentUser) {
      return res.status(401).json({
        status: 'fail',
        message: 'The user belonging to this token no longer exists.',
      });
    }

    // Grant access and inject user data into the request object
    req.user = currentUser;
    next();
  } catch (error) {
    return res.status(401).json({
      status: 'fail',
      message: 'Invalid authorization token. Please log in again.',
    });
  }
};

/**
 * Authorization Guard: Restricts route access to specific roles (e.g., 'admin')
 */
const restrictTo = (...roles) => {
  return (req, res, next) => {
    // If the user's role is not inside the allowed roles list, block them
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        status: 'fail',
        message: 'Permission denied. You do not have access to perform this action.',
      });
    }
    next();
  };
};

module.exports = {
  protect,
  restrictTo,
};
