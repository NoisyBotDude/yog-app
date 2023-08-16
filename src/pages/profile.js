import { Container, Typography, Card, CardContent, Box, Avatar, Button, styled } from '@mui/material';

const CustomButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: 'white',
  '&:hover': {
    backgroundColor: theme.palette.primary.dark,
  },
}));

function ProfilePage(props) {

  const user = props.user
  return (
    <>
      {!props.loading &&
          <Container style={{ backgroundColor: "#1E1E1E", minHeight: '100vh', padding: '2em' }}>
          <Typography variant="h4" style={{ color: "#FFFFFF", marginBottom: '20px' }}>
              Profile
          </Typography>

          <Card style={{ backgroundColor: '#292929', marginBottom: '20px' }}>
              <CardContent>
                  <Typography variant="h6" style={{ color: "#FFFFFF", marginBottom: '15px' }}>
                      Basic Information
                  </Typography>
                  <Typography style={{ color: "#FFFFFF" }}>Name: {user.name}</Typography>
                  <Typography style={{ color: "#FFFFFF" }}>Age: {user.age}</Typography>
                  <Typography style={{ color: "#FFFFFF" }}>Height: {user.height} cm</Typography>
                  <Typography style={{ color: "#FFFFFF" }}>Weight: {user.weight} kg</Typography>
                  <Typography style={{ color: "#FFFFFF" }}>Username: {user.username}</Typography>
                  <Typography style={{ color: "#FFFFFF" }}>Email: {user.email}</Typography>
                  <Typography style={{ color: "#FFFFFF" }}>Nationality: {user.nationality}</Typography>
                  <Typography style={{ color: "#FFFFFF" }}>Regionality: {user.regionality}</Typography>
              </CardContent>
          </Card>

          <Card style={{ backgroundColor: '#292929', marginBottom: '20px' }}>
              <CardContent>
                  <Typography variant="h6" style={{ color: "#FFFFFF", marginBottom: '15px' }}>
                      Diet Preferences
                  </Typography>
                  <Typography style={{ color: "#FFFFFF" }}>Vegetarian: {user.diet_preferences?.vegetarian ? "Yes" : "No"}</Typography>
                  <Typography style={{ color: "#FFFFFF" }}>Diabetes: {user.diet_preferences?.diabetes ? "Yes" : "No"}</Typography>
                  <Typography style={{ color: "#FFFFFF" }}>Medication: {user.diet_preferences?.medication ? "Yes" : "No"}</Typography>
                  <Typography style={{ color: "#FFFFFF" }}>Available Groceries: {user.diet_preferences?.grocery_available.join(', ')}</Typography>
              </CardContent>
          </Card>

          <Card style={{ backgroundColor: '#292929', marginBottom: '20px' }}>
              <CardContent>
                  <Typography variant="h6" style={{ color: "#FFFFFF", marginBottom: '15px' }}>
                      Daily Prescribed Calories
                  </Typography>
                  <Typography style={{ color: "#FFFFFF" }}>{user.calories_per_day_prescribed} kcal/day</Typography>
              </CardContent>
          </Card>

          {/* Button for edit profile and logout */}
          <Box sx={{ display: 'flex', justifyContent: 'center', }}>
            <a href='/edit-profile'>
              <CustomButton variant="contained">
                  Edit Profile
              </CustomButton>
            </a>
            <a href='/logout'>
              <CustomButton variant="contained">
                  Logout
              </CustomButton>
            </a>
          </Box>

      </Container>
      }
    </>
  );
}

export default ProfilePage;
