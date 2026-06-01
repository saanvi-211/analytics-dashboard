const router = require("express").Router();
const pool = require("../db/connection");
const NodeCache = require("node-cache");
const cache = new NodeCache({ stdTTL: 60 });

router.get("/overview", async (req, res) => {
  const cached = cache.get("overview");
  if (cached) return res.json(cached);
  try {
    const [sourceRows] = await pool.query(`
      SELECT s.source, COUNT(DISTINCT s.id) AS sessions, COUNT(DISTINCT s.user_id) AS users,
        AVG(s.duration_seconds) AS avg_duration, SUM(s.page_views) AS pageviews
      FROM sessions s LEFT JOIN users u ON s.user_id = u.id
      GROUP BY s.source
    `);
    const [eventRows] = await pool.query(`
      SELECT event_type, COUNT(*) as count FROM events
      WHERE created_at >= DATE_SUB(NOW(), INTERVAL 30 DAY)
      GROUP BY event_type ORDER BY count DESC LIMIT 10
    `);
    const result = { by_source: sourceRows, top_events: eventRows };
    cache.set("overview", result);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/timeseries", async (req, res) => {
  const { days = 30 } = req.query;
  try {
    const [rows] = await pool.query(`
      SELECT DATE(created_at) AS date, COUNT(*) AS value FROM events
      WHERE created_at >= DATE_SUB(NOW(), INTERVAL ? DAY)
      GROUP BY DATE(created_at) ORDER BY date ASC
    `, [parseInt(days)]);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
