const express = require('express');
const mysql = require('mysql');
const router = express.Router();

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'sajjanv1_ems_admin',
  password: 'tzWw!~4*u[PG',
  database: 'sajjanv1_ems2024',
  authPlugin: 'mysql_native_password',
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
  } else {
    console.log('Connected to MySQL');
  }
});

// Parliament API Routes

router.post('/', (req, res) => {
  const { parliament_name, state_id } = req.body;

  if (!parliament_name || !state_id) {
    console.error('Invalid request payload:', req.body);
    return res.status(400).json({ error: 'Parliament name and state ID are required' });
  }

  connection.query('INSERT INTO parliament (parliament_name, state_id) VALUES (?, ?)', [parliament_name, state_id], (err, result) => {
    if (err) {
      console.error('Error creating parliament:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      res.status(201).json({ id: result.insertId, parliament_name, state_id });
    }
  });
});

router.put('/:id', (req, res) => {
  const { parliament_name, state_id } = req.body;
  const parliamentId = req.params.id;

  console.log('Received request to update parliament:', req.body);

  if (!parliament_name || !state_id) {
    console.error('Invalid request payload:', req.body);
    return res.status(400).json({ error: 'Parliament name and state ID are required' });
  }

  connection.query(
    'UPDATE parliament SET parliament_name = ?, state_id = ? WHERE parliament_id = ?',
    [parliament_name, state_id, parliamentId],
    (err, result) => {
      if (err) {
        console.error('Error updating parliament:', err);
        res.status(500).json({ error: 'Internal Server Error' });
      } else {
        console.log('Parliament updated successfully:', result);
        res.json({ id: parliamentId, parliament_name, state_id });
      }
    }
  );
});

router.delete('/:id', (req, res) => {
  const parliamentId = req.params.id;

  // Ensure parliamentId is a valid numeric value before proceeding
  if (!parliamentId || isNaN(parliamentId)) {
    return res.status(400).json({ error: 'Invalid parliament ID' });
  }

  // Proceed with the DELETE operation
  connection.query('DELETE FROM parliament WHERE parliament_id = ?', [parliamentId], (err, result) => {
    if (err) {
      console.error('Error deleting parliament:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      res.json({ message: 'Parliament deleted successfully' });
    }
  });
});

router.get('/', (req, res) => {
  connection.query('SELECT * FROM parliament', (err, results) => {
    if (err) {
      console.error('Error fetching parliaments:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      res.json(results);
    }
  });
});

module.exports = router;
