const express = require('express');
const router = express.Router();
const pool = require('../db');

// CRUD for Sales
router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM sales');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('SELECT * FROM sales WHERE id = $1', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Sale not found' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/', async (req, res) => {
  const sales = req.body;
  if (!Array.isArray(sales)) {
    return res.status(400).json({ error: 'Request body must be an array of sales' });
  }

  try {
    const salesPromises = sales.map(({ user_id, article_id, quantity }) =>
      pool.query(
        'INSERT INTO sales (user_id, article_id, quantity) VALUES ($1, $2, $3) RETURNING *',
        [user_id, article_id, quantity]
      )
    );

    const results = await Promise.all(salesPromises);
    res.json(results.map(result => result.rows[0]));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { user_id, article_id, quantity } = req.body;
  try {
    const result = await pool.query(
      'UPDATE sales SET user_id = $1, article_id = $2, quantity = $3 WHERE id = $4 RETURNING *',
      [user_id, article_id, quantity, id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query('DELETE FROM sales WHERE id = $1', [id]);
    res.json({ message: 'Sale deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
