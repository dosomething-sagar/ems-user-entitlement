import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import PermissionManagerPopup from './PermissionManagerPopup';

const PermissionManager = (props) => {
  const [userAuth, setUserAuth] = useState([]);
  const [showPopup, setShowPopup] = useState(true);

  // Create a ref for the PermissionManager container
  const permissionManagerRef = useRef(null);

  const generateCheckboxes = (roleType) => {
    if(props.page==='create'){
      axios.get(`http://localhost:8080/api/user/rolename/${roleType}`).then((data) => {
      const roleName = data.data.roleName.role_type_name;
      const userperms = JSON.parse(data.data.roleName.user_perms);
      if (roleName === props.user.role[0].role_type_name) {
        setUserAuth(props.user.userAuth);
        props.setPermissions(props.user.userAuth);
      } else {
        setUserAuth(userperms);
        props.setPermissions(userperms);
      }
    }).catch((err) => {
      console.log(err);
    })}else if (props.page === 'update') {
      axios.get(`http://localhost:8080/api/user/rolename/${roleType}`)
        .then((data) => {
          const roleName = data.data.roleName.role_type_name;
          const userperms = JSON.parse(data.data.roleName.user_perms);
    
          // Check if the role being modified is the same as the logged-in admin's role
          if (roleType === props.role_id) {
            // Set the userAuth and permissions to the logged-in admin's permissions
            setUserAuth(props.user.userAuth);
            props.setPermissions(props.user.userAuth);
          } else {
            // Check if the role being modified has the same permissions as before
            const permissionsChanged = JSON.stringify(props.user.userAuth) !== JSON.stringify(userperms);
    
            // Set permissions based on whether they have changed or not
            props.setPermissions(permissionsChanged ? userperms : props.user.userAuth);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
    
  };

  useEffect(() => {
    generateCheckboxes(props.roleType);

    // Add event listener to detect clicks outside the PermissionManager container
    const handleClickOutside = (event) => {
      if (permissionManagerRef.current && !permissionManagerRef.current.contains(event.target)) {
        document.getElementById('permission_popup_container').style.width = '0%';
        setShowPopup(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    // Cleanup the event listener on component unmount
    return () => {
    document.removeEventListener('mousedown', handleClickOutside);
      
    };
  }, [props.roleType]);

  const permissionManagerStyle = {
    permissionContainer: {
      display: 'flex',
      flexWrap: 'wrap',
      alignItems: 'flex-start',
      padding: '20px',
      border: '1px solid #e0e0e0',
      borderRadius: '5px',
      backgroundColor: '#f9f9f9',
    },
    permissionItem: {
      marginBottom: '15px',
      marginLeft: '30px',
    },
    permissionLabel: {
      fontWeight: 'bold',
      marginBottom: '10px',
      color: 'black',
    },
    permissionCheckboxes: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    permissionCheckbox: {
      marginRight: '15px',
      marginBottom: '10px',
    },
    remove:{
      width:'0%',
      height:'0%',
    },
    popupContainer: {
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      background: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 999,
    },
    popup: {
      background: '#fff',
      padding: '20px',
      borderRadius: '5px',
      boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)',
      width: '90vw',
      zIndex: 1000,
      maxHeight: '80vh',
      overflowY: 'auto', // Enable vertical scrolling
    },
  };

  const closePopup = () => {
    setShowPopup(false);
    document.getElementById('permission_popup_container').style.width = '0%';
  };

  return (
    <div id='permission_popup_container' style={permissionManagerStyle.popupContainer}>
      {showPopup && (
        <div ref={permissionManagerRef} style={permissionManagerStyle.popup}>
          <PermissionManagerPopup
            onClose={closePopup}
            userAuth={userAuth}
            permissionManagerStyle={permissionManagerStyle}
            permissions={props.permissions}
            setPermissions={props.setPermissions}
          />
        </div>
      )}
    </div>
  );
};

export default PermissionManager;



