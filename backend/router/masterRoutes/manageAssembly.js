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



// Assemblies API Routes

router.post('/', (req, res) => {
  const { assembly_name, district_id } = req.body;

  if (!assembly_name || !district_id) {
    console.error('Invalid request payload:', req.body);
    return res.status(400).json({ error: 'Assembly name and district ID are required' });
  }

  connection.query('INSERT INTO assembly (assembly_name, district_id) VALUES (?, ?)', [assembly_name, district_id], (err, result) => {
    if (err) {
      console.error('Error creating assembly:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      res.status(201).json({ id: result.insertId, assembly_name, district_id });
    }
  });
});

router.put('/:id', (req, res) => {
  const { assembly_name, district_id } = req.body;
  const assemblyId = req.params.id;

  console.log('Received request to update assembly:', req.body);

  if (!assembly_name || !district_id) {
    console.error('Invalid request payload:', req.body);
    return res.status(400).json({ error: 'Assembly name and district ID are required' });
  }

  connection.query(
    'UPDATE assembly SET assembly_name = ?, district_id = ? WHERE assembly_id = ?',
    [assembly_name, district_id, assemblyId],
    (err, result) => {
      if (err) {
        console.error('Error updating assembly:', err);
        res.status(500).json({ error: 'Internal Server Error' });
      } else {
        console.log('Assembly updated successfully:', result);
        res.json({ id: assemblyId, assembly_name, district_id });
      }
    }
  );
});

router.delete('/:id', (req, res) => {
  const assemblyId = req.params.id;

  // Ensure assemblyId is a valid numeric value before proceeding
  if (!assemblyId || isNaN(assemblyId)) {
    return res.status(400).json({ error: 'Invalid assembly ID' });
  }

  // Proceed with the DELETE operation
  connection.query('DELETE FROM assembly WHERE assembly_id = ?', [assemblyId], (err, result) => {
    if (err) {
      console.error('Error deleting assembly:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      res.json({ message: 'Assembly deleted successfully' });
    }
  });
});

router.get('/', (req, res) => {
  const { page, pageSize } = req.query;

  if (!page || !pageSize) {
    return res.status(400).json({ error: 'Missing required query parameters: page and pageSize' });
  }

  const startIndex = (page - 1) * pageSize;

  connection.query('SELECT * FROM assembly LIMIT ?, ?', [startIndex, parseInt(pageSize, 10)], (err, results) => {
    if (err) {
      console.error('Error fetching assemblies:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      const newAssemblies = results.map((assembly, index) => ({
        ...assembly,
        id: (page - 1) * pageSize + index + 1,
      }));

      res.json(newAssemblies);
    }
  });
});

module.exports=router;
