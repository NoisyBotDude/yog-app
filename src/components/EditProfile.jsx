import { TextField, Button, Typography, Box, Avatar, styled } from '@mui/material';

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

function EditProfile(props) {
  const user = props.user
  console.log(user)
  return (
    <>
      {!props.loading && 
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', minHeight: '100vh', backgroundColor: '#151515', color: 'white', padding: '20px' }}>
          <Typography variant="h4" sx={{ marginBottom: 3 }}>Edit Profile</Typography>
          <Avatar alt="User Profile" src="https://cdn.vuetifyjs.com/images/lists/1.jpg" sx={{ width: 120, height: 120, marginY: 2 }} />
          <CustomTextField variant="outlined" label="Username" fullWidth sx={{ marginY: 1, width: '80%' }} defaultValue={user.username} disabled/>
          <CustomTextField variant="outlined" label="Email" fullWidth sx={{ marginY: 1, width: '80%' }} defaultValue={user.email} />
          <CustomTextField variant="outlined" type="password" label="Change Password" fullWidth sx={{ marginY: 1, width: '80%' }} />
          <CustomTextField variant="outlined" type="password" label="Confirm New Password" fullWidth sx={{ marginY: 1, width: '80%' }} />
          <CustomButton variant="contained" fullWidth sx={{ marginY: 2, width: '80%' }}>Update Profile</CustomButton>
        </Box>
      }
    </>
  );
}

export default EditProfile;