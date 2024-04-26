// authMiddleware.js

const jwt = require('jsonwebtoken');
const { UnauthorizedError } = require('../errors');

const authMiddleware = (req, res, next) => {
  // Get the token from the request headers
  const token = req.headers.authorization;

  if (!token) {
    throw new UnauthorizedError('Authorization token is required');
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach the user object to the request for further processing
    req.user = decoded.user;
    next();
  } catch (err) {
    throw new UnauthorizedError('Invalid token');
  }
};

module.exports = authMiddleware;
