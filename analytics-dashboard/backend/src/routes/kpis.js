const router = require("express").Router();
const pool = require("../db/connection");

router.get("/", async (req, res) => {
  const [rows] = await pool.query("SELECT * FROM metrics ORDER BY recorded_at DESC LIMIT 100");
  res.json(rows);
});

router.post("/", async (req, res) => {
  const { metric_name, value, dimension, recorded_at } = req.body;
  const [result] = await pool.query(
    "INSERT INTO metrics (metric_name, value, dimension, recorded_at) VALUES (?, ?, ?, ?)",
    [metric_name, value, dimension, recorded_at || new Date()]
  );
  res.status(201).json({ id: result.insertId, metric_name, value });
});

router.put("/:id", async (req, res) => {
  const { value, dimension } = req.body;
  await pool.query("UPDATE metrics SET value=?, dimension=? WHERE id=?", [value, dimension, req.params.id]);
  res.json({ updated: true });
});

router.delete("/:id", async (req, res) => {
  await pool.query("DELETE FROM metrics WHERE id=?", [req.params.id]);
  res.json({ deleted: true });
});

module.exports = router;
