import React, {  useState } from 'react';
import './App.css';
import Login from './Pages/Login/Login';
import { Routes, Route, Navigate} from 'react-router-dom';
import NotFound from './Components/NotFound/NotFound';
import Loader from './Components/Loading/Loader';
import Message from './Components/Message/Message';
import Sidebar from './Components/Sidebar/Sidebar';
import ProfileBar from './Components/Navbar/Navbar';
// import sidebarData from './Components/Sidebar/sidebarData';
import Home from './Pages/Home/Home';
import CreateUser from './Pages/CreateUser/CreateAdmin';
import StateManagement from './Pages/MasterTable/ManageState/StateManagement';
import ManageCity from './Pages/MasterTable/ManageCity/ManageCity';
import AssemblyManagement from './Pages/MasterTable/ManageAssembly/AssemblyMange';
import ParliamentManagement from './Pages/MasterTable/ManageParliament/ParliamentManagement';
import UserManage from './Pages/MasterTable/ManageUser/ManageUser';
import UpdateUser from './Pages/CreateUser/UpdateUser';

function App() {
  const [isAuthTrue, setIsAuthTrue] = useState(false);
  const [token, setToken] = useState('');
  const [user, setUser] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [message, setMessage] = useState(null); 
  // const [r,setR]=useState(0);

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

  const componentsMap = {
    "/": Home,
    "/create-user": CreateUser,
    "/manage-city": ManageCity,
    "/manage-state": StateManagement,
    "/manage-assembly":AssemblyManagement,
    "/manage-parliament":ParliamentManagement,
    "/manage-user": UserManage,
    "/update-user":UpdateUser
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


  if (isLoading) {
    return <Loader />; // Show the loader while loading
  }else if (isAuthTrue && token !== 'null' && user.role!==undefined) {
      localStorage.setItem('user', JSON.stringify(user));
        console.log(token,isAuthTrue);
        console.log(user);

        return(
          <div style={{display:'flex',backgroundColor:'#f4f4f4'}}>
            {message && <Message text={message.text} color={message.color} onClose={closeMessage} />}
            <Sidebar user={user}/>
            <div style={{width:'100%'}}>
            <ProfileBar handleLogout={handleLogout} user={user}/>
            <Routes>
              {
                user?.userAuth?.map((item, index) => {
                  const Component = componentsMap[item?.link]; // Get the component based on user's permission
                  if (Component) {
                    if(item?.auth?.read){
                      return(
                        <>
                        <Route
                          key={index}
                          path={item.link}
                          element={<Component r={0} token={token} user={user} handleLogout={handleLogout} />}
                        />
                        {item.link==='/manage-user' && item?.auth?.create ?
                          <Route
                          key={1}
                          path={'/create-user'}
                          element={<CreateUser r={0} token={token} user={user} handleLogout={handleLogout} />}
                          />:<></>
                        }
                        {item.link==='/manage-user' && item?.auth?.update ?
                          <Route
                          key={9}
                          path={'/update-user'}
                          element={<UpdateUser r={0} token={token} user={user} handleLogout={handleLogout} />}
                        />:<></>
                        }
                        </>
                      )
                    }
                  }else{
                    return(
                      <></>
                    )
                  }
                })
                // sidebarData[user?.role[0]].map((item, index) => {
                //   return (
                //     <Route
                //       key={index}
                //       path={item?.link}
                //       auth={item?.auth}
                //       element={<item.component  r={0} token={token} user={user} handleLogout={handleLogout} />}
                //     />
                //   );
                // })
              }
              <Route path='*' element={<NotFound></NotFound>}></Route>
            </Routes>
            </div>
          </div>
        )
      }else {
        return (
          <div>
            {message && <Message text={message.text} color={message.color} onClose={closeMessage} />}
            <Routes>
              <Route path='/login' element={<Login setIsAuthTrue={setIsAuthTrue} setToken={setToken} setUser={setUser} user={user} closeMessage={closeMessage} showMessage={showMessage}></Login>}></Route>
              <Route path='*' element={<Navigate to="/login" replace />}></Route>
            </Routes>
          </div>
        );
      }
}

export default App;
