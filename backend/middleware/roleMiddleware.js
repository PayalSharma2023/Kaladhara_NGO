// middleware/authorize.js
const User = require('../models/userModel')

const authorizeRoles = (...allowedRoles) => {
  return async (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ message: "Not authorized" });
    }

    if (!allowedRoles.includes(req.user.role)) {
      return res
        .status(403)
        .json({ message: "Access forbidden: insufficient permissions" });
    }

    // If the user is a volunteer, ensure they are approved
    const user = await User.findById(req.user.id)
    if (user.role === 'volunteer' && !user.isApproved) {
      return res.status(403).json({ message: 'Access denied: You are not a volunteer until approved by admin' });
    }

    next();
  };
};

module.exports = authorizeRoles;
