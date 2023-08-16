import React from 'react';
import { Card, CardContent, Typography, Divider } from '@mui/material';

const RecommendationCard = ({ recommendationData }) => {

  const { breakfast_recommendation } = recommendationData;

  const splitRecommendations = breakfast_recommendation.split("\n").filter(item => item.trim() !== "");

  return (
    <Card style={{ backgroundColor: '#292929', padding: '20px', borderRadius: '10px' }}>
      <CardContent>
        {splitRecommendations.map((recommendation, index) => {
          if (recommendation.includes("Breakfast:") || recommendation.includes("Lunch:") || recommendation.includes("Dinner:")) {
            return (
              <Typography key={index} variant="h6" style={{ color: "#FFFFFF", marginTop: '20px' }}>
                {recommendation}
              </Typography>
            );
          }
          return (
            <Typography key={index} style={{ color: "#FFFFFF", marginTop: '10px' }}>
              {recommendation}
            </Typography>
          );
        })}
      </CardContent>
    </Card>
  );
};

export default RecommendationCard;
