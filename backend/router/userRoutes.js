const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const cors = require('cors');
const crypto = require('crypto');
const multer = require('multer');


const db = mysql.createConnection({
    host: 'localhost',
    user: 'sajjanv1_ems_admin',
    password: 'tzWw!~4*u[PG',
    database:'sajjanv1_ems2024',
    authPlugin: 'mysql_native_password',
  });
  
  
  const storage = multer.memoryStorage();
  const upload = multer({ storage: storage });
  
  // Rest of your code...
  
  db.connect((err) => {
    if (err) {
      console.error('MySQL Connection Error: ' + err.message);
    } else {
      console.log('Connected to MySQL');
    }
  });


  



  // Login Route
  router.post('/login', (req, res) => {
    res.header('Access-Control-Allow-Origin', '*'); // Allow requests from any origin
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    const { username, password } = req.body;
  
    // Query to fetch user information including role
    const query = "SELECT * FROM user_login WHERE `username`=? AND `password`=?";
  
    db.query(query, [username, password], (err, results) => {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        if (results.length > 0) {
          const user = results;
          const token=generateToken();
          res.json({ id: results, token: token});
        } else {
          res.status(401).json({ error: 'Invalid username or password' });
        }
      }
    });
  });
  
  function generateToken() {
    return crypto.randomBytes(32).toString('hex');
  }
  


// get userID By Username
router.get('/user_id/:username', (req, res) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type');

  const username = req.params.username;

  const query = "SELECT user_id FROM user_login WHERE `username`=?";

  db.query(query, [username], (err, results) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      if (results.length > 0) {
        const userProfile = results[0];
        res.json({ userProfile });
      } else {
        res.status(404).json({ error: 'Username not found' });
      }
    }
  });
});


//get userProfile by userID
router.get('/profile/:id', (req, res) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
  
    const userId = req.params.id;
  
    const query = "SELECT * FROM user_profile WHERE `user_id`=?";
  
    db.query(query, [userId], (err, results) => {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        if (results.length > 0) {
          const userProfile = results[0];
          res.json({ userProfile});
        } else {
          res.status(404).json({ error: 'User profile not found' });
        }
      }
    });
  });

  //role_id
  router.get('/user-role/:id', (req, res) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
  
    const userId = req.params.id;
  
    const query = "SELECT role_type_id FROM user_role WHERE user_id=?";
  
    db.query(query, [userId], (err, results) => {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        if (results.length > 0) {
          const userRoles = results;
          res.json({ userRoles });
        } else {
          res.status(404).json({ error: 'User roles not found' });
        }
      }
    });
  });


  //user_auth
  router.get('/user-authorization', (req, res) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
  
    const userId = req.query.userId;
    const roleId = req.query.roleId;
  
    if (!userId || !roleId) {
      res.status(400).json({ error: 'userId and roleId are required' });
      return;
    }
  
    const query = "SELECT user_auth FROM user_role WHERE user_id=? AND role_type_id=?";
  
    db.query(query, [userId, roleId], (err, results) => {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        if (results.length > 0) {
          const userAuth = results[0].user_auth; // Assuming user_auth is a single value
          res.json({ userAuth });
        } else {
          res.status(404).json({ error: 'User Auth not found' });
        }
      }
    });
  });
  

  //rolename
  router.get('/rolename/:id', (req, res) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
  
    const roleTypeId = req.params.id;
  
    const query = "SELECT role_type_name FROM role_type WHERE role_type_id=?";
  
    db.query(query, [roleTypeId], (err, results) => {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        if (results.length > 0) {
          const roleName = results[0].role_type_name;
          res.json({ roleName });
        } else {
          res.status(404).json({ error: 'Role name not found' });
        }
      }
    });
  });
  

  router.post('/create-user', cors(), upload.single('image'), async (req, res) => {
    const {
      firstname,
      lastname,
      phone,
      email,
      addressId,
      createdBy,
    } = req.body;
  
  
    const userAdminQuery = `
      INSERT INTO user_profile (
        firstname,
        lastname,
        contact,
        email,
        created_by,
        address_id
      ) VALUES (?, ?, ?, ?, ?, ?)
    `;
  
    const userAdminParams = [
      firstname,
      lastname,
      phone,
      email,
      createdBy,
      addressId,
    ];
  
    db.query(userAdminQuery, userAdminParams, (err, data) => {
      if (err) {
        console.error('Error creating user:', err);
        return res.status(500).json({ error: 'Internal server error' });
      }
      console.log(data);
      return res.json(data.insertId);
    });
  });
  


  router.post('/create-user-login-credential', async (req, res) => {
    const {
      username,
      password,
      userId,
      createdBy,
    } = req.body;
  
    const userCredentialQuery = `
      INSERT INTO user_login (
        username,
        password,
        user_id,
        created_by
      ) VALUES (?, ?, ?, ?)
    `;
  
    const userCredentialParams = [
      username,
      password,
      userId,
      createdBy,
    ];
  
    db.query(userCredentialQuery, userCredentialParams, (err, data) => {
      if (err) {
        console.error('Error creating user:', err);
        return res.status(500).json({ error: 'Internal server error' });
      }
      console.log(data);
      return res.json(data.insertId);
    });
  });
  


  router.post('/create-user-set-roles', async (req, res) => {
    const {
      roleTypeId,
      userId,
      roleTypePlace,
    } = req.body;
  
    const userRoleQuery = `
      INSERT INTO user_role (
        role_type_id,
        user_id,
        role_place
      ) VALUES (?, ?, ?)
    `;
  
    const userRoleParams = [
      roleTypeId,
      userId,
      roleTypePlace,
    ];
  
    db.query(userRoleQuery, userRoleParams, (err, data) => {
      if (err) {
        console.error('Error creating user:', err);
        return res.status(500).json({ error: 'Internal server error' });
      }
      console.log(data);
      return res.json(data.insertId);
    });
  });
  
  

  // Set token to table for user active status
  router.post('/:username/:token', (req, res) => {
    const username = req.params.username;
    const token = req.params.token;
  
    // First, retrieve the user_id based on the provided username
    const getUserIdSql = "SELECT user_id FROM user_login WHERE username = ?";
    db.query(getUserIdSql, [username], (err, result) => {
      if (err || result.length === 0) {
        return res.json("Error: User not found");
      }
  
      const user_id = result[0].user_id;
  
      // Update the user_status in the user_profile table using the retrieved user_id
      const updateStatusSql = "UPDATE user_profile SET user_status = ? WHERE user_id = ?";
      db.query(updateStatusSql, [token, user_id], (err, data) => {
        if (err) {
          return res.json("Error updating user status");
        }
        return res.json({"status":"200"});
      });
    });
  });


module.exports = router;
