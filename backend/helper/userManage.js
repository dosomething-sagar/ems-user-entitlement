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
    return;
  }
  console.log('Connected to MySQL');
});

// Create a user
let userProfileData = {};
let addressData = {};
let userLoginData = {};
let userRoleData = {};


// Get all users
router.get('/', (req, res) => {
  connection.query('SELECT * FROM user_profile', (error, results) => {
    if (error) {
      console.error('Error fetching users:', error);
      res.status(500).send('Error fetching users');
      return;
    }
    res.status(200).json(results);
  });
});

// Get a specific user by user_id
router.get('/:user_id', (req, res) => {
  const userId = req.params.user_id;
  connection.query('SELECT * FROM user_profile WHERE user_id = ?', userId, (error, results) => {
    if (error) {
      console.error('Error fetching user:', error);
      res.status(500).send('Error fetching user');
      return;
    }
    if (results.length === 0) {
      res.status(404).send('User not found');
      return;
    }
    res.status(200).json(results[0]);
  });
});

// Update a user by user_id
router.put('/:user_id', (req, res) => {
  const userId = req.params.user_id;
  const updatedUser = req.body;

  // Assuming 'user_profile' is your table name
  connection.query('UPDATE user_profile SET ? WHERE user_id = ?', [updatedUser, userId], (error) => {
    if (error) {
      console.error('Error updating user:', error);
      res.status(500).json({ error: 'Error updating user' });
      return;
    }
    res.status(200).json({ message: 'User updated successfully' });
  });
});
// Delete a user by user_id
router.delete('/:user_id', (req, res) => {
  const userId = req.params.user_id;
  connection.query('DELETE FROM user_profile WHERE user_id = ?', userId, (error, results) => {
    if (error) {
      console.error('Error deleting user:', error);
      res.status(500).send('Error deleting user');
      return;
    }
    if (results.affectedRows === 0) {
      res.status(404).send('User not found');
      return;
    }
    res.status(200).send('User deleted successfully');
  });
  router.put('/api/user_profile/:userId', async (req, res) => {
    try {
      const userId = req.params.userId;
      const userData = req.body; // This should contain the updated user details
  
      // Perform database update based on userId and userData
      // Example: await updateUserProfile(userId, userData);
  
      userProfileData[userId] = userData;
  
      res.status(200).json({ message: 'User details updated successfully' });
    } catch (error) {
      console.error('Error updating user details:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  
  // Express.js route handling the update of user address
  router.put('/api/address/:addressId', async (req, res) => {
    try {
      const addressId = req.params.addressId;
      const addressData = req.body; // This should contain the updated address details
  
      // Perform database update based on addressId and addressData
      // Example: await updateAddress(addressId, addressData);
  
      addressData[addressId] = addressData;
  
      res.status(200).json({ message: 'Address updated successfully' });
    } catch (error) {
      console.error('Error updating address:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  
  // Express.js route handling the update of user login credentials
  
  
  // Express.js route handling the update of user roles
  
  
  
  
});

module.exports = router;