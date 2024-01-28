import React, {  useState } from 'react';
import './App.css';
import Login from './Pages/Login/Login';
import { Routes, Route, Navigate} from 'react-router-dom';
import NotFound from './Components/NotFound/NotFound';
import Loader from './Components/Loading/Loader';
import Message from './Components/Message/Message';
import Sidebar from './Components/Sidebar/Sidebar';
import ProfileBar from './Components/Navbar/Navbar';
// import sidebarData from './sidebarData'; // Import the role-based navigation data

const App=()=> {
    
const [isAuthTrue, setIsAuthTrue] = useState(false);
const [token, setToken] = useState('');
const [user, setUser] = useState({});
const [isLoading, setIsLoading] = useState(true);
const [message, setMessage] = useState(null); 
const [r,setR]=useState(0);

const fetchDetails= () => {
  // Check if the user is already authenticated on component mount
  const storedToken = localStorage.getItem('token');

  const storedUser = JSON.parse(localStorage.getItem('user'));
  if (storedToken && storedUser) {
    setIsAuthTrue(true);
    setToken(storedToken);
    setUser(storedUser);
    setIsLoading(false);
  }else{
    setToken('null')
    setIsLoading(false);
  }
};

if(token===''){
  fetchDetails();
} 

const handleLogout = () => {
  // Clear the authentication state and user information on logout
  setIsAuthTrue(false);
  setToken('');
  setUser({});
  localStorage.removeItem('token');
  localStorage.removeItem('user');
};

const showMessage = (text, color) => {
  setMessage({ text, color });
};

const closeMessage = () => {
  setMessage(null);
};


  const renderRoutes = () => {
    if (isLoading) {
      return <Loader />;
    } else if (isAuthTrue && token !== 'null' && user.role !== undefined) {
      const userRole = user.role[0]; // Assuming user role is an array with the first element as the role

      if (sidebarData[userRole]) {
        const userRoutes = sidebarData[userRole];

        return (
          <div style={{ display: 'flex' }}>
            <Sidebar handleLogout={handleLogout} user={user} />
            <div style={{ width: '100%' }}>
              <ProfileBar user={user} />
              <Routes>
                {userRoutes.map((item, index) => (
                  <Route
                    key={index}
                    path={item.link}
                    element={<item.component {...item.props} />}
                  />
                ))}
                <Route path='*' element={<NotFound />} />
              </Routes>
            </div>
          </div>
        );
      } else {
        // Handle unauthorized access
        return <Navigate to="/login" replace />;
      }
    } else {
      return (
        <div>
          {message && <Message text={message.text} color={message.color} onClose={closeMessage} />}
          <Routes>
            <Route path='/login' element={<Login setIsAuthTrue={setIsAuthTrue} setToken={setToken} setUser={setUser} user={user} closeMessage={closeMessage} showMessage={showMessage} />} />
            <Route path='*' element={<Navigate to="/login" replace />} />
          </Routes>
        </div>
      );
    }
  };

  return (
    <div>
      {renderRoutes()}
    </div>
  );
}

export default App;
