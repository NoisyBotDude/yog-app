import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';

import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import EditProfile from './components/EditProfile';

import LoginPage from './pages/login';
import SignupPage from './pages/signup';
import ProfilePage from './pages/profile';
import HomePage from './pages/home';
import LogoutPage from './pages/logout';
import MindfulnessPage from './pages/mindfulness';
import Yoga from './pages/Yoga/Yoga';

import { createTheme, ThemeProvider } from '@mui/material';
import { Menu } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
  createRoutesFromElements,
  useLocation
} from "react-router-dom";

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#6f0dff',
    },
  },
});

function App() {


  const [isAuthPage, setIsAuthPage] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (window.location.pathname === '/login' || window.location.pathname === '/signup') {
      setIsAuthPage(true);
    } else {
      setIsAuthPage(false);
    }
    const fetchUserData = async () => {
      const response = await fetch(`http://localhost:3000/users/${localStorage.getItem('user_id')}`);
      const data = await response.json();
      setUser(data);
      setLoading(false);
    }
  
    fetchUserData();
  }, [])

  const router = createBrowserRouter(
    [
      {
        path: "/",
        element: <HomePage user={user} loading={loading}/>,
      },
      {
        path: "/login",
        element: <LoginPage />,
      },
      {
        path: "/signup",
        element: <SignupPage />,
      },
      {
        path: "/profile",
        element: <ProfilePage user={user} loading={loading}/>,
      },
      {
        path: "/edit-profile",
        element: <EditProfile user={user} loading={loading}/>,
      },
      {
        path: "/logout",
        element: <LogoutPage />,
      },
      {
        path: "/mindfulness",
        element: <MindfulnessPage user={user}/>,
      },
      {
        path: "/yoga",
        element: <Yoga user={user}/>,
      }
    ]
  )

  return (
    <ThemeProvider theme={theme}>
      <div className="App" style={{ backgroundColor: "#151515"}}>
        {!isAuthPage && (
          <>
          <IconButton onClick={() => setSidebarOpen(!sidebarOpen)}>
            <Menu />
          </IconButton>
            <Sidebar open={sidebarOpen} toggleDrawer={() => setSidebarOpen(!sidebarOpen)} />
          </>
        )
        }
        <RouterProvider router={router} />
      </div>
    </ThemeProvider>
  );
}

export default App;
