import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';

import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import EditProfile from './components/EditProfile';

import LoginPage from './pages/login';
import SignupPage from './pages/signup';
import ProfilePage from './pages/profile';

import { createTheme, ThemeProvider } from '@mui/material';
import { Menu } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
  createRoutesFromElements
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

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const router = createBrowserRouter(
    [
      {
        path: "/",
        element: <Dashboard />,
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
        element: <ProfilePage />,
        children: [
          {
            path: "edit",
            element: <EditProfile />,
          }
        ]
      },
    ]
  )

  return (
    <ThemeProvider theme={theme}>
      <div className="App" style={{ backgroundColor: "#151515"}}>
        <IconButton onClick={() => setSidebarOpen(!sidebarOpen)}>
          <Menu />
        </IconButton>
        <Sidebar open={sidebarOpen} toggleDrawer={() => setSidebarOpen(!sidebarOpen)} />
        <RouterProvider router={router} />
      </div>
    </ThemeProvider>
  );
}

export default App;
