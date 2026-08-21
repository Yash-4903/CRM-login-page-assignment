const jwt = require('jsonwebtoken');
const { jwt: jwtConfig } = require('../config/constants');

function authMiddleware(req, res, next) {
  const header = req.headers.authorization || '';

  if (!header.startsWith('Bearer ')) {
    return res.status(401).json({
      success: false,
      message: 'Unauthorized — invalid or expired token',
      errors: {},
    });
  }

  const token = header.slice(7).trim();

  try {
    const payload = jwt.verify(token, jwtConfig.secret);
    req.user = { userId: payload.userId, email: payload.email };
    next();
  } catch (err) {
    return res.status(401).json({
      success: false,
      message: 'Unauthorized — invalid or expired token',
      errors: {},
    });
  }
}

module.exports = authMiddleware;