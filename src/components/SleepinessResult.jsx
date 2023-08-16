import React from 'react';
import { Typography, Paper, Button } from '@mui/material';

const SleepinessResult = ({ score, user }) => {
    let interpretation = '';

    if (score >= 0 && score <= 7) {
        interpretation = 'It is unlikely that you are abnormally sleepy.';
    } else if (score >= 8 && score <= 9) {
        interpretation = 'You have an average amount of daytime sleepiness.';
    } else if (score >= 10 && score <= 15) {
        interpretation = 'You may be excessively sleepy depending on the situation.';
    } else if (score >= 16 && score <= 24) {
        interpretation = 'You are excessively sleepy.';
    }

    const saveToDatabase = async () => {
        const dataToSave = {
            date: new Date().toISOString().split('T')[0],
            score: score,
            interpretation: interpretation
        };

        console.log('Saving data to the database...', user);

        await fetch(`http://localhost:3000/users/${localStorage.getItem('user_id')}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                neuro_sleepiness: user.neuro_sleepiness ? user.neuro_sleepiness.concat(dataToSave) : [dataToSave]
            })
        }).then(response => {
            response.json()
            window.location.href = '/'
        })
            .catch((error) => {
                console.error('Error:', error);
            })
    };

    return (
        <Paper style={{ padding: '20px', backgroundColor: '#292929', borderRadius: '10px', marginTop: '20px' }}>
            <Typography variant="h5" style={{ color: "#FFFFFF", marginBottom: '15px' }}>
                Your Sleepiness Score: {score}
            </Typography>
            <Typography variant="h6" style={{ color: "#FFFFFF", marginBottom: '15px' }}>
                Interpretation: {interpretation}
            </Typography>
            <Button variant="contained" color="primary" onClick={saveToDatabase}>
                Save Results
            </Button>
        </Paper>
    );
}

export default SleepinessResult;
