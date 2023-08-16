import React, { useState, useEffect } from 'react';
import { Container, Typography, RadioGroup, FormControlLabel, Radio, Paper, Button } from '@mui/material';
import MindfulnessResult from '../components/MindfulnessResult';

const MindfulnessPage = (props) => {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [showMentalHealthResult, setShowMentalHealthResult] = useState(false);
  const [phq9Score, setPhq9Score] = useState(0);
  const [gad7Score, setGad7Score] = useState(0);

  useEffect(() => {
    // Fetching the questions
    fetch('http://localhost:3000/mental_health_questions')
      .then(res => res.json())
      .then(data => {
        setQuestions(data);
        const initialAnswers = data.reduce((acc, curr) => {
          acc[curr.question] = curr.selectedOption;
          return acc;
        }, {});
        setAnswers(initialAnswers);
      });
  }, []);

  const handleOptionChange = (question, value) => {
    setAnswers(prev => ({ ...prev, [question]: value }));
  };

  const calculateScores = (answers, questions) => {
    for (let i = 2; i < questions.length; i++) {
      const question = questions[i];
      const selectedOption = answers[question.question];
      if (selectedOption) {
        const optionIndex = question.options.indexOf(selectedOption);
        if (question.question.startsWith("PHQ-9")) {
          setPhq9Score(phq9Score => phq9Score + optionIndex);
        } else if (question.question.startsWith("GAD-7")) {
          setGad7Score(gad7Score => gad7Score + optionIndex);
        }
      }
    }

    setShowMentalHealthResult(true);
    return { phq9Score, gad7Score };
  };
  


  return (
    <Container style={{ backgroundColor: "#1E1E1E", minHeight: '100vh', padding: '2em', backgroundImage: 'url("/path/to/your/background/image.jpg")', backgroundSize: 'cover', fontFamily: 'Roboto, sans-serif' }}>
      {
        showMentalHealthResult ? (
          <MindfulnessResult gad7Score={gad7Score} phq9Score={phq9Score} user={props} />
        ) : (
          <>
            <Typography variant="h4" gutterBottom style={{ color: "#FFFFFF", marginBottom: '20px' }}>
              Mindfulness Assessment
            </Typography>
            {questions.map(q => (
              <Paper key={q.question} style={{ margin: '20px 0', padding: '20px', backgroundColor: '#292929', borderRadius: '10px', transition: 'transform 0.2s', '&:hover': { transform: 'scale(1.02)' } }}>
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
            <Button variant="contained" color="primary" style={{ marginTop: '30px', padding: '10px 20px', borderRadius: '8px', fontWeight: 'bold' }} 
              onClick={() => calculateScores(answers, questions)}>
                Submit
            </Button>
          </>
        )
      }
    </Container>
  );
}

export default MindfulnessPage;
