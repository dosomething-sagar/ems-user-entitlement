import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { IconButton, TextField, Button, Dialog, DialogTitle, DialogContent, DialogActions, Box, Modal, Skeleton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Toolbar} from '@mui/material';
 import '../MasterTable.css';

const ManageCity = () => {
  const [cities, setCities] = useState([]);
  const [newCity, setNewCity] = useState({ district_name: '', district_code: '', state_id: '' });
  const [editableCity, setEditableCity] = useState(null);
  const [updatedCity, setUpdatedCity] = useState({ id: null, district_name: '', district_code: '', state_id: '' });
  const [currentPage, setCurrentPage] = useState(1);
  const [citiesPerPage] = useState(50);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [isAddCityModalOpen, setAddCityModalOpen] = useState(false);
  const [isEditCityDialogOpen, setEditCityDialogOpen] = useState(false);

  useEffect(() => {
    fetchCities(1);
  }, []);

  const fetchCities = async (page) => {
    try {
      setLoading(true);
      const response = await axios.get(`http://localhost:8080/api/cities?page=${page}&pageSize=${citiesPerPage}`);
      const newCities = response.data.map((city, index) => ({ ...city, id: index + 1 }));
      setCities(newCities);
      setTotalPages(Math.ceil(response.headers['x-total-count'] / citiesPerPage));
    } catch (error) {
      console.error('Error fetching cities:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e, key, stateSetter) => {
    const { value } = e.target;
    stateSetter((prevState) => ({ ...prevState, [key]: value }));
  };

  const handleAddCity = async () => {
    try {
      if (!newCity.district_name || !newCity.district_code || !newCity.state_id) {
        console.error('Invalid input fields:', newCity);
        return;
      }

      const response = await axios.post('http://localhost:8080/api/cities', newCity);
      console.log('City added successfully:', response.data);

      fetchCities(1);
      setNewCity({ district_name: '', district_code: '', state_id: '' });
      setAddCityModalOpen(false);
    } catch (error) {
      console.error('Error adding city:', error);
    }
  };

  const handleUpdateCity = (cityId) => {
    setEditableCity(cityId);
    const cityToUpdate = cities.find((city) => city.id === cityId);

    if (cityToUpdate) {
      setUpdatedCity({ ...cityToUpdate });
      setEditCityDialogOpen(true);
    } else {
      console.error(`City with id ${cityId} not found.`);
    }
  };

  const handleSaveUpdatedCity = async () => {
    try {
      const cityId = updatedCity.id;

      if (!cityId || isNaN(cityId)) {
        console.error('Invalid cityId:', cityId);
        return;
      }

      if (!updatedCity.district_name || !updatedCity.district_code || !updatedCity.state_id) {
        console.error('Invalid input fields:', updatedCity);
        return;
      }

      const response = await axios.put(`http://localhost:8080/api/cities/${cityId}`, updatedCity);
      const updatedCities = cities.map((city) => (city.id === cityId ? response.data : city));
      setCities(updatedCities);
      setEditableCity(null);
      setUpdatedCity({ id: null, district_name: '', district_code: '', state_id: '' });
      setEditCityDialogOpen(false);
    } catch (error) {
      console.error('Error updating city:', error);
    }
  };

  const handleDeleteCity = async (cityId) => {
    try {
      await axios.delete(`http://localhost:8080/api/cities/${cityId}`);
      fetchCities(1);
    } catch (error) {
      console.error('Error deleting city:', error);
    }
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    if (newPage > currentPage && newPage < totalPages && !loading) {
      fetchCities(newPage + 1);
    }
  };

  const handleSearch = (e) => {
    setSearchText(e.target.value);
  };

  const filteredCities = cities.filter(
    (city) =>
      (city.district_name && city.district_name.toLowerCase().includes(searchText.toLowerCase())) ||
      (city.district_code && city.district_code.toLowerCase().includes(searchText.toLowerCase())) ||
      (city.state_id && city.state_id.toString().toLowerCase().includes(searchText.toLowerCase()))
  );

  const CustomToolbar = () => {
    return (
      <Toolbar sx={{marginBottom:'-10px'}}>
        <GridToolbar />
      </Toolbar>
    );
  };


  const columns = [
    { field: 'id', headerName: 'ID', flex: 1, sortable: true },
    {
      field: 'district_name',
      headerName: 'District Name',
      flex: 1,
      sortable: true,
      renderCell: ({ row }) => (
        <TextField
          value={editableCity === row.id ? updatedCity.district_name : row.district_name}
          onChange={(e) => handleInputChange(e, 'district_name', setUpdatedCity)}
          InputProps={{
            readOnly: editableCity !== row.id,
          }}
        />
      ),
    },
    {
      field: 'district_code',
      headerName: 'District Code',
      flex: 1,
      sortable: true,
      renderCell: ({ row }) => (
        <TextField
          value={editableCity === row.id ? updatedCity.district_code : row.district_code}
          onChange={(e) => handleInputChange(e, 'district_code', setUpdatedCity)}
          InputProps={{
            readOnly: editableCity !== row.id,
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
          value={editableCity === row.id ? updatedCity.state_id : row.state_id}
          onChange={(e) => handleInputChange(e, 'state_id', setUpdatedCity)}
          InputProps={{
            readOnly: editableCity !== row.id,
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
          <IconButton style={{ color: 'blue' }} onClick={() => handleUpdateCity(row.id)}>
            <EditIcon />
          </IconButton>
          <IconButton style={{ color: 'red' }} onClick={() => handleDeleteCity(row.id)}>
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
    <div className="master-manage-container" id="signup-container">
      <title>EMS : City Manage</title>
      <h1>Cities</h1>

      {/* Add search input */}
      <TextField
        label="Search"
        variant="outlined"
        size="small"
        value={searchText}
        onChange={handleSearch}
        className="search-input"
      />

      {/* Add City button */}
      <Button variant="contained" onClick={() => setAddCityModalOpen(true)}>
        Add City
      </Button>

      {/* Modal for adding a new city */}
      <Modal open={isAddCityModalOpen} onClose={() => setAddCityModalOpen(false)}>
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
          <h2>Add City</h2>
          <div className="input-field">
            <label htmlFor="districtName">District Name:</label>
            <input
              type="text"
              id="districtName"
              name="district_name"
              value={newCity.district_name}
              onChange={(e) => handleInputChange(e, 'district_name', setNewCity)}
            />
          </div>
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
          <Button variant="contained" onClick={handleAddCity}>
            Add City
          </Button>
        </Box>
      </Modal>

      {/* Dialog for editing an existing city */}
      <Dialog open={isEditCityDialogOpen} onClose={() => setEditCityDialogOpen(false)}>
        <DialogTitle>Edit City</DialogTitle>
        <DialogContent>
          <div className="input-field">
            <label htmlFor="editDistrictName">District Name:</label>
            <TextField
              type="text"
              id="editDistrictName"
              name="district_name"
              value={updatedCity.district_name}
              onChange={(e) => handleInputChange(e, 'district_name', setUpdatedCity)}
            />
          </div>
          <div className="input-field">
            <label htmlFor="editDistrictCode">District Code:</label>
            <TextField
              type="text"
              id="editDistrictCode"
              name="district_code"
              value={updatedCity.district_code}
              onChange={(e) => handleInputChange(e, 'district_code', setUpdatedCity)}
            />
          </div>
          <div className="input-field">
            <label htmlFor="editStateId">State ID:</label>
            <TextField
              type="text"
              id="editStateId"
              name="state_id"
              value={updatedCity.state_id}
              onChange={(e) => handleInputChange(e, 'state_id', setUpdatedCity)}
            />
          </div>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={handleSaveUpdatedCity}>
            Save
          </Button>
        </DialogActions>
      </Dialog>

      <div className="data-grid-container">
      {loading ? (
          <LoadingSkeleton />
        ) : (
        <DataGrid
          rows={filteredCities}
          columns={columns}
          pageSize={citiesPerPage}
          rowsPerPageOptions={[25, 50, 100]}
          pagination
          density="compact"
          page={currentPage}
          onPageChange={(params) => handlePageChange(params.page)}
          components={{
            Toolbar: CustomToolbar, // Add the DataGrid toolbar
          }}
        />
        )}
      </div>
    </div>
  );
};

export default ManageCity;