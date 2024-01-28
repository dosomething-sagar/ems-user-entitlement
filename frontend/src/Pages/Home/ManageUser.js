
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate} from 'react-router-dom';
import './ManageUser.css';

const UserManage = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  // const { userId } = useParams();

  useEffect(() => {
    // Fetch users based on the combined search term
    const url = `http://localhost:8080/api/user_profile?search=${searchTerm}`;

    axios.get(url)
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        console.error('Error fetching users:', error);
      });
  }, [searchTerm]);

  const handleEdit = (user) => {
    setSelectedUser(user);
    // Add navigation to UpdateUser page with search parameter
    navigate(`/update-user?userid=${user.user_id}&search=${searchTerm}`);
  };

  const handleSave = () => {
    // Send updated user data to the server
    axios.put(`http://localhost:8080/api/user_profile/${selectedUser.user_id}`, selectedUser)
      .then(() => {
        // Refresh user data after a successful update
        axios.get(`http://localhost:8080/api/user_profile?search=${searchTerm}`)
          .then((response) => {
            setUsers(response.data);
            setSelectedUser(null);
          })
          .catch((error) => {
            console.error('Error fetching users:', error);
          });
      })
      .catch((error) => {
        console.error('Error updating user:', error);
      });
  };

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div id='signup-container' className='signup-container'>
      <h1>User Management</h1>

      {/* Single search input field */}
      <div className='search-form'>
        <label htmlFor='searchTerm'>Search:</label>
        <input type='text' name='searchTerm' value={searchTerm} onChange={handleInputChange} />
      </div>

      <div className='edit-card'>
        {users.map((user) => (
          <div key={user.user_id} style={{ border: '1px solid #ddd', padding: '10px', margin: '10px', width: '300px' }}>
            {selectedUser && selectedUser.user_id === user.user_id ? (
              <>
                <div className='edit-form'>
                  <label>
                    First Name:
                    <input type="text" name="firstname" value={selectedUser.firstname} onChange={handleInputChange} />
                  </label>
                  <br />
               <label>
                 Last Name:
                <input type="text" name="lastname" value={selectedUser.lastname} onChange={handleInputChange} />
               </label>
               <label>
                  Email:
                  <input type="text" name="email" value={selectedUser.email} onChange={handleInputChange} />
                </label>
               <br />               <label>
                  Contact:
                  <input type="text" name="contact" value={selectedUser.contact} onChange={handleInputChange} />
                </label>
                <br />
               <label>
                 Image:
                  <input type="text" name="image" value={selectedUser.image} onChange={handleInputChange} />
               </label>
              <br />
                <label>
                  User Status:
                  <input type="text" name="user_status" value={selectedUser.user_status} onChange={handleInputChange} />
                </label>
                <br />
                <label>
                  Address ID:
                  <input type="text" name="address_id" value={selectedUser.address_id} onChange={handleInputChange} />
               </label>
               <br />
                  <button onClick={handleSave}>Save</button>
                </div>
              </>
            ) : (
              <>
                <div className='edit-form-card'>
                  <p>First Name: {user.firstname}</p>
                  <p>Last Name: {user.lastname}</p>
               <p>Email: {user.email}</p>
               <p>Contact: {user.contact}</p>
               <p>User Status: {user.user_status}</p>
                <p>Address ID: {user.address_id}</p>
                  <button onClick={() => handleEdit(user)}>Edit</button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserManage;
