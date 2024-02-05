
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { IconButton, TextField, Button, Dialog, DialogTitle, DialogContent, DialogActions, Box, Modal, Skeleton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import '../MasterTable.css';
import { Toolbar} from '@mui/material';


const StateManagement = () => {
  const [states, setStates] = useState([]);
  const [newState, setNewState] = useState({ state_name: '', state_code: '' });
  const [editableState, setEditableState] = useState(null);
  const [updatedState, setUpdatedState] = useState({ state_id: null, state_name: '', state_code: '' });
  const [currentPage, setCurrentPage] = useState(1);
  const [statesPerPage] = useState(50);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [isAddStateModalOpen, setAddStateModalOpen] = useState(false);
  const [isEditStateDialogOpen, setEditStateDialogOpen] = useState(false);

  useEffect(() => {
    fetchStates(1);
  }, []);

  const fetchStates = async (page) => {
    try {
      setLoading(true);

      const response = await axios.get(`http://localhost:8080/api/states?page=${page}&pageSize=${statesPerPage}`);
      const newStates = response.data.map((state, index) => ({
        ...state,
        id: index + 1,
      }));

      setStates(newStates);
      setTotalPages(Math.ceil(response.headers['x-total-count'] / statesPerPage));
    } catch (error) {
      console.error('Error fetching states:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e, key, stateSetter) => {
    const { value } = e.target;
    stateSetter((prevState) => ({ ...prevState, [key]: value }));
  };

  const handleAddState = async () => {
    try {
      if (!newState.state_name || !newState.state_code) {
        console.error('Invalid input fields:', newState);
        return;
      }

      const response = await axios.post('http://localhost:8080/api/states', newState);
      console.log('State added successfully:', response.data);

      fetchStates(1);
      setNewState({ state_name: '', state_code: '' });
      setAddStateModalOpen(false);
    } catch (error) {
      console.error('Error adding state:', error);
    }
  };

  const handleUpdateState = (stateId) => {
    setEditableState(stateId);
    const stateToUpdate = states.find((state) => state.state_id === stateId);

    if (stateToUpdate) {
      setUpdatedState({ ...stateToUpdate });
      setEditStateDialogOpen(true);
    } else {
      console.error(`State with id ${stateId} not found.`);
    }
  };

  const handleSaveUpdatedState = async () => {
    try {
      const stateId = updatedState.state_id;

      if (!stateId || isNaN(stateId)) {
        console.error('Invalid stateId:', stateId);
        return;
      }

      if (!updatedState.state_name || !updatedState.state_code) {
        console.error('Invalid input fields:', updatedState);
        return;
      }

      const response = await axios.put(`http://localhost:8080/api/states/${stateId}`, updatedState);
      const updatedStates = states.map((state) =>
        state.state_id === stateId ? response.data : state
      );
      setStates(updatedStates);
      setEditableState(null);
      setUpdatedState({ state_id: null, state_name: '', state_code: '' });
      setEditStateDialogOpen(false);
    } catch (error) {
      console.error('Error updating state:', error);
    }
  };

  const handleDeleteState = async (stateId) => {
    try {
      await axios.delete(`http://localhost:8080/api/states/${stateId}`);
      fetchStates(1);
    } catch (error) {
      console.error('Error deleting state:', error);
    }
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    if (newPage > currentPage && newPage < totalPages && !loading) {
      fetchStates(newPage + 1);
    }
  };

  const handleSearch = (e) => {
    setSearchText(e.target.value);
  };

  const filteredStates = states.filter(
    (state) =>
      (state.state_name && state.state_name.toLowerCase().includes(searchText.toLowerCase())) ||
      (state.state_code && state.state_code.toLowerCase().includes(searchText.toLowerCase()))
  );

  const columns = [
    { field: 'state_id', headerName: 'State ID', flex: 1, sortable: true },
    {
      field: 'state_name',
      headerName: 'State Name',
      flex: 1,
      sortable: true,
      renderCell: ({ row }) => (
        <TextField
          value={editableState === row.state_id ? updatedState.state_name : row.state_name}
          onChange={(e) => handleInputChange(e, 'state_name', setUpdatedState)}
          InputProps={{
            readOnly: editableState !== row.state_id, // Set readOnly based on edit mode
          }}
        />
      ),
    },
    {
      field: 'state_code',
      headerName: 'State Code',
      flex: 1,
      sortable: true,
      renderCell: ({ row }) => (
        <TextField
          value={editableState === row.state_id ? updatedState.state_code : row.state_code}
          onChange={(e) => handleInputChange(e, 'state_code', setUpdatedState)}
          InputProps={{
            readOnly: editableState !== row.state_id, // Set readOnly based on edit mode
          }}
        />
      ),
    },
    {
      field: 'actions',
      headerName: 'Actions',
      flex: 1,
      sortable: false,
      renderCell: ({ row }) => (
        <>
          <IconButton style={{ color: 'blue' }} onClick={() => handleUpdateState(row.state_id)}>
            <EditIcon />
          </IconButton>
          <IconButton style={{ color: 'red' }} onClick={() => handleDeleteState(row.state_id)}>
            <DeleteIcon />
          </IconButton>
        </>
      ),
    },
  ];

  const LoadingSkeleton = () => (
    <Box p={2} mb={2} boxShadow={1}>
      <Skeleton animation="wave" height={50} />
      <Skeleton animation="wave" height={50} />
      <Skeleton animation="wave" height={50} />
    </Box>
  );

  const CustomToolbar = () => {
    return (
      <Toolbar sx={{marginBottom:'-10px'}}>
        <GridToolbar />
      </Toolbar>
    );
  };

  return (
    <div className="master-manage-container" id='signup-container'>
      <title>EMS : State Manage</title>
      <h1>States</h1>

      {/* Add search input */}
      <TextField
        label="Search"
        variant="outlined"
        size="small"
        value={searchText}
        onChange={handleSearch}
        className="search-input"
      />

      {/* Add State button */}
      <Button variant="contained" onClick={() => setAddStateModalOpen(true)}>
        Add State
      </Button>

      {/* Modal for adding a new state */}
      <Modal open={isAddStateModalOpen} onClose={() => setAddStateModalOpen(false)}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
          }}
        >
          <h2>Add State</h2>
          <div className="input-field">
            <label htmlFor="stateName">State Name:</label>
            <input
              type="text"
              id="stateName"
              name="state_name"
              value={newState.state_name}
              onChange={(e) =>
                setNewState((prevState) => ({ ...prevState, state_name: e.target.value }))
              }
            />
          </div>
          <div className="input-field">
            <label htmlFor="stateCode">State Code:</label>
            <input
              type="text"
              id="stateCode"
              name="state_code"
              value={newState.state_code}
              onChange={(e) => setNewState((prevState) => ({ ...prevState, state_code: e.target.value }))}
            />
          </div>
          <Button variant="contained" onClick={handleAddState}>
            Add State
          </Button>
        </Box>
      </Modal>

      {/* Dialog for editing an existing state */}
      <Dialog open={isEditStateDialogOpen} onClose={() => setEditStateDialogOpen(false)}>
        <DialogTitle>Edit State</DialogTitle>
        <DialogContent>
          <div className="input-field">
            <label htmlFor="editStateName">State Name:</label>
            <TextField
              type="text"
              id="editStateName"
              name="state_name"
              value={updatedState.state_name}
              onChange={(e) => handleInputChange(e, 'state_name', setUpdatedState)}
            />
          </div>
          <div className="input-field">
            <label htmlFor="editStateCode">State Code:</label>
            <TextField
              type="text"
              id="editStateCode"
              name="state_code"
              value={updatedState.state_code}
              onChange={(e) => handleInputChange(e, 'state_code', setUpdatedState)}
            />
          </div>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={handleSaveUpdatedState}>
            Save
          </Button>
        </DialogActions>
      </Dialog>

      <div className="data-grid-container">
      {loading ? (
          <LoadingSkeleton />
        ) : (
        <DataGrid
          rows={filteredStates}
          columns={columns}
          pageSize={statesPerPage}
          rowsPerPageOptions={[25, 50, 100]}
          pagination
          page={currentPage}
          density="compact"
          components={{
            Toolbar: CustomToolbar,
          }}
          onPageChange={(params) => handlePageChange(params.page)}
        />
        )}
      </div>
    </div>
  );
};

export default StateManagement;

