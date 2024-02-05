import React, { useState } from 'react';
import './Sidebar.css'; // Assuming you have a separate CSS file for styling
import { Link } from 'react-router-dom'; // Assuming you are using React Router for navigation
import logo from './android.png';
// import sidebarData from './sidebarData'; // Import the role-based navigation data



const Sidebar = (props) => {
  const [showSidebar, setShowSidebar] = useState(false);
  // const userRole = props.user.role[0]; // Assuming user role is an array with the first element as the role
  
  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
    showSidebar?document.getElementById('signup-container').classList.remove('opn'):document.getElementById('signup-container').classList.add('opn');
  };

  const renderNavigationLinks = () => {
    if (props?.user?.userAuth) {
      return props?.user?.userAuth.map((item, index) => (
        <>
        {item?.link!=="/create-user"&&item?.auth?.read&&item?.link!=="/update-user"?
          <>
            <li key={item.id}>
              <Link to={item.link} onClick={ toggleSidebar }>{item.label}</Link>
            </li>
            {item.link==='/manage-user' && item?.auth?.create ?
              <li key={1}>
                <Link to='/create-user' onClick={ toggleSidebar }>Create User</Link>
              </li>:<></>
            }
          </>
          :
          <></>
        }
        </>
      ));
    } else {
      return null; // Handle cases where user role is not found in the sidebar data
    }
  };

  return (
    <div>
      <div className={`hamburger ${showSidebar ? 'open' : ''}`} onClick={toggleSidebar}>
        <div className="bar1"></div>
        <div className="bar2"></div>
        <div className="bar3"></div>
      </div>
      <div className={`sidebar ${showSidebar ? 'show' : ''}`}>
        <div className="sidebar-header">
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <img src={logo} alt="Logo" className="logo" />
          </div>
          <h2>EMS</h2>
        </div>
        <ul>
          {renderNavigationLinks()}
        </ul>
      </div>
    </div>
  );
}

export default Sidebar;
