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

// Indian States API Routes

router.post('/', (req, res) => {
  const { state_name, state_code } = req.body;

  if (!state_name || !state_code) {
    console.error('Invalid request payload:', req.body);
    return res.status(400).json({ error: 'State name and state code are required' });
  }

  connection.query('INSERT INTO indian_states (state_name, state_code) VALUES (?, ?)', [state_name, state_code], (err, result) => {
    if (err) {
      console.error('Error creating state:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      res.status(201).json({ id: result.insertId, state_name, state_code });
    }
  });
});

router.put('/:id', (req, res) => {
  const { state_name, state_code } = req.body;
  const stateId = req.params.id;

  console.log('Received request to update state:', req.body);

  if (!state_name || !state_code) {
    console.error('Invalid request payload:', req.body);
    return res.status(400).json({ error: 'State name and state code are required' });
  }

  connection.query(
    'UPDATE indian_states SET state_name = ?, state_code = ? WHERE state_id = ?',
    [state_name, state_code, stateId],
    (err, result) => {
      if (err) {
        console.error('Error updating state:', err);
        res.status(500).json({ error: 'Internal Server Error' });
      } else {
        console.log('State updated successfully:', result);
        res.json({ id: stateId, state_name, state_code });
      }
    }
  );
});

router.delete('/:id', (req, res) => {
  const stateId = req.params.id;

  // Ensure stateId is a valid numeric value before proceeding
  if (!stateId || isNaN(stateId)) {
    return res.status(400).json({ error: 'Invalid state ID' });
  }

  // Proceed with the DELETE operation
  connection.query('DELETE FROM indian_states WHERE state_id = ?', [stateId], (err, result) => {
    if (err) {
      console.error('Error deleting state:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      res.json({ message: 'State deleted successfully' });
    }
  });
});

router.get('/', (req, res) => {
  const { page, pageSize } = req.query;

  if (!page || !pageSize) {
    return res.status(400).json({ error: 'Missing required query parameters: page and pageSize' });
  }

  const startIndex = (page - 1) * pageSize;

  connection.query('SELECT * FROM indian_states LIMIT ?, ?', [startIndex, parseInt(pageSize, 10)], (err, results) => {
    if (err) {
      console.error('Error fetching states:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      res.json(results);
    }
  });
});

module.exports = router;
