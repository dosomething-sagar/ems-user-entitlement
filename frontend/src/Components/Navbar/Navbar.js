import React, { useState, useEffect, useRef } from 'react';
import './Navbar.css'; // Assuming you have a separate CSS file for styling
import profileImage from './profile.jpg'; // Replace with the actual path to the profile image

const ProfileBar = (props) => {
  const [showNotification, setShowNotification] = useState(false);
  const [showEvent, setShowEvent] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const profileRef = useRef(null);

  const toggleNotification = () => {
    setShowNotification(!showNotification);
    setShowEvent(false);
    setShowProfile(false);
  };

  const toggleEvent = () => {
    setShowEvent(!showEvent);
    setShowNotification(false);
    setShowProfile(false);
  };

  const toggleProfile = () => {
    setShowProfile(!showProfile);
    setShowNotification(false);
    setShowEvent(false);
  };

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setShowNotification(false);
        setShowEvent(false);
        setShowProfile(false);
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, []);

  return (
    <div className="profile-bar" ref={profileRef}>
      <button onClick={toggleNotification}>
        <img className='notification-image' width="25px" height="25px" src="https://img.icons8.com/ios-filled/50/000000/appointment-reminders--v1.png" alt="appointment-reminders--v1"/>
      </button>
      <button onClick={toggleEvent}>
        <img className='event-image' width="25px" height="25px" src="https://img.icons8.com/ios-filled/50/000000/commercial.png" alt="commercial"/>
      </button>
      <button onClick={toggleProfile}>
        <img className='profile-image' src={profileImage} alt="Profile" />
      </button>
      {showNotification &&
       <div className="notification-window">Notification details</div>
      }
      {showEvent &&
       <div className="event-window">Event details</div>
      }
      {showProfile &&
        <div className="profile-window">
          <h6>Profile details</h6>
          <img style={{width:'80px', height:'80px'}} className='profile-image' src={profileImage} alt="Profile" />
          <h3 style={{color:'#333'}}>{props.user.firstname+" "+props.user.lastname}</h3>
          <h5 style={{color:'#767676'}}>{props.user.role[0]} </h5>
          <h6 style={{color:'#767676'}}>(@{props.user.username})</h6>
          <h6 style={{color:'#333',fontSize:'18px'}}>{props.user.email}</h6>
          <h5 style={{color:'#333'}}>Contact : {props.user.contact}</h5>
          <button style={{padding:'5px 15px',border:'1px solid #fff', borderRadius:'5px',backgroundColor:'#1976D2',color:'white'}} onClick={props.handleLogout}>Logout</button>
        </div>
      }
    </div>
  );
};

export default ProfileBar;
