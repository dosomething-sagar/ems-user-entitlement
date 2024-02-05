import React from 'react';

const PermissionManagerPopup = ({ onClose, userAuth, permissionManagerStyle,permissions,setPermissions }) => {

  const handleCheckboxChange = (index, permission) => {
    setPermissions(prevPermissions => {
      const updatedPermissions = [...prevPermissions];
      updatedPermissions[index].auth[permission] = !updatedPermissions[index].auth[permission];
      return updatedPermissions;
    });
  };

  const handleApply = () => {
    // Here you can send the permissions object to your backend to update the user_role table
    console.log('Permissions:', permissions);
    onClose();
  };

  return (
      <div className="popup" style={permissionManagerStyle['.popup']}>
        <div className="popup-header">
          <h2>Permission Manager</h2>
        </div>
        <div style={permissionManagerStyle.permissionContainer}>
          {permissions.map((item, index) => (
            item.label !== "Update User" && item.label !== "Create User" && (
            <div key={index} style={permissionManagerStyle.permissionItem}>
              <label style={permissionManagerStyle.permissionLabel}>{item.label}</label>
              <div style={permissionManagerStyle.permissionCheckboxes}>
                {["create", "read", "delete","update"].map(permission => (
                  <div key={permission} style={permissionManagerStyle.permissionCheckbox}>
                    
                      <>
                        <input
                          type="checkbox"
                          id={`${item.label}-${permission}`}
                          checked={item.auth[permission]}
                          onChange={() => handleCheckboxChange(index, permission)}
                        />
                        <label htmlFor={`${item.label}-${permission}`}>{permission}</label>
                      </>
                    
                  </div>
                ))}
              </div>
            </div>
            )
          ))}
        </div>
        <div style={{display:'flex',justifyContent:'center'}}>
        <button style={{ backgroundColor: '#1976D2', border: 'none', color: 'white', padding: '5px 10px', borderRadius: '10px' }} onClick={handleApply}>Apply</button>
        <button
            style={{ backgroundColor: '#E53935', border: 'none', color: 'white', padding: '5px 10px', borderRadius: '10px' }}
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </div>
  );
};

export default PermissionManagerPopup;