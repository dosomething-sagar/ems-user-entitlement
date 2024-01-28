import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../ManageAssembly/AssemblyManagement.css'; // Import your CSS file


const ParliamentManagement = () => {
  const [parliaments, setParliaments] = useState([]);
  const [newParliament, setNewParliament] = useState({ parliament_name: '', state_id: '' });
  const [editableParliament, setEditableParliament] = useState(null);
  const [updatedParliament, setUpdatedParliament] = useState({ parliament_id: null, parliament_name: '', state_id: '' });
  const [currentPage, setCurrentPage] = useState(1);
  const [parliamentsPerPage] = useState(50); // Adjust the number of parliaments to display per page

  useEffect(() => {
    fetchParliaments();
  }, []);

  const fetchParliaments = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/parliaments');
      setParliaments(response.data);
    } catch (error) {
      console.error('Error fetching parliaments:', error);
    }
  };

  const handleInputChange = (e, key, stateSetter) => {
    const { value } = e.target;
    stateSetter(prevState => ({ ...prevState, [key]: value }));
  };

  const handleAddParliament = async () => {
    try {
      if (!newParliament.parliament_name || !newParliament.state_id) {
        console.error('Invalid input fields:', newParliament);
        return;
      }

      const response = await axios.post('http://localhost:8080/api/parliaments', newParliament);
      console.log('Parliament added successfully:', response.data);

      fetchParliaments(); // Refetch parliaments after addition
      setNewParliament({ parliament_name: '', state_id: '' });
    } catch (error) {
      console.error('Error adding parliament:', error);
    }
  };

  const handleUpdateParliament = (parliamentId) => {
    setEditableParliament(parliamentId);
    const parliamentToUpdate = parliaments.find(parliament => parliament.parliament_id === parliamentId);

    if (parliamentToUpdate) {
      setUpdatedParliament({ ...parliamentToUpdate });
    } else {
      console.error(`Parliament with id ${parliamentId} not found.`);
    }
  };

  const handleSaveUpdatedParliament = async (parliamentId) => {
    try {
      if (!parliamentId || isNaN(parliamentId)) {
        console.error('Invalid parliamentId:', parliamentId);
        return;
      }

      if (!updatedParliament.parliament_name || !updatedParliament.state_id) {
        console.error('Invalid input fields:', updatedParliament);
        return;
      }

      const response = await axios.put(`http://localhost:8080/api/parliaments/${parliamentId}`, updatedParliament);
      const updatedParliaments = parliaments.map(parliament => (parliament.parliament_id === parliamentId ? response.data : parliament));
      setParliaments(updatedParliaments);
      setEditableParliament(null);
      setUpdatedParliament({ parliament_id: null, parliament_name: '', state_id: '' });
    } catch (error) {
      console.error('Error updating parliament:', error);
    }
  };

  const handleDeleteParliament = async (parliamentId) => {
    try {
      await axios.delete(`http://localhost:8080/api/parliaments/${parliamentId}`);
      fetchParliaments(); // Refetch parliaments after deletion
    } catch (error) {
      console.error('Error deleting parliament:', error);
    }
  };

  // Pagination
  const indexOfLastParliament = currentPage * parliamentsPerPage;
  const indexOfFirstParliament = indexOfLastParliament - parliamentsPerPage;
  const currentParliaments = parliaments.slice(indexOfFirstParliament, indexOfLastParliament);

  return (
    <div className="manage-assemblies-container" id='signup-container'>
      <title>EMS: Manage Parliament</title>
      <h1>Parliaments</h1>

      <div className="add-city-section">
        <h2>Add Parliament</h2>
        <div className="input-field">
          <label htmlFor="parliamentName">Parliament Name:</label>
          <input
            type="text"
            id="parliamentName"
            name="parliament_name"
            value={newParliament.parliament_name}
            onChange={(e) => handleInputChange(e, 'parliament_name', setNewParliament)}
          />
        </div>
        <div className="input-field">
          <label htmlFor="stateId">State ID:</label>
          <input
            type="text"
            id="stateId"
            name="state_id"
            value={newParliament.state_id}
            onChange={(e) => handleInputChange(e, 'state_id', setNewParliament)}
          />
        </div>
        <button className='btn' onClick={handleAddParliament}>Add Parliament</button>
      </div>

      <div className="assembly-list">
        <h2>Parliament List</h2>
        <table>
          <thead>
            <tr>
              <th>Parliament Name</th>
              <th>State ID</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentParliaments.map(parliament => (
              <tr key={parliament.parliament_id}>
                <td>{parliament.parliament_name}</td>
                <td>{parliament.state_id}</td>
                <td>
                  {editableParliament === parliament.parliament_id ? (
                    <>
                      <input
                        type="text"
                        value={updatedParliament.parliament_name}
                        onChange={(e) => handleInputChange(e, 'parliament_name', setUpdatedParliament)}
                      />
                      <input
                        type="text"
                        value={updatedParliament.state_id}
                        onChange={(e) => handleInputChange(e, 'state_id', setUpdatedParliament)}
                      />
                      <button className='btn' onClick={() => handleSaveUpdatedParliament(parliament.parliament_id)}>Save</button>
                    </>
                  ) : (
                    <>
                      <button className='btn' onClick={() => handleUpdateParliament(parliament.parliament_id)}>Edit</button>
                      <button className='btn' onClick={() => handleDeleteParliament(parliament.parliament_id)}>Delete</button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="pagination">
          {Array.from({ length: Math.ceil(parliaments.length / parliamentsPerPage) }, (_, index) => (
            <button key={index + 1} onClick={() => setCurrentPage(index + 1)}>
              {index + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ParliamentManagement;
