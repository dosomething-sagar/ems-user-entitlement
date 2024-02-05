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

router.post('/', (req, res) => {
  const { district_name, district_code, state_id } = req.body;

  if (!district_name || !district_code || !state_id) {
    console.error('Invalid request payload:', req.body);
    return res.status(400).json({ error: 'District name, district code, and state ID are required' });
  }

  connection.query('INSERT INTO district (district_name, district_code, state_id) VALUES (?, ?, ?)', [district_name, district_code, state_id], (err, result) => {
    if (err) {
      console.error('Error creating district:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      res.status(201).json({ id: result.insertId, district_name, district_code, state_id });
    }
  });
});

router.put('/:id', (req, res) => {
  const { district_name, district_code, state_id } = req.body;
  const districtId = req.params.id;

  console.log('Received request to update district:', req.body);

  if (!district_name || !district_code || !state_id) {
    console.error('Invalid request payload:', req.body);
    return res.status(400).json({ error: 'District name, district code, and state ID are required' });
  }

  connection.query(
    'UPDATE district SET district_name = ?, district_code = ?, state_id = ? WHERE district_id = ?',
    [district_name, district_code, state_id, districtId],
    (err, result) => {
      if (err) {
        console.error('Error updating district:', err);
        res.status(500).json({ error: 'Internal Server Error' });
      } else {
        console.log('District updated successfully:', result);
        res.json({ id: districtId, district_name, district_code, state_id });
      }
    }
  );
});


router.delete('/:id', (req, res) => {
  const districtId = req.params.id;

  // Ensure districtId is a valid numeric value before proceeding
  if (!districtId || isNaN(districtId)) {
    return res.status(400).json({ error: 'Invalid district ID' });
  }

  // Proceed with the DELETE operation
  connection.query('DELETE FROM district WHERE district_id = ?', [districtId], (err, result) => {
    if (err) {
      console.error('Error deleting district:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      res.json({ message: 'District deleted successfully' });
    }
  });
});


// Fetch all districts with pagination
router.get('/', (req, res) => {
  const { page, pageSize } = req.query;

  if (!page || !pageSize) {
    return res.status(400).json({ error: 'Missing required query parameters: page and pageSize' });
  }

  const startIndex = (page - 1) * pageSize;

  connection.query('SELECT * FROM district LIMIT ?, ?', [startIndex, parseInt(pageSize, 10)], (err, results) => {
    if (err) {
      console.error('Error fetching districts:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      const newDistricts = results.map((district, index) => ({
        ...district,
        id: (page - 1) * pageSize + index + 1,
      }));

      res.json(newDistricts);
    }
  });
});



module.exports=router;