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

function SignupPage() {

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async () => {
        console.log(username, email, password);

        await fetch('http://localhost:3000/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ 
                username: username,
                email: email,
                password: password,
             }),
        }).then((response) => {
            if (response.ok) {
                window.location.href = '/login';
                return response.json();
            } else {
                throw new Error('Something went wrong');
            }
        }).catch((error) => {
            console.log(error);
        })
    }

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', minHeight: '100vh', backgroundColor: '#151515', color: 'white', padding: '20px' }}>
            <Typography variant="h4" sx={{ marginBottom: 3 }}>Signup</Typography>
            <CustomTextField variant="outlined" label="Username" fullWidth sx={{ marginY: 1, width: '80%' }} value={username} 
                onChange={(e) => {
                    setUsername(e.target.value);
                }}
            />
            <CustomTextField variant="outlined" label="Email" fullWidth sx={{ marginY: 1, width: '80%' }} value={email}
                onChange={(e) => {
                    setEmail(e.target.value);
                }}
            />
            <CustomTextField variant="outlined" type="password" label="Password" fullWidth sx={{ marginY: 1, width: '80%' }} 
                value={password}
                onChange={(e) => {
                    setPassword(e.target.value);
                }}
            />
            <CustomButton variant="contained" fullWidth sx={{ marginY: 2, width: '80%' }} onClick={handleSubmit}>Signup</CustomButton>
            <Typography variant="body2">Already have an account? <Link href="/login" color="primary">Login</Link></Typography>
        </Box>
    );
}

export default SignupPage;