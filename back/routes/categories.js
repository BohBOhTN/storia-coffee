const express = require('express');
const router = express.Router();
const pool = require('../db');

// CRUD for Categories
router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM categories');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/', async (req, res) => {
  const { name, image_url } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO categories (name, image_url) VALUES ($1, $2) RETURNING *',
      [name, image_url]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { name, image_url } = req.body;
  try {
    const result = await pool.query(
      'UPDATE categories SET name = $1, image_url = $2 WHERE id = $3 RETURNING *',
      [name, image_url, id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query('DELETE FROM categories WHERE id = $1', [id]);
    res.json({ message: 'Category deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
