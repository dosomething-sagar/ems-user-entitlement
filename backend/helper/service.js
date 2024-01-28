const express = require('express');
const router = express.Router();
const multer = require('multer');
const crypto = require('crypto');
const mysql = require('mysql');
const cors = require('cors');


const db = mysql.createConnection({
    host: 'localhost',
    user: 'sajjanv1_ems_admin',
    password: 'tzWw!~4*u[PG',
    database:'sajjanv1_ems2024',
    authPlugin: 'mysql_native_password',
  });
  
  // Rest of your code...
  
  db.connect((err) => {
    if (err) {
      console.error('MySQL Connection Error: ' + err.message);
    } else {
      console.log('Connected to MySQL');
    }
  });


router.get('/indian-states', (req, res) => {
  const query = 'SELECT * FROM indian_states';

  db.query(query, (err, results) => {
    if (err) {
      throw err;
    }

    const states = results.map(result => result);
    res.json(states);
  });
});

router.get('/indian-cities/:state', (req, res) => {
  const state = req.params.state;
  const citiesQuery = 'SELECT * FROM district WHERE state_id = ?';

    db.query(citiesQuery, [state], (err, citiesResults) => {
      if (err) {
        throw err;
      }

      const cities = citiesResults.map(result => result);
      res.json({ state, cities});
    });
});

router.get('/parliament-seats/:stateId', (req, res) => {
  const stateId = req.params.stateId;
  const parliamentSeatsQuery = 'SELECT * FROM parliament WHERE state_id = ?';

  db.query(parliamentSeatsQuery, [stateId], (err, seatsResults) => {
    if (err) {
      throw err;
    }

    const seats = seatsResults.map(result => result.parliament_name);
    res.json({ stateId, seats });
  });
});


router.post('/create-address', (req, res) => {
  const { address, postalCode, country, state, city } = req.body;

  const addressQuery = `
    INSERT INTO address (street, postal_code, country, state_id, district_id)
    VALUES (?, ?, ?, ?, ?)
  `;

  const addressParams = [address, postalCode, country, state, city];

  db.query(addressQuery, addressParams, (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'An error occurred while creating the address' });
    }
    console.log(data);
    return res.json(data.insertId);
  });
});

router.get('/roles', (req, res) => {
  const roleTypes = 'SELECT * FROM role_type';

    db.query(roleTypes, (err, results) => {
      if (err) {
        throw err;
      }

      res.json({ results });
    });
});


router.get('/assembly-seats/:district', (req, res) => {
  const district = req.params.district;
  const assemblySeatsQuery = 'SELECT * FROM assembly WHERE district_id = ?';

    db.query(assemblySeatsQuery, [district], (err, seatsResults) => {
      if (err) {
        throw err;
      }

      const seats = seatsResults.map(result => result.assembly_name);
      res.json({ district, seats });
    });
});



module.exports = router;
