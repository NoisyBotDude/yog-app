import React from 'react';
import { Card, CardContent, Typography, Button, Grid, Avatar, styled, useTheme, Box } from '@mui/material';

const StyledCard = styled(Card)(({ theme }) => ({
  backgroundColor: '#2a2a2a',
  color: 'white',
  transition: 'transform 0.2s',
  margin: theme.spacing(2),
  '&:hover': {
    transform: 'scale(1.05)',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.25)',
  },
}));

const CustomButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: 'white',
  margin: theme.spacing(1),
  '&:hover': {
    backgroundColor: theme.palette.primary.dark,
  },
}));

const Dashboard = (props) => {
  const theme = useTheme();

  const user = props.user

  return (
    <Box sx={{ padding: '20px 50px', backgroundColor: '#151515', minHeight: '100vh', color: 'white' }}>
      {/* Welcome Section */}
      <Box sx={{ display: 'flex', backgroundColor: '#151515', alignItems: 'center', '& > *': { margin: 2 } }}>
        <Avatar alt="User Profile" src="https://cdn.vuetifyjs.com/images/lists/1.jpg" />
        <Typography variant="h4">Welcome back, {user.username}</Typography>
      </Box>

      <Grid container spacing={4}>
        {/* Nutrition Summary */}
        <Grid item xs={12} sm={6} md={4}>
          <StyledCard>
            <CardContent>
              <Typography variant="h6">Nutrition Summary</Typography>
              <Typography>Your daily calorie intake should be {user.calories_per_day_prescribed ? user.calories_per_day_prescribed : 0} kcal.</Typography>
            </CardContent>
          </StyledCard>
        </Grid>

        {/* Mental Health */}
        <Grid item xs={12} sm={6} md={4}>
          <StyledCard>
            <CardContent>
              <Typography variant="h6">Mental Health</Typography>
              <Typography>Your last session with AI was productive.</Typography>
            </CardContent>
          </StyledCard>
        </Grid>

        {/* Fitness Summary */}
        <Grid item xs={12} sm={6} md={4}>
          <StyledCard>
            <CardContent>
              <Typography variant="h6">Fitness Summary</Typography>
              <Typography>You've completed 5 sessions this week.</Typography>
            </CardContent>
          </StyledCard>
        </Grid>

        {/* Quick Actions */}
        <Grid item xs={12}>
          <Box sx={{ display: 'flex', justifyContent: 'center', '& > *': { margin: 1 } }}>
            <CustomButton variant="contained">Start Fitness Session</CustomButton>
            <CustomButton variant="contained">Go Distraction-Free</CustomButton>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
