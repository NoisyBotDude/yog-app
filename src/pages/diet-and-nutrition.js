import React, { useState, useEffect } from 'react';
import { Card, CardContent, Typography, Button } from '@mui/material';
import RecommendationCard from '../components/Recommendation';

function DietAndNutrition (props) {
    const [recommendations, setRecommendations] = useState([]);
    const [showRecommendations, setShowRecommendations] = useState(false);

    const [userData, setUserData] = useState({
        age: 0,
        height: 0,
        weight: 0,
        diet_preferences: {
            vegetarian: false,
            diabetes: false,
            medication: false,
            grocery_available: []
        },
    })
    const [bmi, setBmi] = useState(0)

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
                    console.log(userData);
                    setBmi((userData.weight / ((userData.height / 100) ** 2)).toFixed(2));
                });
            }
        })
    }, [])


    const fetchRecommendations = async () => {
        // API call to get recommendations
        // const response = await fetch('https://diet-bbz2.onrender.com/recommend');
        // const data = await response.json();
        // setRecommendations(data);
        await fetch('https://diet-bbz2.onrender.com/recommend', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                bmi: bmi,
                vag: userData.diet_preferences?.vegetarian,
                diabetes: userData.diet_preferences?.diabetes,
                meditation: userData.diet_preferences?.medication ? "true" : "false",
                gory: userData.diet_preferences?.grocery_available.join(','),
                nati: userData.nationality,
                regionality: userData.regionality,
                exercise: "walking",
                goal: userData.calories_per_day_prescribed 
            })
        }).then((r) => {
            if (r.ok) {
                r.json().then((data) => {
                    console.log(data);
                    setRecommendations(data);
                    setShowRecommendations(true);
                });
            }
        }).catch((error) => {
            console.log(error);
        })
    };

    return (
        <>
            {
                !props.loading &&
                <div style={{ display: 'flex', justifyContent: 'space-around', padding: '20px', backgroundColor: '#1E1E1E', minHeight: '100vh' }}>
                    {/* BMI Card */}
                    <Card style={{ width: '30%', backgroundColor: '#292929' }}>
                        <CardContent>
                            <Typography variant="h5" style={{ color: "#FFFFFF" }}>Your BMI</Typography>
                            <Typography variant="h3" style={{ color: "#6f0dff", marginTop: '20px' }}>{bmi}</Typography>
                        </CardContent>
                    </Card>

                    {/* User Preference Card */}
                    <Card style={{ width: '30%', backgroundColor: '#292929' }}>
                        <CardContent>
                            <Typography variant="h5" style={{ color: "#FFFFFF" }}>User Status</Typography>
                            <Typography style={{ color: "#FFFFFF", marginTop: '20px' }}>Age: {userData.age}</Typography>
                            <Typography style={{ color: "#FFFFFF", marginTop: '10px' }}>Height: {userData?.height} cm</Typography>
                            <Typography style={{ color: "#FFFFFF", marginTop: '10px' }}>Weight: {userData.weight} kg</Typography>
                            <Typography style={{ color: "#FFFFFF", marginTop: '20px' }}>Dietary Preferences:</Typography>
                            <Typography style={{ color: "#FFFFFF", marginTop: '10px' }}>Vegetarian: {userData.diet_preferences?.vegetarian ? "Yes" : "No"}</Typography>
                            <Typography style={{ color: "#FFFFFF", marginTop: '10px' }}>Diabetes: {userData.diet_preferences?.diabetes ? "Yes" : "No"}</Typography>
                            <Typography style={{ color: "#FFFFFF", marginTop: '10px' }}>On Medication: {userData.diet_preferences?.medication ? "Yes" : "No"}</Typography>
                            <Typography style={{ color: "#FFFFFF", marginTop: '10px' }}>
                                Grocery Available: 
                                {userData.diet_preferences?.grocery_available.join(', ')}
                            </Typography>
                            <a href='/edit-profile'>
                                <Button variant='contained' color='primary' style={{ marginTop: '20px' }}>Update</Button>
                            </a>
                        </CardContent>
                    </Card>

                    {/* Recommendations Card */}
                    <Card style={{ width: '30%', backgroundColor: '#292929' }}>
                        <CardContent>
                            <Typography variant="h5" style={{ color: "#FFFFFF" }}>Recommendations</Typography>
                            {
                                showRecommendations &&
                                    <RecommendationCard recommendationData={recommendations} />
                            }
                            <Button variant="contained" color="primary" style={{ marginTop: '20px' }} onClick={fetchRecommendations}>
                                Show Recommendation
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            }
        </>
    );
}

export default DietAndNutrition;
