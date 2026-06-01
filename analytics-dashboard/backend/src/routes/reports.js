const express = require('express');
const { query } = require('../utils/db');
const { authenticate } = require('../middleware/auth');
const router = express.Router();
router.use(authenticate);

router.get('/revenue', async (req, res, next) => {
  try {
    const rows = await query(`
      SELECT DATE_FORMAT(recorded_at, '%Y-%m') AS period, SUM(mv.value) AS revenue, COUNT(*) AS transactions
      FROM metric_values mv JOIN metrics m ON m.id = mv.metric_id
      WHERE m.category = 'revenue'
      GROUP BY DATE_FORMAT(recorded_at, '%Y-%m')
      ORDER BY recorded_at ASC LIMIT 24
    `);
    res.json(rows);
  } catch (err) { next(err); }
});

module.exports = { reportsRouter: router };
