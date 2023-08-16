import { useState } from 'react';
import { Button, Typography, Paper, Box } from '@mui/material';

const MindfulnessResult = ({ gad7Score, phq9Score, user }) => {
    const [savedData, setSavedData] = useState(null);

    const getGAD7Interpretation = (score) => {
        if (score <= 5) return "Mild anxiety";
        if (score <= 10) return "Moderate anxiety";
        if (score <= 15) return "Moderately severe anxiety";
        return "Severe anxiety";
    };

    const getPHQ9Interpretation = (score) => {
        if (score <= 5) return "Mild depression";
        if (score <= 10) return "Moderate depression";
        if (score <= 15) return "Moderately severe depression";
        return "Severe depression";
    };

    const saveToDatabase = async () => {
        const gad7Interpretation = getGAD7Interpretation(gad7Score);
        const phq9Interpretation = getPHQ9Interpretation(phq9Score);

        const dataToSave = {
            date: new Date().toISOString().split('T')[0],
            gad7_score: gad7Score,
            phq9_score: phq9Score,
            interpretation: `GAD-7: ${gad7Interpretation}, PHQ-9: ${phq9Interpretation}`
        };

        // Mock saving to the database
        setSavedData(dataToSave);

        await fetch(`http://localhost:3000/users/${localStorage.getItem('user_id')}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: user.username,
                password: user.password,
                email: user.email,
                mental_health: [dataToSave]
            })
        }).then(response => response.json())
            .catch((error) => {
                console.error('Error:', error);
            })
    };

    return (
        <Paper style={{ padding: '20px', backgroundColor: '#151515' }}>
            <Typography variant="h4" color="primary" gutterBottom>
                Mindfulness Results
            </Typography>

            <Box marginBottom={2}>
                <Typography variant="h6" color="textPrimary">
                    GAD-7 Score: {gad7Score} - {getGAD7Interpretation(gad7Score)}
                </Typography>
            </Box>

            <Box marginBottom={3}>
                <Typography variant="h6" color="textPrimary">
                    PHQ-9 Score: {phq9Score} - {getPHQ9Interpretation(phq9Score)}
                </Typography>
            </Box>

            <Button variant="contained" color="primary" onClick={saveToDatabase}>
                Save Results
            </Button>

            {savedData && (
                <Box marginTop={4}>
                    <Typography variant="h6" color="primary" gutterBottom>
                        Saved Data:
                    </Typography>
                    <pre style={{ color: 'white' }}>{JSON.stringify(savedData, null, 2)}</pre>
                </Box>
            )}
        </Paper>
    );
};

export default MindfulnessResult;
