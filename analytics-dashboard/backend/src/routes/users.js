const express = require('express');
const { query } = require('../utils/db');
const { authenticate, authorize } = require('../middleware/auth');
const router = express.Router();
router.use(authenticate);

router.get('/', authorize('admin', 'manager'), async (req, res, next) => {
  try {
    const { page = 1, limit = 20 } = req.query;
    const offset = (parseInt(page) - 1) * parseInt(limit);
    const users = await query('SELECT id, email, full_name, role, is_active, created_at FROM users ORDER BY created_at DESC LIMIT ? OFFSET ?', [parseInt(limit), offset]);
    res.json(users);
  } catch (err) { next(err); }
});

module.exports = { usersRouter: router };
