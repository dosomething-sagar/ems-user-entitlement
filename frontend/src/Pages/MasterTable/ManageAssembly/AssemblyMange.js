import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { IconButton, TextField, Button, Dialog, DialogTitle, DialogContent, DialogActions, Box, Modal, Skeleton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Toolbar} from '@mui/material';
import '../MasterTable.css';

const AssemblyManagement = () => {
  const [assemblies, setAssemblies] = useState([]);
  const [newAssembly, setNewAssembly] = useState({ assembly_name: '', district_id: '' });
  const [editableAssembly, setEditableAssembly] = useState(null);
  const [updatedAssembly, setUpdatedAssembly] = useState({ assembly_id: null, assembly_name: '', district_id: '' });
  const [currentPage, setCurrentPage] = useState(1);
  const [assembliesPerPage] = useState(50); // Adjust the number of assemblies to display per page
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [isAddAssemblyModalOpen, setAddAssemblyModalOpen] = useState(false);
  const [isEditAssemblyDialogOpen, setEditAssemblyDialogOpen] = useState(false);
  var pager=1;
  useEffect(() => {
    fetchAssemblies(1);
  }, []);

  const fetchAssemblies = async (page) => {
    try {
      setLoading(true);
      const response = await axios.get(`http://localhost:8080/api/assemblies?page=${page}&pageSize=${assembliesPerPage}`);
      const newAssemblies = response.data.map((assembly, index) => ({
        ...assembly,
        id: index + 1,
      }));

      setAssemblies(newAssemblies);
      setTotalPages(Math.ceil(response.headers['x-total-count'] / assembliesPerPage));
    } catch (error) {
      console.error('Error fetching assemblies:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e, key, stateSetter) => {
    const { value } = e.target;
    stateSetter((prevState) => ({ ...prevState, [key]: value }));
  };

  const handleAddAssembly = async () => {
    try {
      if (!newAssembly.assembly_name || !newAssembly.district_id) {
        console.error('Invalid input fields:', newAssembly);
        return;
      }

      const response = await axios.post('http://localhost:8080/api/assemblies', newAssembly);
      console.log('Assembly added successfully:', response.data);

      fetchAssemblies(1);
      setNewAssembly({ assembly_name: '', district_id: '' });
      setAddAssemblyModalOpen(false);
    } catch (error) {
      console.error('Error adding assembly:', error);
    }
  };

  const handleUpdateAssembly = (assemblyId) => {
    setEditableAssembly(assemblyId);
    const assemblyToUpdate = assemblies.find((assembly) => assembly.assembly_id === assemblyId);

    if (assemblyToUpdate) {
      setUpdatedAssembly({ ...assemblyToUpdate });
      setEditAssemblyDialogOpen(true);
    } else {
      console.error(`Assembly with id ${assemblyId} not found.`);
    }
  };

  const handleSaveUpdatedAssembly = async () => {
    try {
      const assemblyId = updatedAssembly.assembly_id;

      if (!assemblyId || isNaN(assemblyId)) {
        console.error('Invalid assemblyId:', assemblyId);
        return;
      }

      if (!updatedAssembly.assembly_name || !updatedAssembly.district_id) {
        console.error('Invalid input fields:', updatedAssembly);
        return;
      }

      const response = await axios.put(`http://localhost:8080/api/assemblies/${assemblyId}`, updatedAssembly);
      const updatedAssemblies = assemblies.map((assembly) =>
        assembly.assembly_id === assemblyId ? response.data : assembly
      );
      setAssemblies(updatedAssemblies);
      setEditableAssembly(null);
      setUpdatedAssembly({ assembly_id: null, assembly_name: '', district_id: '' });
      setEditAssemblyDialogOpen(false);
    } catch (error) {
      console.error('Error updating assembly:', error);
    }
  };

  const handleDeleteAssembly = async (assemblyId) => {
    try {
      await axios.delete(`http://localhost:8080/api/assemblies/${assemblyId}`);
      fetchAssemblies(1);
    } catch (error) {
      console.error('Error deleting assembly:', error);
    }
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    if (newPage > currentPage && newPage < totalPages && !loading) {
      fetchAssemblies(newPage + 1);
    }
  };

  const handleSearch = (e) => {
    setSearchText(e.target.value);
  };

  const filteredAssemblies = assemblies.filter(
    (assembly) =>
      (assembly.assembly_name && assembly.assembly_name.toLowerCase().includes(searchText.toLowerCase())) ||
      (assembly.district_id && assembly.district_id.toString().toLowerCase().includes(searchText.toLowerCase()))
  );

  const CustomToolbar = () => {
    return (
      <Toolbar sx={{marginBottom:'-10px'}}>
        <GridToolbar />
      </Toolbar>
    );
  };


  const columns = [
    { field: 'assembly_id', headerName: 'Assembly ID', flex: 1, sortable: true },
    {
      field: 'assembly_name',
      headerName: 'Assembly Name',
      flex: 1,
      sortable: true,
      renderCell: ({ row }) => (
        <TextField
          value={editableAssembly === row.assembly_id ? updatedAssembly.assembly_name : row.assembly_name}
          onChange={(e) => handleInputChange(e, 'assembly_name', setUpdatedAssembly)}
          InputProps={{
            readOnly: editableAssembly !== row.assembly_id, // Set readOnly based on edit mode
          }}
        />
      ),
    },
    {
      field: 'district_id',
      headerName: 'District ID',
      flex: 1,
      sortable: true,
      renderCell: ({ row }) => (
        <TextField
          value={editableAssembly === row.assembly_id ? updatedAssembly.district_id : row.district_id}
          onChange={(e) => handleInputChange(e, 'district_id', setUpdatedAssembly)}
          InputProps={{
            readOnly: editableAssembly !== row.assembly_id, // Set readOnly based on edit mode
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
          <IconButton style={{ color: 'blue' }} onClick={() => handleUpdateAssembly(row.assembly_id)}>
            <EditIcon />
          </IconButton>
          <IconButton  style={{ color: 'red' }} onClick={() => handleDeleteAssembly(row.assembly_id)}>
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
      <title>EMS : Assembly Manage</title>
      <h1>Assemblies</h1>

      {/* Add search input */}
      <TextField
        label="Search"
        variant="outlined"
        size="small"
        value={searchText}
        onChange={handleSearch}
        className="search-input"
      />

      {/* Add Assembly button */}
      <Button variant="contained" onClick={() => setAddAssemblyModalOpen(true)}>
        Add Assembly
      </Button>

      {/* Modal for adding a new assembly */}
      <Modal open={isAddAssemblyModalOpen} onClose={() => setAddAssemblyModalOpen(false)}>
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
          <h2>Add Assembly</h2>
          <div className="input-field">
            <label htmlFor="assemblyName">Assembly Name:</label>
            <input
              type="text"
              id="assemblyName"
              name="assembly_name"
              value={newAssembly.assembly_name}
              onChange={(e) =>
                setNewAssembly((prevState) => ({ ...prevState, assembly_name: e.target.value }))
              }
            />
          </div>
          <div className="input-field">
            <label htmlFor="districtId">District ID:</label>
            <input
              type="text"
              id="districtId"
              name="district_id"
              value={newAssembly.district_id}
              onChange={(e) =>
                setNewAssembly((prevState) => ({ ...prevState, district_id: e.target.value }))
              }
            />
          </div>
          <Button  variant="contained" onClick={handleAddAssembly}>
            Add Assembly
          </Button>
        </Box>
      </Modal>

      {/* Dialog for editing an existing assembly */}
      <Dialog open={isEditAssemblyDialogOpen} onClose={() => setEditAssemblyDialogOpen(false)}>
        <DialogTitle>Edit Assembly</DialogTitle>
        <DialogContent>
          <div className="input-field">
            <label htmlFor="editAssemblyName">Assembly Name:</label>
            <TextField
              type="text"
              id="editAssemblyName"
              name="assembly_name"
              value={updatedAssembly.assembly_name}
              onChange={(e) => handleInputChange(e, 'assembly_name', setUpdatedAssembly)}
            />
          </div>
          <div className="input-field">
            <label htmlFor="editDistrictId">District ID:</label>
            <TextField
              type="text"
              id="editDistrictId"
              name="district_id"
              value={updatedAssembly.district_id}
              onChange={(e) => handleInputChange(e, 'district_id', setUpdatedAssembly)}
            />
          </div>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={handleSaveUpdatedAssembly}>
            Save
          </Button>
        </DialogActions>
      </Dialog>

      <div className="data-grid-container">
        {loading ? (
          <LoadingSkeleton />
        ) : (
          <DataGrid
            rows={filteredAssemblies}
            columns={columns}
            pageSize={assembliesPerPage}
            rowsPerPageOptions={[25]}
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

export default AssemblyManagement;
