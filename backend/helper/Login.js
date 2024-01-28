const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');

const router = express.Router();
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'sajjanv1_ems_admin',
  password: 'tzWw!~4*u[PG',
  database: 'sajjanv1_ems2024',
  authPlugin: 'mysql_native_password',
});

router.use(bodyParser.json());

// Get all user logins
router.get('/', (req, res) => {
  const sql = 'SELECT * FROM user_login';

  connection.query(sql, (err, result) => {
    if (err) throw err;
    res.json(result);
  });
});

// Get a specific user login by user_login_id
router.get('/:id', (req, res) => {
  const id = req.params.id;
  const sql = 'SELECT * FROM user_login WHERE user_id = ?';

  connection.query(sql, id, (err, result) => {
    if (err) throw err;
    res.json(result);
  });
});

// Create a new user login
router.post('/', (req, res) => {
  const newUserLogin = req.body;
  const sql = 'INSERT INTO user_login SET ?';

  connection.query(sql, newUserLogin, (err, result) => {
    if (err) throw err;
    res.status(201).json({ message: 'User login created successfully', id: result.insertId });
  });
});

// Update an existing user login by user_login_id
router.put('/:id', (req, res) => {
  const id = req.params.id;
  const updatedUserLogin = req.body;
  const sql = 'UPDATE user_login SET ? WHERE user_login_id = ?';

  connection.query(sql, [updatedUserLogin, id], (err) => {
    if (err) throw err;
    res.json({ message: 'User login updated successfully' });
  });
});

// Delete a user login by user_login_id
router.delete('/:id', (req, res) => {
  const id = req.params.id;
  const sql = 'DELETE FROM user_login WHERE user_login_id = ?';

  connection.query(sql, id, (err, result) => {
    if (err) throw err;
    if (result.affectedRows === 0) {
      res.status(404).json({ message: 'User login not found' });
    } else {
      res.json({ message: 'User login deleted successfully' });
    }
  });
});

module.exports = router;
