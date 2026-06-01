const jwt = require('jsonwebtoken');
const SECRET = process.env.JWT_SECRET || 'dev-secret';
const REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || 'dev-refresh-secret';

module.exports = {
  signAccess: (p) => jwt.sign(p, SECRET, { expiresIn: '15m' }),
  signRefresh: (p) => jwt.sign(p, REFRESH_SECRET, { expiresIn: '7d' }),
  verifyAccess: (t) => jwt.verify(t, SECRET),
  verifyRefresh: (t) => jwt.verify(t, REFRESH_SECRET),
};
