import React, { useState, useEffect } from 'react';
import { Container, Typography, RadioGroup, FormControlLabel, Radio, Paper, Button } from '@mui/material';
import SleepinessResult from './SleepinessResult';

const Sleepiness = (props) => {
    const [questions, setQuestions] = useState([]);
    const [answers, setAnswers] = useState({});
    const [isIncomplete, setIsIncomplete] = useState(true);
    const [score, setScore] = useState(0);
    const [showSleepiness, setShowSleepiness] = useState(false);

    useEffect(() => {
        fetch('http://localhost:3000/sleepiness_q')
            .then(res => res.json())
            .then(data => {
                setQuestions(data);
                const initialAnswers = data.reduce((acc, curr) => {
                    acc[curr.question] = curr.chanceOfDozing;
                    return acc;
                }, {});
                setAnswers(initialAnswers);
            });
    }, []);

    const handleOptionChange = (question, value) => {
        setAnswers(prev => {
            const updatedAnswers = { ...prev, [question]: value };
            const hasMissingAnswers = questions.some(q => !updatedAnswers[q.question]);
            setIsIncomplete(hasMissingAnswers);
            return updatedAnswers;
          });
    };

    const calculateScore = () => {
        let result = 0;
        for (let i = 0; i < questions.length; i++) {
            const question = questions[i];
            const selectedOption = answers[question.question];
            const optionIndex = question.options.indexOf(selectedOption);
            result += optionIndex;
          }

        setScore(result);

        setShowSleepiness(true);
        console.log("the score is: ", result);
        return result;
    };

    return (
        <Container style={{ backgroundColor: "#1E1E1E", minHeight: '100vh', padding: '2em' }}>
            {
                showSleepiness ? (
                    <SleepinessResult score={score} user={props.user} />
                ) : (
                    <>
                        <Typography variant="h4" gutterBottom style={{ color: "#FFFFFF", marginBottom: '20px' }}>
                            Sleepiness Assessment
                        </Typography>
                        {questions.map(q => (
                            <Paper key={q.question} style={{ margin: '20px 0', padding: '20px', backgroundColor: '#292929' }}>
                                <Typography variant="h6" style={{ color: "#FFFFFF", marginBottom: '15px' }}>
                                    {q.question}
                                </Typography>
                                <RadioGroup value={answers[q.question] || ''} onChange={e => handleOptionChange(q.question, e.target.value)}>
                                    {q.options.map(opt => (
                                        <FormControlLabel key={opt} value={opt} control={<Radio color="primary" />} label={<Typography style={{ color: "#FFFFFF" }}>{opt}</Typography>} />
                                    ))}
                                </RadioGroup>
                            </Paper>
                        ))}
                        <Button
                        variant="contained"
                        color="primary"
                        style={{ marginTop: '30px', padding: '10px 20px', borderRadius: '8px', fontWeight: 'bold' }}
                        onClick={calculateScore}
                        disabled={isIncomplete}
                        >
                        Submit
                        </Button>
                    </>
                )
            }
        </Container>
    );
}

export default Sleepiness;
