import { Typography, Box, Avatar, Button, styled } from '@mui/material';

const CustomButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: 'white',
  '&:hover': {
    backgroundColor: theme.palette.primary.dark,
  },
}));

function ProfilePage() {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', minHeight: '100vh', backgroundColor: '#151515', color: 'white', padding: '20px' }}>
      <Typography variant="h4" sx={{ marginBottom: 3 }}>Profile</Typography>
      <Avatar alt="User Profile" src="https://cdn.vuetifyjs.com/images/lists/1.jpg" sx={{ width: 120, height: 120, marginY: 2 }} />
      <Typography variant="h6" sx={{ marginY: 1 }}>Username: JohnDoe</Typography>
      <Typography variant="body1" sx={{ marginY: 1 }}>Email: johndoe@example.com</Typography>
      <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', '& > *': { margin: 1, width: '150px' } }}>
        <a href='/edit-profile'>
          <CustomButton variant="contained" >Edit Profile</CustomButton>
        </a>
        <a href='/logout'>
          <CustomButton variant="contained">Logout</CustomButton>
        </a>
      </Box>
    </Box>
  );
}

export default ProfilePage;
