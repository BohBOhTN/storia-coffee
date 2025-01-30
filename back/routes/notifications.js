const express = require('express');
const router = express.Router();
const pool = require('../db');

// CRUD for Notifications
router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM notifications');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/', async (req, res) => {
  const { alert_id, message } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO notifications (alert_id, message) VALUES ($1, $2) RETURNING *',
      [alert_id, message]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { alert_id, message, is_read } = req.body;
  try {
    const result = await pool.query(
      'UPDATE notifications SET alert_id = $1, message = $2, is_read = $3 WHERE id = $4 RETURNING *',
      [alert_id, message, is_read, id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query('DELETE FROM notifications WHERE id = $1', [id]);
    res.json({ message: 'Notification deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
