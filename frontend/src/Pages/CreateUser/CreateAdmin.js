import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './CreateAdmin.css';
import PermissionManager from '../../Components/PermissionManager/PermissionManager';
import 'bootstrap/dist/css/bootstrap.min.css';

const ConfirmationModal = ({ show, onConfirm, onCancel }) => {
  return (
    show && (
      <div className="confirmation-modal">
        <p>Are you sure you want to submit the form?</p>
        <button onClick={onConfirm}>Confirm</button>
        <button onClick={onCancel}>Cancel</button>
      </div>
    )
  );
};

function CreateUser(props) {
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

  const [permissions, setPermissions] = useState([]);
  const [parliamentSeatOptions, setParliamentSeatOptions] = useState([]);
  const [assemblySeatOptions, setAssemblySeatOptions] = useState([]);
  const [errors, setErrors] = useState({});
  const [showConfirmation, setShowConfirmation] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseStates = await axios.get('http://localhost:8080/service/indian-states');
        setValues((prev) => ({ ...prev, states: responseStates.data }));

        const responseRoleTypes = await axios.get('http://localhost:8080/service/roles');
        setValues((prev) => ({ ...prev, roleTypes: responseRoleTypes.data.results }));

        if (values.state) {
          const responseParliamentSeats = await axios.get(
            `http://localhost:8080/service/parliament-seats/${values.state}`
          );
          setParliamentSeatOptions(responseParliamentSeats.data.seats);

          const responseCities = await axios.get(
            `http://localhost:8080/service/indian-cities/${values.state}`
          );
          setValues((prev) => ({ ...prev, cities: responseCities.data.cities }));

          if (values.city) {
            const responseAssemblySeats = await axios.get(
              `http://localhost:8080/service/assembly-seats/${values.city}`
            );
            setAssemblySeatOptions(responseAssemblySeats.data.seats);
          }
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [values.state, values.city]);

  const handleInput = (event) => {
    setValues((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const handleImageInput = (event) => {
    setValues((prev) => ({ ...prev, [event.target.name]: event.target.files[0] }));
  };

  const validateForm = (data) => {
    let errors = {};

    for (const field of [
      'firstname',
      'lastname',
      'phone',
      'email',
      'address',
      'postalCode',
      'state',
      'username',
      'password',
      'roleType',
    ]) {
      if (!data[field]) {
        errors[field] = 'This field is required';
      }
    }

    if (!data.password) {
      errors.password = 'Password is required';
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

  const handleConfirm = () => {
    const formData = new FormData();
    setErrors(validateForm(values));

    if (Object.keys(errors).length === 0) {
      axios
        .post('http://localhost:8080/service/create-address', {
          address: values.address,
          postalCode: values.postalCode,
          country: values.country,
          state: parseInt(values.state),
          city: parseInt(values.city),
        })
        .then((addressResponse) => {
          const addressId = addressResponse.data;
          formData.append('image', values.image);

          const userData = {
            firstname: values.firstname,
            lastname: values.lastname,
            phone: values.phone,
            email: values.email,
            image: values.image,
            createdBy: values.createdBy,
            addressId: addressId,
          };

          axios
            .post('http://localhost:8080/api/user/create-user', userData)
            .then((userResponse) => {
              const userId = userResponse.data;
              const place =
                values.parliamentSeats !== ''
                  ? values.parliamentSeats
                  : values.assemblySeats !== ''
                  ? values.assemblySeats
                  : values.rolePlace;
              const userCredential = {
                username: values.username,
                password: values.password,
                userId: parseInt(userId),
                createdBy: values.createdBy,
              };

              const userRole = {
                roleTypeId: parseInt(values.roleType),
                userId: parseInt(userId),
                roleTypePlace: place,
                userPerms:JSON.stringify(permissions),
              };
              console.log(permissions);
              axios
                .post('http://localhost:8080/api/user/create-user-login-credential', userCredential)
                .then((results) => console.log(results))
                .catch((err) => console.log(err));

              axios
                .post('http://localhost:8080/api/user/create-user-set-roles', userRole)
                .then((results) => {
                  console.log(results);
                })
                .catch((err) => console.log(err));

              navigate('/');
            })
            .catch((err) => console.log(err));
        })
        .catch((err) => console.log(err));
    }
  };

  const handleCancel = () => {
    console.log('Form submission canceled.');
    setShowConfirmation(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setShowConfirmation(true);
  };

  return (
    <>
      {props.user?.role[0].role_type_name === 'Super Admin' ? (
        <title>EMS: Create User Admin</title>
      ) : (
        <title>EMS: Create User</title>
      )}
      <div className="signup-boxp" id="signup-container">
        <div className="signup-box">
          {props.user?.role[0].role_type_name === 'Super Admin' ? (
            <h2 style={{ marginBottom: '20px', textAlign: 'center' }}>Create User Admin</h2>
          ) : (
            <h2 style={{ marginBottom: '20px', textAlign: 'center' }}>Create User</h2>
          )}
          <form onSubmit={handleSubmit}>
          <div className='form-field'>
            <div className='form-group'>
              <label htmlFor='firstname'>First Name</label>
              <input type='text' placeholder='Enter First Name'  pattern="[A-Za-z]+" onChange={handleInput} name='firstname' className='inputss' required/>
              {errors.firstname && <span className='error-message'>{errors.firstname}</span>}
            </div>
            <div className='form-group'>
              <label htmlFor='lastname'>Last Name</label>
              <input type='text' placeholder='Enter Last Name'  pattern="[A-Za-z]+" onChange={handleInput} name='lastname' className='inputss' required/>
              {errors.lastname && <span className='error-message'>{errors.lastname}</span>}
            </div>
            <div className='form-group'>
              <label htmlFor='phone'>Phone</label>
              <input
                type='text'
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
              <input type='text' placeholder='Enter Address' onChange={handleInput} name='address' className='inputss' required/>
              {errors.address && <span className='error-message'>{errors.address}</span>}
            </div>
            <div className='form-group'>
              <label htmlFor='postalCode'>Postal Code</label>
              <input
                type='text'
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
              <select name='state' onChange={handleInput} className='inputss'  required>
                <option value=''>Select State</option>
                {values.states && values.states.map((state) => (
                  <option key={state.state_id} value={state.state_id}>{state.state_name}</option>
                ))}
              </select>
              {errors.state && <span className='error-message'>{errors.state}</span>}
            </div>
                <div className='form-group'>
                  <label htmlFor='city'>City</label>
                  <select name='city' onChange={handleInput} className='inputss' required>
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
                            {values.roleType==='1' && <PermissionManager user={props.user} permissions={permissions} setPermissions={setPermissions} page='create'  roleType={values.roleType}/>}
                            {values.roleType === '2' && (
                            <>
                              <div className='form-group'>
                                <label htmlFor='parliamentSeats'>Parliament Seats</label>
                                <select
                                  name='parliamentSeats'
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

                          {values.roleType === '3' && (
                            <>
                              <div className='form-group'>
                                <label htmlFor='assemblySeats'>Assembly Seats</label>
                                <select
                                  name='assemblySeats'
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
                            <PermissionManager permissions={permissions} page='create' setPermissions={setPermissions} user={props.user} roleType={values.roleType}/>
                          )}
                          {values.roleType==='3' && (
                            <PermissionManager permissions={permissions} page='create' setPermissions={setPermissions} user={props.user} roleType={values.roleType}/>
                          )}

                          </>  :
                          <>
                            {props.user?.role[0].role_type_name==='Parliament'||props.user?.role[0].role_type_name==='Assembly'||props.user?.role[0]==='Subadmin'?
                              <>
                                <div className='form-group'>
                                <label htmlFor='roleType'>User Type</label>
                                  <select name='roleType' onChange={handleInput} className='inputss' required>
                                    <option value=''>Select User Type</option>
                                    {values.roleTypes && values.roleTypes.map((role) => (
                                      role.role_type_id===1||role.role_type_id===2||role.role_type_id===3?
                                      <></>:<option key={role.role_type_id} value={role.role_type_id}>{role.role_type_name}</option>
                                    ))}
                                  </select>
                                  {errors.roleType && <span className='error-message'>{errors.roleType}</span>}
                                </div>
                                {values.roleType&&
                                <div className='form-group'>
                                <label htmlFor='rolePlace'>Area ID or Name</label>
                                <input type='text' placeholder='Enter Area ID or Name' onChange={handleInput} name='rolePlace' className='inputss' required/>
                                {errors.lastname && <span className='error-message'>{errors.lastname}</span>}
                              </div>}
                              {values.roleType && <PermissionManager page='create' permissions={permissions} setPermissions={setPermissions} user={props.user} roleType={values.roleType}/>}
                            </>  
                            :<></>
                            }
                          </>
              }
             <div className='form-group'>
              <label htmlFor='image'>Profile Image (JPG/PNG/JPEG)</label>
              <input type="file" accept="image/*" onChange={handleImageInput} className='inputss' />
              {errors.image && <span className='error-message'>{errors.image}</span>}
            </div>
            <div className='form-group'>
              <label htmlFor='username'>Username</label>
              <input type='text' placeholder='Enter Username' onChange={handleInput}  name='username' className='inputss' required/>
              {errors.username && <span className='error-message'>{errors.username}</span>}
            </div>
            <div className='form-group'>
              <label htmlFor='password'>Password</label>
              <input
                type='password'
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
          <button type='submit' className='btn btn-success w-100'>{props.user?.role[0]?<strong>Create User Admin</strong>:<strong>Create User</strong>}</button>

          </form>
        </div>
      </div>

      {/* Confirmation Modal */}
      <ConfirmationModal
        show={showConfirmation}
        onConfirm={handleConfirm}
        onCancel={handleCancel}
      />
    </>
  );
}

export default CreateUser;
