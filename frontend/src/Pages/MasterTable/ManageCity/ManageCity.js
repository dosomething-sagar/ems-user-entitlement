// ManageCity.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../ManageAssembly/AssemblyManagement.css'; // Import your CSS file

const ManageCity = (props) => {
  const [cities, setCities] = useState([]);
  const [newCity, setNewCity] = useState({ district_name: '', district_code: '', state_id: '' });
  const [editableCity, setEditableCity] = useState(null);
  const [updatedCity, setUpdatedCity] = useState({ id: null, district_name: '', district_code: '', state_id: '' });
  const [currentPage, setCurrentPage] = useState(1);
  const [citiesPerPage] = useState(50); // Set the number of cities to display per page

  useEffect(() => {
    axios.get('http://localhost:8080/api/cities')
      .then(response => setCities(response.data))
      .catch(error => console.error('Error fetching districts:', error));
  }, []);

  const handleInputChange = (e, key, stateSetter) => {
    const { value } = e.target;
    stateSetter(prevState => ({ ...prevState, [key]: value }));
  };

  const handleAddCity = () => {
    // Validate input fields before making the request
    if (!newCity.district_name || !newCity.district_code || !newCity.state_id) {
      console.error('Invalid input fields:', newCity);
      return;
    }

    axios.post('http://localhost:8080/api/cities', newCity)
      .then(response => {
        console.log('City added successfully:', response.data);
        setCities([...cities, response.data]);
        setNewCity({ district_name: '', district_code: '', state_id: '' });
      })
      .catch(error => {
        console.error('Error adding city:', error);
      });
  };

  const handleUpdateCity = (cityId) => {
    setEditableCity(cityId);
    const cityToUpdate = cities.find(city => city.district === cityId);

    if (cityToUpdate) {
      setUpdatedCity({ ...cityToUpdate });
    } else {
      console.error(`City with id ${cityId} not found.`);
    }
  };

  const handleSaveUpdatedCity = (cityId) => {
    console.log('City ID:', cityId);
  
    if (!cityId || isNaN(cityId)) {
      console.error('Invalid cityId:', cityId);
      return;
    }
  
    if (!updatedCity.district_name || !updatedCity.district_code || !updatedCity.state_id) {
      console.error('Invalid input fields:', updatedCity);
      return;
    }
  
    axios.put(`http://localhost:8080/api/cities/${cityId}`, updatedCity)
      .then(response => {
        const updatedCities = cities.map(city => (city.id === cityId ? response.data : city));
        setCities(updatedCities);
        setEditableCity(null);
        setUpdatedCity({ id: null, district_name: '', district_code: '', state_id: '' }); // Reset the state
      })
      .catch(error => console.error('Error updating city:', error));
  };

// Assuming you have a function like this in your React component
const handleDeleteDistrict = (districtId) => {
  axios.delete(`http://localhost:8080/api/cities/${districtId}`)
    .then(response => {
      // Handle success
    })
    .catch(error => {
      console.error('Error deleting district:', error);
    });
};

// And in your component where you render the delete button



  // Pagination
  const indexOfLastCity = currentPage * citiesPerPage;
  const indexOfFirstCity = indexOfLastCity - citiesPerPage;
  const currentCities = cities.slice(indexOfFirstCity, indexOfLastCity);

  const paginate = pageNumber => setCurrentPage(pageNumber);

  return (
    <div className="manage-assemblies-container" id='signup-container'>
      <title>EMS: Manage City</title>
      <h1>Cities</h1>

      <div className="add-city-section">
        {props?.auth?.create?<><h2>Add City</h2>
        <div className="input-field">
          <label htmlFor="districtName">District Name:</label>
          <input
            type="text"
            id="districtName"
            name="district_name"
            value={newCity.district_name}
            onChange={(e) => handleInputChange(e, 'district_name', setNewCity)}
          />
        </div></>:<></>}
        <div className="input-field">
          <label htmlFor="districtCode">District Code:</label>
          <input
            type="text"
            id="districtCode"
            name="district_code"
            value={newCity.district_code}
            onChange={(e) => handleInputChange(e, 'district_code', setNewCity)}
          />
        </div>
        <div className="input-field">
          <label htmlFor="stateId">State ID:</label>
          <input
            type="text"
            id="stateId"
            name="state_id"
            value={newCity.state_id}
            onChange={(e) => handleInputChange(e, 'state_id', setNewCity)}
          />
        </div>
        <button className='btn' onClick={handleAddCity}>Add City</button>
      </div>

      <h2>Cities List</h2>
      <table>
        <thead>
          <tr>
            <th>District Name</th>
            <th>District Code</th>
            <th>State ID</th>
          </tr>
        </thead>
        <tbody>
          {currentCities.map(city => (
            <tr key={city.district_id}>
              {editableCity === city.district_id ? (
                <>
                  <td>
                    <input
                      type="text"
                      value={updatedCity.district_name}
                      onChange={(e) => handleInputChange(e, 'district_name', setUpdatedCity)}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      value={updatedCity.district_code}
                      onChange={(e) => handleInputChange(e, 'district_code', setUpdatedCity)}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      value={updatedCity.state_id}
                      onChange={(e) => handleInputChange(e, 'state_id', setUpdatedCity)}
                    />
                  </td>
                  <td>
                    <button className='btn' onClick={() => handleSaveUpdatedCity(city.district_id)}>Save</button>
                  </td>
                </>
              ) : (
                <>
                  <td>{city.district_name}</td>
                  <td>{city.district_code}</td>
                  <td>{city.state_id}</td>
                  <td>
                    <button className='btn' onClick={() => handleUpdateCity(city.district_id)}>Edit</button>
                   <button className='btn' onClick={() => handleDeleteDistrict(city.district_id)}>Delete District</button>
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="pagination">
        {Array.from({ length: Math.ceil(cities.length / citiesPerPage) }, (_, index) => (
          <button className='btn' key={index + 1} onClick={() => paginate(index + 1)}>
            {index + 1}
          </button>
        ))}
      </div>

     
    </div>
  );
};

export default ManageCity;


