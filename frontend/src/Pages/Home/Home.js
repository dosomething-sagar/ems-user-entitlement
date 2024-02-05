
import './Home.css';
import React from 'react';
import Message from '../../Components/Message/Message';
function Home(props) {
    const role=props?.user?.role[props?.r]?.role_type_name;
    return (
      <>
      <title>{role} Dashboard</title>
      {props.message && <Message text={props.message.text} color={props.message.color} onClose={props.closeMessage} />}
      <div className='home' id='signup-container'>
        <h1 className='heading'>Welcome to {role} dashboard</h1>
        <div className="container text-center">
          <div className="row align-items-start">
          </div>
        </div>
      </div>
      </>
    )
  }

export default Home