const express = require('express');
const router = express.Router();
const pool = require('../db');

// CRUD for Product Alerts
router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM product_alerts');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('SELECT * FROM product_alerts WHERE id = $1', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Product alert not found' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/', async (req, res) => {
  const { product_id, manager_id, condition_type, threshold, time_window } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO product_alerts (product_id, manager_id, condition_type, threshold, time_window) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [product_id, manager_id, condition_type, threshold, time_window]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { product_id, manager_id, condition_type, threshold, time_window, is_active } = req.body;
  try {
    const result = await pool.query(
      'UPDATE product_alerts SET product_id = $1, manager_id = $2, condition_type = $3, threshold = $4, time_window = $5, is_active = $6 WHERE id = $7 RETURNING *',
      [product_id, manager_id, condition_type, threshold, time_window, is_active, id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query('DELETE FROM product_alerts WHERE id = $1', [id]);
    res.json({ message: 'Product alert deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
