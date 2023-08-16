import React, { useState } from 'react';
import { TextField, Button, Typography, Box, Link, styled } from '@mui/material';

const CustomButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: 'white',
  '&:hover': {
    backgroundColor: theme.palette.primary.dark,
  },
}));

const CustomTextField = styled(TextField)(({ theme }) => ({
  backgroundColor: 'rgba(255, 255, 255, 0.1)',
  borderRadius: '5px',
  '& label.Mui-focused': {
    color: theme.palette.primary.main,
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: 'rgba(255, 255, 255, 0.3)',
    },
    '&:hover fieldset': {
      borderColor: theme.palette.primary.light,
    },
    '&.Mui-focused fieldset': {
      borderColor: theme.palette.primary.main,
    },
  },
  '& .MuiInputBase-input': {
    color: 'white',
  },
}));

function LoginPage() {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        await fetch(`http://localhost:3000/users?username=${username}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => {
            res.json().then(data => {
                const userData = data[0];
                if (userData && userData.password === password) {
                    localStorage.setItem('user_id', JSON.stringify(userData.id));
                    window.location.href = '/';
                } else {
                    alert('Wrong username or password');
                }
            })
        }).catch(err => {
            console.log(err);
        })
    }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', minHeight: '100vh', backgroundColor: '#151515', color: 'white', padding: '20px' }}>
      <Typography variant="h4" sx={{ marginBottom: 3 }}>Login</Typography>
      <CustomTextField variant="outlined" label="Username or Email" fullWidth sx={{ marginY: 1, width: '80%' }} 
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <CustomTextField variant="outlined" type="password" label="Password" fullWidth sx={{ marginY: 1, width: '80%' }} 
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <CustomButton variant="contained" fullWidth sx={{ marginY: 2, width: '80%' }} onClick={handleSubmit}>Login</CustomButton>
      <Typography variant="body2">Don't have an account? <Link href="/signup" color="primary">Signup</Link></Typography>
    </Box>
  );
}

export default LoginPage;
