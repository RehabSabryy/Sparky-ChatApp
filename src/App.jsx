import { useState } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './Component/Home/Home';
import Signup from './Component/Signup/Signup';
import Login from './Component/Login/Login';
import Cookies from 'universal-cookie'
import All from './Component/All/All';
import Layout from './Component/Layout/Layout';
import Profile from './Component/Profile/Profile';
import Settings from './Component/Settings/Settings';
import Channel from './Component/AllChannel/Channel';
import ChannelDetails from './Component/AllChannel/ChannelDetails';
import Rooms from './Component/Rooms/Rooms';
import NotFound from './Component/NotFound/NotFound';
const router = createBrowserRouter([
  {index: true, element: <Home/>},
  {path: "/signup", element: <Signup/>},
  {path:'/login', element: <Login/>},
  {path:'/layout', element: <Layout/> , children:[
    {path: "all", element: <All/>},
    {path: "profile", element: <Profile/>},
    {path: "settings", element: <Settings/>},
    {path: "channels", element: <Channel/>},
    {path: "channels/:channel", element: <ChannelDetails/>},
    {path: "rooms", element: <Rooms/>},
  ]},
  {path:'*', element: <NotFound/>}
]);
function App() {
    const cookies = new Cookies();
    const [isAuth, setIsAuth] = useState(cookies.get("auth-token"));
    if(!isAuth){
  return (
    <div className='container-fluid d-flex flex-column flex-wrap  m-0 p-0'>
      <RouterProvider router={router}/>
    </div>
  );
}

  return (
    <div className='container-fluid d-flex flex-column flex-wrap m-0 p-0'>
        <RouterProvider router={router}/>
    </div>
  );
}

export default App;


