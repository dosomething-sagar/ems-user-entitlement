
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AssemblyManagement.css';

const AssemblyManagement = () => {
  const [assemblies, setAssemblies] = useState([]);
  const [newAssembly, setNewAssembly] = useState({ assembly_name: '', district_id: '' });
  const [editableAssembly, setEditableAssembly] = useState(null);
  const [updatedAssembly, setUpdatedAssembly] = useState({ assembly_id: null, assembly_name: '', district_id: '' });
  const [currentPage, setCurrentPage] = useState(1);
  const [assembliesPerPage] = useState(20); // Adjust the number of assemblies to display per page

  useEffect(() => {
    fetchAssemblies();
  }, []);

  const fetchAssemblies = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/assemblies');
      setAssemblies(response.data);
    } catch (error) {
      console.error('Error fetching assemblies:', error);
    }
  };

  const handleInputChange = (e, key, stateSetter) => {
    const { value } = e.target;
    stateSetter(prevState => ({ ...prevState, [key]: value }));
  };

  const handleAddAssembly = async () => {
    try {
      if (!newAssembly.assembly_name || !newAssembly.district_id) {
        console.error('Invalid input fields:', newAssembly);
        return;
      }

      const response = await axios.post('http://localhost:8080/api/assemblies', newAssembly);
      console.log('Assembly added successfully:', response.data);

      fetchAssemblies(); // Refetch assemblies after addition
      setNewAssembly({ assembly_name: '', district_id: '' });
    } catch (error) {
      console.error('Error adding assembly:', error);
    }
  };

  const handleUpdateAssembly = (assemblyId) => {
    setEditableAssembly(assemblyId);
    const assemblyToUpdate = assemblies.find(assembly => assembly.assembly_id === assemblyId);

    if (assemblyToUpdate) {
      setUpdatedAssembly({ ...assemblyToUpdate });
    } else {
      console.error(`Assembly with id ${assemblyId} not found.`);
    }
  };

  const handleSaveUpdatedAssembly = async (assemblyId) => {
    try {
      if (!assemblyId || isNaN(assemblyId)) {
        console.error('Invalid assemblyId:', assemblyId);
        return;
      }

      if (!updatedAssembly.assembly_name || !updatedAssembly.district_id) {
        console.error('Invalid input fields:', updatedAssembly);
        return;
      }

      const response = await axios.put(`http://localhost:8080/api/assemblies/${assemblyId}`, updatedAssembly);
      const updatedAssemblies = assemblies.map(assembly => (assembly.assembly_id === assemblyId ? response.data : assembly));
      setAssemblies(updatedAssemblies);
      setEditableAssembly(null);
      setUpdatedAssembly({ assembly_id: null, assembly_name: '', district_id: '' });
    } catch (error) {
      console.error('Error updating assembly:', error);
    }
  };

  const handleDeleteAssembly = async (assemblyId) => {
    try {
      await axios.delete(`http://localhost:8080/api/assemblies/${assemblyId}`);
      fetchAssemblies(); // Refetch assemblies after deletion
    } catch (error) {
      console.error('Error deleting assembly:', error);
    }
  };

  // Pagination
  const indexOfLastAssembly = currentPage * assembliesPerPage;
  const indexOfFirstAssembly = indexOfLastAssembly - assembliesPerPage;
  const currentAssemblies = assemblies.slice(indexOfFirstAssembly, indexOfLastAssembly);

  return (
    <div className="manage-assemblies-container" id='signup-container'>
      <title>EMS: Manage Assembly</title>
      <h1>Assemblies</h1>

      <div className="add-assembly-section">
        <h2>Add Assembly</h2>
        <div className="input-field">
          <label htmlFor="assemblyName">Assembly Name:</label>
          <input
            type="text"
            id="assemblyName"
            name="assembly_name"
            value={newAssembly.assembly_name}
            onChange={(e) => handleInputChange(e, 'assembly_name', setNewAssembly)}
          />
        </div>
        <div className="input-field">
          <label htmlFor="districtId">District ID:</label>
          <input
            type="text"
            id="districtId"
            name="district_id"
            value={newAssembly.district_id}
            onChange={(e) => handleInputChange(e, 'district_id', setNewAssembly)}
          />
        </div>
        <button className='btn' onClick={handleAddAssembly}>Add Assembly</button>
      </div>

      <div className="assembly-list">
        <h2>Assembly List</h2>
        <table>
          <thead>
            <tr>
              <th>Assembly Name</th>
              <th>District ID</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentAssemblies.map(assembly => (
              <tr key={assembly.assembly_id}>
                <td>{assembly.assembly_name}</td>
                <td>{assembly.district_id}</td>
                <td>
                  {editableAssembly === assembly.assembly_id ? (
                    <>
                      <input
                        type="text"
                        value={updatedAssembly.assembly_name}
                        onChange={(e) => handleInputChange(e, 'assembly_name', setUpdatedAssembly)}
                      />
                      <input
                        type="text"
                        value={updatedAssembly.district_id}
                        onChange={(e) => handleInputChange(e, 'district_id', setUpdatedAssembly)}
                      />
                      <button className='btn' onClick={() => handleSaveUpdatedAssembly(assembly.assembly_id)}>Save</button>
                    </>
                  ) : (
                    <>
                      <button className='btn' onClick={() => handleUpdateAssembly(assembly.assembly_id)}>Edit</button>
                      <button className='btn' onClick={() => handleDeleteAssembly(assembly.assembly_id)}>Delete</button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="pagination">
          {Array.from({ length: Math.ceil(assemblies.length / assembliesPerPage) }, (_, index) => (
            <button className='btn' key={index + 1} onClick={() => setCurrentPage(index + 1)}>
              {index + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AssemblyManagement;
