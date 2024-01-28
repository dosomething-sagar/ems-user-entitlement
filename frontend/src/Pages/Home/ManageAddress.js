import React, { useState, useEffect } from 'react';

const AddressList = () => {
  const [addresses, setAddresses] = useState([]);
  const [newAddress, setNewAddress] = useState({});
  const [editingAddress, setEditingAddress] = useState(null);

  useEffect(() => {
    // Fetch addresses on component mount
    fetch('http://localhost:8080/api/address')
      .then(response => response.json())
      .then(data => setAddresses(data))
      .catch(error => console.error('Error fetching addresses:', error));
  }, []);

  const handleCreateAddress = () => {
    // Create a new address
    fetch('http://localhost:8080/api/address', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newAddress),
    })
      .then(response => response.text())
      .then(data => {
        console.log(data);
        // Refresh the address list after creating a new address
        fetch('http://localhost:8080/api/address')
          .then(response => response.json())
          .then(data => setAddresses(data))
          .catch(error => console.error('Error fetching addresses:', error));
      })
      .catch(error => console.error('Error creating address:', error));

    // Reset newAddress after creating
    setNewAddress({});
  };

  const handleEditAddress = (id) => {
    // Set the editingAddress state to the selected address ID
    setEditingAddress(id);
  };

  const handleUpdateAddress = () => {
    // Update an address
    fetch(`http://localhost:8080/api/address/${editingAddress}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newAddress),
    })
      .then(response => response.text())
      .then(data => {
        console.log(data);
        // Refresh the address list after updating an address
        fetch('http://localhost:8080/api/address')
          .then(response => response.json())
          .then(data => setAddresses(data))
          .catch(error => console.error('Error fetching addresses:', error));
      })
      .catch(error => console.error('Error updating address:', error));

    // Reset editingAddress after updating
    setEditingAddress(null);
    // Reset newAddress after updating
    setNewAddress({});
  };

  const handleDeleteAddress = (id) => {
    // Delete an address
    fetch(`http://localhost:8080/api/address/${id}`, {
      method: 'DELETE',
    })
      .then(response => response.text())
      .then(data => {
        console.log(data);
        // Refresh the address list after deleting an address
        fetch('http://localhost:8080/api/address')
          .then(response => response.json())
          .then(data => setAddresses(data))
          .catch(error => console.error('Error fetching addresses:', error));
      })
      .catch(error => console.error('Error deleting address:', error));
  };

  return (
    <div id='signup-container'>
      <h1>Address List</h1>
      <ul>
        {addresses.map(address => (
          <li key={address.address_id}>
            {editingAddress === address.address_id ? (
              <>
                <label>
                  Street:
                  <input type="text" value={newAddress.street || address.street} onChange={(e) => setNewAddress({ ...newAddress, street: e.target.value })} />
                </label>
                <br />
                <label>
                  Postal Code:
                  <input type="text" value={newAddress.postal_code || address.postal_code} onChange={(e) => setNewAddress({ ...newAddress, postal_code: e.target.value })} />
                </label>
                <br />
                <label>
                  Country:
                  <input type="text" value={newAddress.country || address.country} onChange={(e) => setNewAddress({ ...newAddress, country: e.target.value })} />
                </label>
                <br />
                <button onClick={handleUpdateAddress}>Update</button>
              </>
            ) : (
              <>
                {address.street}, {address.postal_code}, {address.country}
                <button onClick={() => handleEditAddress(address.address_id)}>Edit</button>
              </>
            )}
            <button onClick={() => handleDeleteAddress(address.address_id)}>Delete</button>
          </li>
        ))}
      </ul>
      <h2>Create New Address</h2>
      <label>
        Street:
        <input type="text" value={newAddress.street || ''} onChange={(e) => setNewAddress({ ...newAddress, street: e.target.value })} />
      </label>
      <br />
      <label>
        Postal Code:
        <input type="text" value={newAddress.postal_code || ''} onChange={(e) => setNewAddress({ ...newAddress, postal_code: e.target.value })} />
      </label>
      <br />
      <label>
        Country:
        <input type="text" value={newAddress.country || ''} onChange={(e) => setNewAddress({ ...newAddress, country: e.target.value })} />
      </label>
      <br />
      <button onClick={handleCreateAddress}>Create Address</button>
    </div>
  );
};

export default AddressList;
