import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Login.css'; // Import the custom CSS file

function Login(props) {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    username: '',
    password: '',
  });
  const [error, setError] = useState('');
  var userAuth;

  const handleInput = (event) => {
    setValues((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const appendData = (roles) => {
    props.setUser((prevData) => ({
      ...prevData,
      role: roles,
      username:values.username,
      userAuth:userAuth,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    axios
      .post('http://localhost:8080/api/user/login', values)
      .then((res) => {
        props.setIsAuthTrue(true);
        props.setToken(res.data.token);
        const fetchUserId = async () => {
          try {
            const response = await axios.get(`http://localhost:8080/api/user/user_id/${values.username}`);
            const userID = response.data.userProfile.user_id;
            const fetchUserProfile = async (userID) => {
              try {
                const response = await axios.get(`http://localhost:8080/api/user/profile/${userID}`);
                localStorage.setItem('token', res.data.token);
                props.setUser(response.data.userProfile);
                const fetchUserRoles = async (userID) => {
                  try {
                    const respons = await axios.get(`http://localhost:8080/api/user/user-role/${userID}`);
                    const fetchRoleNames = async () => {
                      try {
                        const roleNamesPromises = respons.data.userRoles.map(async (roleTypeId) => {
                          const response = await axios.get(`http://localhost:8080/api/user/rolename/${roleTypeId.role_type_id}`);
                          const userAuthResponse = await axios.get(`http://localhost:8080/api/user/user-authorization?userId=${userID}&roleId=${roleTypeId.role_type_id}`);
                          const userAuthData = userAuthResponse.data.userAuth;
                          const validJsonString = userAuthData
                          .replace(/(['"])?([a-zA-Z0-9_]+)(['"])?:/g, '"$2":')
                          .replace(/'/g, '"');
                          
                          const userAuthJson = JSON.parse(validJsonString);
                          userAuth=userAuthJson;
                          return response.data.roleName;
                        });
                        const roleNames = await Promise.all(roleNamesPromises);
                        props.showMessage(`${roleNames[0]} Login Successful`, '#4CAF50');
                        appendData(roleNames);
                        navigate('/');
                      } catch (error) {
                        console.error('Error fetching role names:', error);
                      }
                    };
                    fetchRoleNames();
                  } catch (error) {
                    setError(error.response ? error.response.data.error : 'Error fetching user details');
                  }
                };

                fetchUserRoles(response.data.userProfile.user_id);
              } catch (error) {
                setError(error.response ? error.response.data.error : 'Error fetching user details');
              }
            };

            fetchUserProfile(userID);
          } catch (error) {
            setError(error.response ? error.response.data.error : 'Error fetching user details');
          }
        };

        fetchUserId();
      })
      .catch((err) => {
        console.log(err);
        if (err.response) {
          console.error('Response Status:', err.response.status);
          props.showMessage('Invalid username or password', '#F44336');
          setError('Invalid username or password');
        } else if (err.request) {
          console.error('Request made but no response received:', err.request);
        } else {
          console.error('Axios Error:', err.message);
        }
      });
  };

  return (
    <>
      <title>EMS : Login</title>
      <div className='login-container'>
        <div className='login-box'>
          <h2>Login</h2>
          <form action='' onSubmit={handleSubmit}>
            <div className='input-group'>
              <label htmlFor='username'>Username</label>
              <input
                type='text'
                placeholder='Username'
                name='username'
                id='username'
                onChange={handleInput}
                className='rounded-input'
                required
              />
            </div>
            <div className='input-group'>
              <label htmlFor='password'>Password</label>
              <input
                type='password'
                name='password'
                id='password'
                placeholder='Enter Password'
                onChange={handleInput}
                className='rounded-input'
                required
              />
            </div>
            {error && <div className='error-message'>{error}</div>}
            <button type='submit' className='login-button'>
              <strong>Log In</strong>
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default Login;
