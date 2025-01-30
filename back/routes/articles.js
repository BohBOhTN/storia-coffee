const express = require('express');
const router = express.Router();
const pool = require('../db');

// CRUD for Articles
router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM articles');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/', async (req, res) => {
  const { name, price, category_id, image_url } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO articles (name, price, category_id, image_url) VALUES ($1, $2, $3, $4) RETURNING *',
      [name, price, category_id, image_url]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { name, price, category_id, image_url } = req.body;
  try {
    const result = await pool.query(
      'UPDATE articles SET name = $1, price = $2, category_id = $3, image_url = $4 WHERE id = $5 RETURNING *',
      [name, price, category_id, image_url, id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query('DELETE FROM articles WHERE id = $1', [id]);
    res.json({ message: 'Article deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
