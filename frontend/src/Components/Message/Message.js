// Message.js
import React, { useEffect } from 'react';

const Message = ({ text, color, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000);

    return () => {
      clearTimeout(timer);
    };
  }, [onClose]);

  return (
    <div style={{display:'flex', justifyContent:'center'}}>
    <div style={{ backgroundColor: color, color:'#f4f4f4',textAlign:'center',right:'40px',padding:'0px 20px',position:'absolute',height:'45px',marginTop:'20px',fontSize:'1.6em',borderRadius:'20px'}}>
      {text}
    </div>
    </div>
  );
};

export default Message;
