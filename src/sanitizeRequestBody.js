const { sanitizeInput } = require('../utils/vaptUtils');

// Middleware to sanitize `req.body`
const sanitizeRequestBody = (req, res, next) => {
  if (req.body && typeof req.body === 'object') {
    Object.keys(req.body).forEach((key) => {
      req.body[key] = sanitizeInput(req.body[key]);
    });
  }
  next();
};

module.exports = sanitizeRequestBody;