import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../ManageAssembly/AssemblyManagement.css'; // Import your CSS file


const StateManagement = () => {
  const [states, setStates] = useState([]);
  const [newState, setNewState] = useState({ state_name: '', state_code: '' });
  const [editableState, setEditableState] = useState(null);
  const [updatedState, setUpdatedState] = useState({ state_id: null, state_name: '', state_code: '' });
  const [currentPage, setCurrentPage] = useState(1);
  const [statesPerPage] = useState(50); // Adjust the number of states to display per page

  useEffect(() => {
    fetchStates();
  }, []);

  const fetchStates = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/states');
      setStates(response.data);
    } catch (error) {
      console.error('Error fetching states:', error);
    }
  };

  const handleInputChange = (e, key, stateSetter) => {
    const { value } = e.target;
    stateSetter(prevState => ({ ...prevState, [key]: value }));
  };

  const handleAddState = async () => {
    try {
      if (!newState.state_name || !newState.state_code) {
        console.error('Invalid input fields:', newState);
        return;
      }

      const response = await axios.post('http://localhost:8080/api/states', newState);
      console.log('State added successfully:', response.data);

      fetchStates(); // Refetch states after addition
      setNewState({ state_name: '', state_code: '' });
    } catch (error) {
      console.error('Error adding state:', error);
    }
  };

  const handleUpdateState = (stateId) => {
    setEditableState(stateId);
    const stateToUpdate = states.find(state => state.state_id === stateId);

    if (stateToUpdate) {
      setUpdatedState({ ...stateToUpdate });
    } else {
      console.error(`State with id ${stateId} not found.`);
    }
  };

  const handleSaveUpdatedState = async (stateId) => {
    try {
      if (!stateId || isNaN(stateId)) {
        console.error('Invalid stateId:', stateId);
        return;
      }

      if (!updatedState.state_name || !updatedState.state_code) {
        console.error('Invalid input fields:', updatedState);
        return;
      }

      const response = await axios.put(`http://localhost:8080/api/states/${stateId}`, updatedState);
      const updatedStates = states.map(state => (state.state_id === stateId ? response.data : state));
      setStates(updatedStates);
      setEditableState(null);
      setUpdatedState({ state_id: null, state_name: '', state_code: '' });
    } catch (error) {
      console.error('Error updating state:', error);
    }
  };

  const handleDeleteState = async (stateId) => {
    try {
      await axios.delete(`http://localhost:8080/api/states/${stateId}`);
      fetchStates(); // Refetch states after deletion
    } catch (error) {
      console.error('Error deleting state:', error);
    }
  };

  // Pagination
  const indexOfLastState = currentPage * statesPerPage;
  const indexOfFirstState = indexOfLastState - statesPerPage;
  const currentStates = states.slice(indexOfFirstState, indexOfLastState);

  return (
    <div className="manage-assemblies-container" id='signup-container'>
      <title>EMS: Manage State</title>
      <h1>States</h1>

      <div className="add-city-section">
        <h2>Add State</h2>
        <div className="input-field">
          <label htmlFor="stateName">State Name:</label>
          <input
            type="text"
            id="stateName"
            name="state_name"
            value={newState.state_name}
            onChange={(e) => handleInputChange(e, 'state_name', setNewState)}
          />
        </div>
        <div className="input-field">
          <label htmlFor="stateCode">State Code:</label>
          <input
            type="text"
            id="stateCode"
            name="state_code"
            value={newState.state_code}
            onChange={(e) => handleInputChange(e, 'state_code', setNewState)}
          />
        </div>
        <button className='btn' onClick={handleAddState}>Add State</button>
      </div>

      <div className="assembly-list">
        <h2>State List</h2>
        <table>
          <thead>
            <tr>
              <th>State Name</th>
              <th>State Code</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentStates.map(state => (
              <tr key={state.state_id}>
                <td>{state.state_name}</td>
                <td>{state.state_code}</td>
                <td>
                  {editableState === state.state_id ? (
                    <>
                      <input
                        type="text"
                        value={updatedState.state_name}
                        onChange={(e) => handleInputChange(e, 'state_name', setUpdatedState)}
                      />
                      <input
                        type="text"
                        value={updatedState.state_code}
                        onChange={(e) => handleInputChange(e, 'state_code', setUpdatedState)}
                      />
                      <button className='btn' onClick={() => handleSaveUpdatedState(state.state_id)}>Save</button>
                    </>
                  ) : (
                    <>
                      <button className='btn' onClick={() => handleUpdateState(state.state_id)}>Edit</button>
                      <button className='btn' onClick={() => handleDeleteState(state.state_id)}>Delete</button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="pagination">
          {Array.from({ length: Math.ceil(states.length / statesPerPage) }, (_, index) => (
            <button key={index + 1} onClick={() => setCurrentPage(index + 1)}>
              {index + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StateManagement;
