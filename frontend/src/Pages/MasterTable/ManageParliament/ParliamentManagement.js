import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { IconButton, TextField, Button, Dialog, DialogTitle, DialogContent, DialogActions, Box, Modal, Skeleton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Toolbar} from '@mui/material';
import '../MasterTable.css';

const ParliamentManagement = () => {
  const [parliaments, setParliaments] = useState([]);
  const [newParliament, setNewParliament] = useState({ parliament_name: '', state_id: '' });
  const [editableParliament, setEditableParliament] = useState(null);
  const [updatedParliament, setUpdatedParliament] = useState({ parliament_id: null, parliament_name: '', state_id: '' });
  const [currentPage, setCurrentPage] = useState(1);
  const [parliamentsPerPage] = useState(50);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [isAddParliamentModalOpen, setAddParliamentModalOpen] = useState(false);
  const [isEditParliamentDialogOpen, setEditParliamentDialogOpen] = useState(false);

  useEffect(() => {
    fetchParliaments(1);
  }, []);

  const fetchParliaments = async (page) => {
    try {
      setLoading(true);

      const response = await axios.get(`http://localhost:8080/api/parliaments?page=${page}&pageSize=${parliamentsPerPage}`);
      const newParliaments = response.data.map((parliament, index) => ({
        ...parliament,
        id: index + 1,
      }));

      setParliaments(newParliaments);
      setTotalPages(Math.ceil(response.headers['x-total-count'] / parliamentsPerPage));
    } catch (error) {
      console.error('Error fetching parliaments:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e, key, stateSetter) => {
    const { value } = e.target;
    stateSetter((prevState) => ({ ...prevState, [key]: value }));
  };

  const handleAddParliament = async () => {
    try {
      if (!newParliament.parliament_name || !newParliament.state_id) {
        console.error('Invalid input fields:', newParliament);
        return;
      }

      const response = await axios.post('http://localhost:8080/api/parliaments', newParliament);
      console.log('Parliament added successfully:', response.data);

      fetchParliaments(1);
      setNewParliament({ parliament_name: '', state_id: '' });
      setAddParliamentModalOpen(false);
    } catch (error) {
      console.error('Error adding parliament:', error);
    }
  };

  const handleUpdateParliament = (parliamentId) => {
    setEditableParliament(parliamentId);
    const parliamentToUpdate = parliaments.find((parliament) => parliament.parliament_id === parliamentId);

    if (parliamentToUpdate) {
      setUpdatedParliament({ ...parliamentToUpdate });
      setEditParliamentDialogOpen(true);
    } else {
      console.error(`Parliament with id ${parliamentId} not found.`);
    }
  };

  const handleSaveUpdatedParliament = async () => {
    try {
      const parliamentId = updatedParliament.parliament_id;

      if (!parliamentId || isNaN(parliamentId)) {
        console.error('Invalid parliamentId:', parliamentId);
        return;
      }

      if (!updatedParliament.parliament_name || !updatedParliament.state_id) {
        console.error('Invalid input fields:', updatedParliament);
        return;
      }

      const response = await axios.put(`http://localhost:8080/api/parliaments/${parliamentId}`, updatedParliament);
      const updatedParliaments = parliaments.map((parliament) =>
        parliament.parliament_id === parliamentId ? response.data : parliament
      );
      setParliaments(updatedParliaments);
      setEditableParliament(null);
      setUpdatedParliament({ parliament_id: null, parliament_name: '', state_id: '' });
      setEditParliamentDialogOpen(false);
    } catch (error) {
      console.error('Error updating parliament:', error);
    }
  };

  const handleDeleteParliament = async (parliamentId) => {
    try {
      await axios.delete(`http://localhost:8080/api/parliaments/${parliamentId}`);
      fetchParliaments(1);
    } catch (error) {
      console.error('Error deleting parliament:', error);
    }
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    if (newPage > currentPage && newPage < totalPages && !loading) {
      fetchParliaments(newPage + 1);
    }
  };

  const handleSearch = (e) => {
    setSearchText(e.target.value);
  };

  const filteredParliaments = parliaments.filter(
    (parliament) =>
      (parliament.parliament_name && parliament.parliament_name.toLowerCase().includes(searchText.toLowerCase())) ||
      (parliament.state_id && parliament.state_id.toString().toLowerCase().includes(searchText.toLowerCase()))
  );

  const CustomToolbar = () => {
    return (
      <Toolbar sx={{marginBottom:'-10px'}}>
        <GridToolbar />
      </Toolbar>
    );
  };


  const columns = [
    { field: 'parliament_id', headerName: 'Parliament ID', flex: 1, sortable: true },
    {
      field: 'parliament_name',
      headerName: 'Parliament Name',
      flex: 1,
      sortable: true,
      renderCell: ({ row }) => (
        <TextField
          value={editableParliament === row.parliament_id ? updatedParliament.parliament_name : row.parliament_name}
          onChange={(e) => handleInputChange(e, 'parliament_name', setUpdatedParliament)}
          InputProps={{
            readOnly: editableParliament !== row.parliament_id, // Set readOnly based on edit mode
          }}
        />
      ),
    },
    {
      field: 'state_id',
      headerName: 'State ID',
      flex: 1,
      sortable: true,
      renderCell: ({ row }) => (
        <TextField
          value={editableParliament === row.parliament_id ? updatedParliament.state_id : row.state_id}
          onChange={(e) => handleInputChange(e, 'state_id', setUpdatedParliament)}
          InputProps={{
            readOnly: editableParliament !== row.parliament_id, // Set readOnly based on edit mode
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
          <IconButton style={{ color: 'blue' }} onClick={() => handleUpdateParliament(row.parliament_id)}>
            <EditIcon />
          </IconButton>
          <IconButton   style={{ color: 'red' }} onClick={() => handleDeleteParliament(row.parliament_id)}>
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

  return (
    <div className="master-manage-container" id='signup-container'>
      <title>EMS : Parliament Manage</title>
      <h1>Parliaments</h1>

      {/* Add search input */}
      <TextField
        label="Search"
        variant="outlined"
        size="small"
        value={searchText}
        onChange={handleSearch}
        className="search-input"
      />

      {/* Add Parliament button */}
      <Button variant="contained" onClick={() => setAddParliamentModalOpen(true)}>
        Add Parliament
      </Button>

      {/* Modal for adding a new parliament */}
      <Modal open={isAddParliamentModalOpen} onClose={() => setAddParliamentModalOpen(false)}>
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
          <h2>Add Parliament</h2>
          <div className="input-field">
            <label htmlFor="parliamentName">Parliament Name:</label>
            <input
              type="text"
              id="parliamentName"
              name="parliament_name"
              value={newParliament.parliament_name}
              onChange={(e) =>
                setNewParliament((prevState) => ({ ...prevState, parliament_name: e.target.value }))
              }
            />
          </div>
          <div className="input-field">
            <label htmlFor="stateId">State ID:</label>
            <input
              type="text"
              id="stateId"
              name="state_id"
              value={newParliament.state_id}
              onChange={(e) => setNewParliament((prevState) => ({ ...prevState, state_id: e.target.value }))}
            />
          </div>
          <Button variant="contained" onClick={handleAddParliament}>
            Add Parliament
          </Button>
        </Box>
      </Modal>

      {/* Dialog for editing an existing parliament */}
      <Dialog open={isEditParliamentDialogOpen} onClose={() => setEditParliamentDialogOpen(false)}>
        <DialogTitle>Edit Parliament</DialogTitle>
        <DialogContent>
          <div className="input-field">
            <label htmlFor="editParliamentName">Parliament Name:</label>
            <TextField
              type="text"
              id="editParliamentName"
              name="parliament_name"
              value={updatedParliament.parliament_name}
              onChange={(e) => handleInputChange(e, 'parliament_name', setUpdatedParliament)}
            />
          </div>
          <div className="input-field">
            <label htmlFor="editStateId">State ID:</label>
            <TextField
              type="text"
              id="editStateId"
              name="state_id"
              value={updatedParliament.state_id}
              onChange={(e) => handleInputChange(e, 'state_id', setUpdatedParliament)}
            />
          </div>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={handleSaveUpdatedParliament}>
            Save
          </Button>
        </DialogActions>
      </Dialog>

      <div className="data-grid-container">
      {loading ? (
          <LoadingSkeleton />
        ) : (
        <DataGrid
          rows={filteredParliaments}
          columns={columns}
          pageSize={parliamentsPerPage}
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

export default ParliamentManagement;
