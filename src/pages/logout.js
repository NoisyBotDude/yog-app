import { Typography, Box, Avatar, Button, styled } from '@mui/material';
import { useEffect } from 'react';

function LogoutPage () {

    useEffect(() => {
        const handleLogout = () => {
            localStorage.removeItem('user_id');
            window.location.href = '/login';
        }
        setInterval(() => {
            handleLogout();
        }, 5000)
    }, [])


    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', minHeight: '100vh', backgroundColor: '#151515', color: 'white', padding: '20px' }}>
            <Typography variant="h4" sx={{ marginBottom: '20px' }}>You have been logged out</Typography>
        </Box>
    )
}

export default LogoutPage;