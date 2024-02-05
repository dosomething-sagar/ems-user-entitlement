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
    console.log('MySQL connection failed:', err);
  } else {
    console.log('Connected to MySQL');
  }
});

// Create
router.post('/', (req, res) => {
  const address = req.body;
  const sql = 'INSERT INTO address SET ?';

  connection.query(sql, address, (err, result) => {
    if (err) throw err;
    res.send('Address added');
  });
});


// Read
router.get('/', (req, res) => {
  const sql = 'SELECT * FROM address';

  connection.query(sql, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

router.get('/:id', (req, res) => {
    const id = req.params.id; // Use req.params to get the parameter from the URL
    const sql = 'SELECT * FROM address WHERE address_id = ?';
  
    connection.query(sql, id, (err, result) => {
      if (err) throw err;
      res.send(result);
    });
});


// Update
// Update
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const updatedAddress = req.body;
  const sql = 'UPDATE address SET street = ?, district_id = ?, state_id = ?, postal_code = ? WHERE address_id = ?';

  // Assuming your updatedAddress object has the necessary properties
  const { street, district_id, state_id, postal_code } = updatedAddress;

  connection.query(sql, [street, district_id, state_id, postal_code, id], (error, results) => {
    if (error) {
      console.error('Error updating address:', error);
      res.status(500).json({ error: 'Error updating address' });
      return;
    }
    res.status(200).json({ message: 'Address updated successfully' });
  });
});


// Delete
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  const sql = 'DELETE FROM address WHERE address_id = ?';

  connection.query(sql, id, (err, result) => {
    if (err) throw err;
    res.send('Address deleted');
  });
});

router.put('/user-role/:userId/:roleId', (req, res) => {
  try {
    const userId = req.params.userId;
    const roleId = req.params.roleId;
    const {roleTypeId, rolePlace, userPerms} = req.body; // This should contain the updated user roles

    // Assuming 'user_roles' is your table name
    connection.query('UPDATE user_role SET role_type_id = ?, role_place = ?, user_auth=? WHERE user_id = ? and role_type_id = ?', [roleTypeId,rolePlace,userPerms, userId,roleId], (error) => {
      if (error) {
        console.error('Error updating user roles:', error);
        res.status(500).json({ error: 'Error updating user roles' });
        return;
      }
      res.status(200).json({ message: 'User roles updated successfully' });
    });
  } catch (error) {
    console.error('Error updating user roles:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


module.exports = router;
