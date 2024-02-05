import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './CreateAdmin.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import PermissionManager from '../../Components/PermissionManager/PermissionManager';

function UpdateUser(props) {
  const [values, setValues] = useState({
    firstname: '',
    lastname: '',
    phone: '',
    email: '',
    image: '',
    address: '',
    postalCode: '',
    country: 'India',
    createdBy: props.user?.username,
    state: '',
    city: '',
    username: '',
    password: '',
    roleType: '',
    rolePlace: '',
    parliamentSeats: '',
    assemblySeats: '',
    states: [],
    cities: [],
    roleTypes: [],
  });
  const [permissions,setPermissions]=useState([]);

  var result = null,
  tmp = [];
var items = window.location.search.substr(1).split("&");
for (var index = 0; index < items.length; index++) {
  tmp = items[index].split("=");
  if (tmp[0] === "userid") result = decodeURIComponent(tmp[1]);
}
  var role_id;
  const [parliamentSeatOptions, setParliamentSeatOptions] = useState([]);
  const [assemblySeatOptions, setAssemblySeatOptions] = useState([]);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    if (result != null) {
      // Fetch user details on component mount
      axios.get(`http://localhost:8080/api/user/${result}`)
        .then((response) => {
          setValues((prev) => ({ ...prev, firstname: response.data.firstname }));
          setValues((prev) => ({ ...prev, lastname: response.data.lastname }));
          setValues((prev) => ({ ...prev, phone: response.data.contact }));
          setValues((prev) => ({ ...prev, email: response.data.email }));
          setValues((prev) => ({ ...prev, image: response.data.image }));
          setValues((prev) => ({ ...prev, addressID: response.data.address_id }));


          axios.get(`http://localhost:8080/api/address/${response.data.address_id}`)
            .then((addressResponse) => {
              const addressData = addressResponse.data[0];
              setValues((prev) => ({ ...prev, address: addressData.street }));
              setValues((prev) => ({ ...prev, city: addressData.district_id }));
              setValues((prev) => ({ ...prev, state: addressData.state_id }));
              setValues((prev) => ({ ...prev, postalCode: addressData.postal_code }));
            })
            .catch((error) => {
              console.error('Error fetching address:', error);
            });

          axios.get(`http://localhost:8080/api/user/user-role/${result}`)
            .then((roleResponse) => {
              const userRoleData = roleResponse.data.userRoles[0];
              setValues((prev) => ({ ...prev, roleType: ''+userRoleData.role_type_id }));
              role_id=userRoleData.role_type_id;
              setValues((prev) => ({ ...prev, rolePlace: userRoleData.role_place }));
              setPermissions(JSON.parse(userRoleData.user_auth));
            })
            .catch((error) => {
              console.error('Error fetching user role:', error);
            });

          axios.get(`http://localhost:8080/api/user_logins/${response.data.user_id}`)
            .then((loginResponse) => {
              const loginData = loginResponse.data[0];
              setValues((prev) => ({ ...prev, username: loginData.username }));
              setValues((prev) => ({ ...prev, password: loginData.password }));
            })
            .catch((error) => {
              console.error('Error fetching user login:', error);
            });
        })
        .catch((error) => {
          console.error('Error fetching user profile:', error);
        });
    }

    const fetchData = async () => {
      try {
        // Fetch states and role types
        const responseStates = await axios.get('http://localhost:8080/service/indian-states');
        setValues((prev) => ({ ...prev, states: responseStates.data }));

        const responseRoleTypes = await axios.get('http://localhost:8080/service/roles');
        setValues((prev) => ({ ...prev, roleTypes: responseRoleTypes.data.results }));

        if (values.state) {
          // Fetch Parliament seats and cities based on selected state
          const responseParliamentSeats = await axios.get(`http://localhost:8080/service/parliament-seats/${values.state}`);
          setParliamentSeatOptions(responseParliamentSeats.data.seats);

          const responseCities = await axios.get(`http://localhost:8080/service/indian-cities/${values.state}`);
          setValues((prev) => ({ ...prev, cities: responseCities.data.cities }));

          if (values.city) {
            // Fetch Assembly seats based on selected city
            const responseAssemblySeats = await axios.get(`http://localhost:8080/service/assembly-seats/${values.city}`);
            setAssemblySeatOptions(responseAssemblySeats.data.seats);
          }
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [values.state, values.city, result]);

  const handleInput = (event) => {
    setValues((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const handleImageInput = (event) => {
    setValues((prev) => ({ ...prev, [event.target.name]: event.target.files[0] }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setErrors(validateForm(values));

    if (Object.keys(errors).length === 0) {
      // Update user profile
      axios.put(`http://localhost:8080/api/user/${result}`, {
        firstname: values.firstname,
        lastname: values.lastname,
        contact: values.phone,
        email: values.email,
        // ... other user profile fields
      })
        .then((response) => {
          console.log(response.data.message);

          // Update user address
          axios.put(`http://localhost:8080/api/address/${values.addressID}`, {
            street: values.address,
            district_id: values.city,
            state_id: values.state,
            postal_code: values.postalCode,
          })
            .then((response) => {
              console.log(response.data.message);

              // Update user login credentials
              axios.put(`http://localhost:8080/api/user_logins/${result}`, {
                username: values.username,
                password: values.password,
              })
                .then((response) => {
                  console.log(response.data.message);

                  // Update user roles
                  axios.put(`http://localhost:8080/api/user/update-user-roles/${result}`, {
                    roleTypeId: parseInt(values.roleType),
                    roleTypePlace: values.rolePlace,
                    userPerms: JSON.stringify(permissions),
                  })
                    .then((response) => {
                      console.log(response.data.message);
                      navigate('/');
                    })
                    .catch((error) => console.error('Error updating user roles:', error));
                })
                .catch((error) => console.error('Error updating user login credentials:', error));
            })
            .catch((error) => console.error('Error updating address:', error));
        })
        .catch((error) => console.error('Error updating user profile:', error));
    }
  };

  const validateForm = (data) => {
    let errors = {};

    for (const field of ['firstname', 'lastname', 'phone', 'email', 'address', 'postalCode', 'state', 'username', 'password', 'roleType']) {
      if (!data[field]) {
        errors[field] = 'This field is required';
      }
    }

    const allowedFormats = ['jpg', 'png', 'jpeg'];
    const imageExtension = data.image ? data.image.name.split('.').pop().toLowerCase() : null;
    if (data.image && !allowedFormats.includes(imageExtension)) {
      errors.image = 'Image must be in JPG, PNG, or JPEG format';
    }

    if (data.roleType === 'Parliament' && !data.parliamentSeats) {
      errors.parliamentSeats = 'This field is required for Parliament seat type';
    }

    if (data.roleType === 'Assembly' && (!data.city || !data.assemblySeats)) {
      errors.city = 'This field is required';
      errors.assemblySeats = 'City and Assembly seats are required for Assembly seat type';
    }

    return errors;
  };
  return (
    <>
    {props.user?.role[0]==="Super Admin"?<title>EMS: Upadate User Admin</title>:<title>EMS: Modify User</title>}
    <div className="signup-boxp"id='signup-container' style={{backgroundColor:'#f4f4f4'}}>
      <div className='signup-box'>
        {props.user?.role[0]==="Super Admin"?<h2 style={{marginBottom:'20px', textAlign:'center'}}>Modify User Admin</h2>:<h2 style={{marginBottom:'20px', textAlign:'center'}}>Modify User</h2>}
        <form onSubmit={handleSubmit}>
          <div className='form-field'>
            <div className='form-group'>
              <label htmlFor='firstname'>First Name</label>
              <input type='text' value={values.firstname}  pattern="[A-Za-z]+" placeholder='Enter First Name' onChange={handleInput} name='firstname' className='inputss' required/>
              {errors.firstname && <span className='error-message'>{errors.firstname}</span>}
            </div>
            <div className='form-group'>
              <label htmlFor='lastname'>Last Name</label>
              <input type='text'value={values.lastname}  pattern="[A-Za-z]+" placeholder='Enter Last Name' onChange={handleInput} name='lastname' className='inputss' required/>
              {errors.lastname && <span className='error-message'>{errors.lastname}</span>}
            </div>
            <div className='form-group'>
              <label htmlFor='phone'>Phone</label>
              <input
                type='text'
                value={values.phone}
                pattern='[6-9][0-9]{9}'
                placeholder='Enter Phone'
                onChange={handleInput}
                name='phone'
                className='inputss'
                title='Please enter a 10-digit Indian phone number starting with 6, 7, 8, or 9'
                required
              />
              {errors.phone && <span className='error-message'>{errors.phone}</span>}
            </div>
            <div className='form-group'>
              <label htmlFor='email'>Email</label>
              <input
                type='email'
                value={values.email}
                pattern="/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/"
                placeholder='Enter Email'
                onChange={handleInput}
                name='email'
                className='inputss'
                title='Please enter a valid email address'
                required
              />
              {errors.email && <span className='error-message'>{errors.email}</span>}
            </div>
            <div className='form-group'>
              <label htmlFor='address'>Address</label>
              <input type='text' value={values.address}placeholder='Enter Address' onChange={handleInput} name='address' className='inputss' required/>
              {errors.address && <span className='error-message'>{errors.address}</span>}
            </div>
            <div className='form-group'>
              <label htmlFor='postalCode'>Postal Code</label>
              <input
                type='text'
                value={values.postalCode}
                pattern='[1-9][0-9]{5}'
                placeholder='Enter Postal Code'
                onChange={handleInput}
                name='postalCode'
                className='inputss'
                title='Please enter a 6-digit Indian postal code starting with a non-zero digit'
                required
              />
              {errors.postalCode && <span className='error-message'>{errors.postalCode}</span>}
            </div>
            <div className='form-group'>
              <label htmlFor='state'>State</label>
              <select name='state' onChange={handleInput} value={values.state} className='inputss'  required>
                <option value=''>Select State</option>
                {values.states && values.states.map((state) => (
                  <option key={state.state_id} value={state.state_id}>{state.state_name}</option>
                ))}
              </select>
              {errors.state && <span className='error-message'>{errors.state}</span>}
            </div>
                <div className='form-group'>
                  <label htmlFor='city'>City</label>
                  <select name='city' onChange={handleInput} value={values.city} className='inputss' required>
                    <option value=''>Select City</option>
                    {values.cities && values.cities.map((city) => (
                      <option key={city.district_id} value={city.district_id}>{city.district_name}</option>
                    ))}
                  </select>
                  {errors.city && <span className='error-message'>{errors.city}</span>}
                </div>
                {props.user?.role[0].role_type_name==="Super Admin"?
                          <>
                            <div className='form-group'>
                            <label htmlFor='roleTypes'>User Type</label>
                              <select name='roleType' value={values.roleType} onChange={handleInput} className='inputss' required>
                                <option value=''>Select User Type</option>
                                {values.roleTypes && values.roleTypes.map((role) => (
                                  <>
                                    {role.role_type_id===1||role.role_type_id===2||role.role_type_id===3?
                                    <option key={role.role_type_name} value={role.role_type_id}>{role.role_type_name}</option>:<></>}
                                  </>
                                ))}
                              </select>
                              {errors.roleType && <span className='error-message'>{errors.roleType}</span>}
                            </div>
                            {values.roleType==='1' && <PermissionManager role_id={role_id} user={props.user} permissions={permissions} setPermissions={setPermissions} page='update'  roleType={values.roleType}/>}
                          
                            {values.roleType==='2' && (
                              <>
                              <div className='form-group'>
                                <label htmlFor='rolePlace'>Parliament Seats</label>
                                <select
                                value={values.rolePlace}
                                  name='rolePlace'
                                  onChange={handleInput}
                                  className='inputss'
                                  required
                                >
                                  <option value=''>Select Parliament Seats</option>
                                  {parliamentSeatOptions.map((seat) => (
                                    <option key={seat} value={seat}>
                                      {seat}
                                    </option>
                                  ))}
                                </select>
                                {errors.parliamentSeats && (
                                  <span className='error-message'>{errors.parliamentSeats}</span>
                                )}
                              </div>
                              </>
                            )}

                            {values.roleType ==='3' && (
                              <>

                                <div className='form-group'>
                                <label htmlFor='rolePlace'>Assembly Seats</label>
                                <select
                                     value={values.rolePlace}
                                  name='rolePlace'
                                  onChange={handleInput}
                                  className='inputss' 
                                  required
                                >
                                  <option value=''>Select Assembly Seats</option>
                                  {assemblySeatOptions.map((seat) => (
                                    <option key={seat} value={seat}>
                                      {seat}
                                    </option>
                                  ))}
                                </select>
                                {errors.assemblySeats && (
                                  <span className='error-message'>{errors.assemblySeats}</span>
                                )}
                              </div>
                              </>
                            )}
                         {values.roleType==='2' && (
                            <PermissionManager role_id={role_id} permissions={permissions} page='update' setPermissions={setPermissions} user={props.user} roleType={values.roleType}/>
                          )}
                          {values.roleType==='3' && (
                            <PermissionManager role_id={role_id} permissions={permissions} page='update' setPermissions={setPermissions} user={props.user} roleType={values.roleType}/>
                          )}
                          </>  :
                          <>
                            {props.user?.role[0].role_type_name==='Parliament'||props.user?.role[0].role_type_name==='Assembly'||props.user?.role[0].role_type_name==='Subadmin'?
                              <>
                                <div className='form-group'>
                                <label htmlFor='roleType'>User Type</label>
                                  <select name='roleType'value={values.roleType} onChange={handleInput} className='inputss' required>
                                    <option value=''>Select User Type</option>
                                    {values.roleTypes && values.roleTypes.map((role) => (
                                      role.role_type_id===1||role.role_type_id===2||role.role_type_id===3?
                                      <></>:<option key={role.role_type_id} value={role.role_type_id}>{role.role_type_name}</option>
                                    ))}
                                  </select>
                                  {errors.roleType && <span className='error-message'>{errors.roleType}</span>}
                                </div>
                                <div className='form-group'>
                                <label htmlFor='rolePlace'>Area ID or Name</label>
                                <input type='text'value={values.rolePlace} placeholder='Enter Area ID or Name' onChange={handleInput} name='rolePlace' className='inputss' required/>
                                {errors.lastname && <span className='error-message'>{errors.lastname}</span>}
                              </div>
                            </>  
                            :<></>
                            }
                          </>
              }
             <div className='form-group'>
              <label htmlFor='image'>Profile Image (JPG/PNG/JPEG)</label>
              <input type="file" accept="image/*"value={values.image} onChange={handleImageInput} className='inputss' />
              {errors.image && <span className='error-message'>{errors.image}</span>}
            </div>
            <div className='form-group'>
              <label htmlFor='username'>Username</label>
              <input type='text'value={values.username} placeholder='Enter Username' onChange={handleInput}  name='username' className='inputss' required/>
              {errors.username && <span className='error-message'>{errors.username}</span>}
            </div>
            <div className='form-group'>
              <label htmlFor='password'>Password</label>
              <input
                type='password'
                value={values.password}
                placeholder='Enter Password'
                onChange={handleInput}
                name='password'
                pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{8,}"
                title="Password must contain at least one uppercase letter, one lowercase letter, one number, one special character, and be at least 8 characters long"
                className='inputss'
                required
              />
              {errors.password && <span className='error-message'>{errors.password}</span>}
            </div>

          </div>
          <button type='submit' className='btn btn-success w-100'>{props.user?.role[0]?<strong>Update User </strong>:<strong>Create User</strong>}</button>
        </form>
      </div>
    </div>
    </>
  );
}

export default UpdateUser;






