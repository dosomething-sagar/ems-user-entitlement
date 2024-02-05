import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { IconButton, TextField, Button, Dialog, DialogTitle, DialogContent, DialogActions, Box, Skeleton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Toolbar } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const UserManage = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(50);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [isEditUserDialogOpen, setEditUserDialogOpen] = useState(false);

  useEffect(() => {
    fetchUsers(1);
  }, [searchTerm]);

  const fetchUsers = async (page) => {
    try {
      setLoading(true);
      const response = await axios.get(`http://localhost:8080/api/user?page=${page}&pageSize=${usersPerPage}`);
      const usersWithIds = response.data.map((user, index) => ({
        ...user,
        id: index + 1,
      }));
      setUsers(usersWithIds);
      setTotalPages(Math.ceil(response.headers['x-total-count'] / usersPerPage));
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (user) => {
    setSelectedUser(user);
    navigate(`/update-user?userid=${user.user_id}`);
  };

  const handleInputChange = (e, key) => {
    const { value } = e.target;
    setSelectedUser((prevUser) => ({ ...prevUser, [key]: value }));
  };

  const handleSaveUpdatedUser = async () => {
    try {
      const userId = selectedUser.user_id;

      if (!userId || isNaN(userId)) {
        console.error('Invalid userId:', userId);
        return;
      }

      if (!selectedUser.firstname || !selectedUser.lastname || !selectedUser.contact || !selectedUser.userRole) {
        console.error('Invalid input fields:', selectedUser);
        return;
      }

      await axios.put(`http://localhost:8080/api/user/${userId}`, selectedUser);
      fetchUsers(1);
      setEditUserDialogOpen(false);
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  const handleDeleteUser = async (userId) => {
    try {
      await axios.delete(`http://localhost:8080/api/user/${userId}`);
      fetchUsers(1);
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    if (newPage > currentPage && newPage < totalPages && !loading) {
      fetchUsers(newPage + 1);
    }
  };

  const columns = [
    { field: 'user_id', headerName: 'User ID', flex: 1, sortable: true, maxWidth: 70 },
    {
      field: 'name',
      headerName: 'Name',
      flex: 1,
      sortable: true,
      renderCell: ({ row }) => (
        <TextField
          value={`${row.firstname} ${row.lastname}`}
          onChange={(e) => handleInputChange(e)}
          InputProps={{
            readOnly: false,
          }}
        />
      ),
    },
    {
      field: 'contact',
      headerName: 'Contact',
      flex: 1,
      sortable: true,
      renderCell: ({ row }) => (
        <TextField
          value={row.contact}
          onChange={(e) => handleInputChange(e)}
          InputProps={{
            readOnly: false,
          }}
        />
      ),
    },
    {
      field: 'userRole',
      headerName: 'User Role',
      flex: 1,
      sortable: true,
      renderCell: ({ row }) => (
        <TextField
          value={row.userRole}
          onChange={(e) => handleInputChange(e, 'userRole')}
          InputProps={{
            readOnly: false,
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
          <IconButton style={{ color: 'blue' }} onClick={() => handleEdit(row)}>
            <EditIcon />
          </IconButton>
          <IconButton style={{ color: 'red' }} onClick={() => handleDeleteUser(row.user_id)}>
            <DeleteIcon />
          </IconButton>
        </>
      ),
    },
  ];

  const CustomToolbar = () => {
    return (
      <Toolbar sx={{ marginBottom: '-10px' }}>
        <GridToolbar />
      </Toolbar>
    );
  };

  const LoadingSkeleton = () => (
    <Box p={2} mb={2} boxShadow={1}>
      <Skeleton animation="wave" height={50} />
      <Skeleton animation="wave" height={50} />
      <Skeleton animation="wave" height={50} />
    </Box>
  );

  return (
    <div className="master-manage-container" id="signup-container">
      <title>EMS : Admin User Manage</title>
      <h1>User Management</h1>

 {/* Add search input */}
 <TextField
        label="Search"
        variant="outlined"
        size="small"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-input"
      />
      
      {/* Dialog for editing an existing user */}
      <Dialog open={isEditUserDialogOpen} onClose={() => setEditUserDialogOpen(false)}>
        <DialogTitle>Edit User</DialogTitle>
        <DialogContent>
          <div className="input-field">
            <label htmlFor="editFirstName">First Name:</label>
            <TextField
              type="text"
              id="editFirstName"
              name="firstname"
              value={selectedUser ? selectedUser.firstname : ''}
              onChange={(e) => handleInputChange(e, 'firstname')}
            />
          </div>
          <div className="input-field">
            <label htmlFor="editLastName">Last Name:</label>
            <TextField
              type="text"
              id="editLastName"
              name="lastname"
              value={selectedUser ? selectedUser.lastname : ''}
              onChange={(e) => handleInputChange(e, 'lastname')}
            />
          </div>
          <div className="input-field">
            <label htmlFor="editContact">Contact:</label>
            <TextField
              type="text"
              id="editContact"
              name="contact"
              value={selectedUser ? selectedUser.contact : ''}
              onChange={(e) => handleInputChange(e, 'contact')}
            />
          </div>
          <div className="input-field">
            <label htmlFor="editUserRole">User Role:</label>
            <TextField
              type="text"
              id="editUserRole"
              name="userRole"
              value={selectedUser ? selectedUser.userRole : ''}
              onChange={(e) => handleInputChange(e, 'userRole')}
            />
          </div>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={handleSaveUpdatedUser}>
            Save
          </Button>
        </DialogActions>
      </Dialog>

      <div className="data-grid-container">
      {loading ? (
          <LoadingSkeleton />
        ) : (
        <DataGrid
          rows={users}
          columns={columns}
          pageSize={usersPerPage}
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

export default UserManage;
