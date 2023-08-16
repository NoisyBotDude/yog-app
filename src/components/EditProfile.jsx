import React, { useEffect, useState } from 'react';
import { Container, FormControlLabel, Checkbox, FormControl,InputLabel, Select, MenuItem, Card, CardContent, TextField, Button, Typography, Box, Avatar, styled } from '@mui/material';

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

  const [userData, setUserData] = useState({
    name: '',
    height: '',
    weight: '',
    age: '',
    username: '',
    email: '',
    diet_preferences: {
      vegetarian: false,
      diabetes: false,
      medication: false,
      grocery_available: []
    },
  })

  useEffect(() => {
    fetch(`http://localhost:3000/users/${localStorage.getItem("user_id")}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((r) => {
      if (r.ok) {
        r.json().then((userData) => {
          setUserData(userData);
        });
      }
    })
  }, [])

  const handleInputChange = (e, nestedKey = null) => {
    let { name, value } = e.target;
    if (value === 'on') {
      value = e.target.checked;
      console.log(name, value);
    } else if (value === 'off') {
      value = !e.target.checked;
      console.log(name, value);
    }
    if (nestedKey) {
      setUserData(prevData => ({
        ...prevData,
        [nestedKey]: {
          ...prevData[nestedKey],
          [name]: value
        }
      }));
    } else {
      setUserData(prevData => ({ ...prevData, [name]: value }));
    }
  };

  const handleSave = () => {
    console.log('Saving userData data:', userData);
    fetch(`http://localhost:3000/users/${localStorage.getItem("user_id")}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(
        userData
      ),
    })
  };

  return (
    <>
      {!props.loading &&
          <Container style={{ backgroundColor: "#1E1E1E", minHeight: '100vh', padding: '2em' }}>
          <Typography variant="h4" style={{ color: "#FFFFFF", marginBottom: '20px' }}>
              Edit Profile
          </Typography>

          <Card style={{ backgroundColor: '#292929', marginBottom: '20px', padding: '15px' }}>
              <CardContent>
                  <Typography variant="h6" style={{ color: "#FFFFFF", marginBottom: '15px' }}>
                      Basic Information
                  </Typography>
                  <TextField fullWidth margin="normal" name="name" label="Name" variant="outlined" value={userData.name} onChange={handleInputChange} InputLabelProps={{ style: { color: '#FFF' } }} inputProps={{ style: { color: '#FFF' } }} />
                  <TextField fullWidth margin="normal" name="height" label="Height" variant="outlined" value={userData.height} onChange={handleInputChange} InputLabelProps={{ style: { color: '#FFF' } }} inputProps={{ style: { color: '#FFF' } }} />
                  <TextField fullWidth margin="normal" name="weight" label="Weight" variant="outlined" value={userData.weight} onChange={handleInputChange} InputLabelProps={{ style: { color: '#FFF' } }} inputProps={{ style: { color: '#FFF' } }} />
                  <TextField fullWidth margin="normal" name="age" label="Age" variant="outlined" value={userData.age} onChange={handleInputChange} InputLabelProps={{ style: { color: '#FFF' } }} inputProps={{ style: { color: '#FFF' } }} />
                  <TextField fullWidth margin="normal" name="username" label="Username" variant="outlined" value={userData.username} onChange={handleInputChange} InputLabelProps={{ style: { color: '#FFF' } }} inputProps={{ style: { color: '#FFF' } }} />
                  <TextField fullWidth margin="normal" name="email" label="Email" variant="outlined" value={userData.email} onChange={handleInputChange} InputLabelProps={{ style: { color: '#FFF' } }} inputProps={{ style: { color: '#FFF' } }} />
                  <TextField fullWidth margin="normal" name="nationality" label="Nationality" variant="outlined" value={userData.nationality} onChange={handleInputChange} InputLabelProps={{ style: { color: '#FFF' } }} inputProps={{ style: { color: '#FFF' } }} />
                  <TextField fullWidth margin="normal" name="regionality" label="Regionality" variant="outlined" value={userData.regionality} onChange={handleInputChange} InputLabelProps={{ style: { color: '#FFF' } }} inputProps={{ style: { color: '#FFF' } }} />
                  <TextField fullWidth margin="normal" name="calories_per_day_prescribed" label="Calories Per Day (Prescribed)" variant="outlined" value={userData.calories_per_day_prescribed} onChange={handleInputChange} InputLabelProps={{ style: { color: '#FFF' } }} inputProps={{ style: { color: '#FFF' } }} />
              </CardContent>
          </Card>

          <Card style={{ backgroundColor: '#292929', marginBottom: '20px', padding: '15px' }}>
              <CardContent>
                  <Typography variant="h6" style={{ color: "#FFFFFF", marginBottom: '15px' }}>
                      Diet Preferences
                  </Typography>
                  <FormControlLabel
                      control={<Checkbox checked={userData.diet_preferences.vegetarian} onChange={(e) => handleInputChange(e, 'diet_preferences')} name="vegetarian" color="primary" />}
                      label="Vegetarian"
                      labelPlacement="end"
                  />
                  <FormControlLabel
                      control={<Checkbox checked={userData.diet_preferences.diabetes} onChange={(e) => handleInputChange(e, 'diet_preferences')} name="diabetes" color="primary" />}
                      label="Diabetes"
                      labelPlacement="end"
                  />
                  <FormControlLabel
                      control={<Checkbox checked={userData.diet_preferences.medication} onChange={(e) => handleInputChange(e, 'diet_preferences')} name="medication" color="primary" />}
                      label="Medication"
                      labelPlacement="end"
                  />
                  <FormControl fullWidth margin="normal" variant="outlined">
                      <InputLabel style={{ color: '#FFF' }}>Groceries Available</InputLabel>
                      <Select
                          multiple
                          name="grocery_available"
                          value={userData.diet_preferences.grocery_available}
                          onChange={(e) => handleInputChange(e, 'diet_preferences')}
                          label="Groceries Available"
                          inputProps={{ style: { color: '#FFF' } }}
                      >
                          {['fruits', 'vegetables', 'rice', 'chicken'].map((item) => (
                              <MenuItem key={item} value={item}>
                                  {item}
                              </MenuItem>
                          ))}
                      </Select>
                  </FormControl>
              </CardContent>
          </Card>

          <Button variant="contained" color="primary" onClick={handleSave} style={{ marginTop: '20px' }}>
              Save Changes
          </Button>
      </Container>
      }
    </>
  );
}

export default EditProfile;