import React from 'react';
import { Card, CardContent, Typography, Button, Grid } from '@mui/material';

const PricingPage = () => {
  const plans = [
    {
      title: 'Free',
      price: '₹0',
      features: ['Feature 1', 'Feature 2', 'Limited Feature 3']
    },
    {
      title: 'Premium',
      price: '₹199/month',
      features: ['Feature 1', 'Enhanced Feature 2', 'Feature 3', 'Bonus Feature']
    },
    {
      title: 'Pro',
      price: '₹249/month',
      features: ['All Premium Features', 'Exclusive Pro Features', 'Priority Support']
    }
  ];

  return (
    <div style={{ padding: '40px 80px', backgroundColor: '#151515', height: '100vh' }}>
      <Typography variant="h4" color="primary" gutterBottom style={{ textAlign: 'center' }}>
        Our Pricing Plans
      </Typography>
      <Grid container spacing={4} justifyContent="center">
        {plans.map(plan => (
          <Grid item key={plan.title} xs={12} md={4}>
            <Card 
              style={{ 
                minHeight: '320px', 
                backgroundColor: '#2C2C2C', 
                color: 'white', 
                textAlign: 'center', 
                padding: '20px',
                transition: 'transform 0.3s',
                '&:hover': {
                  transform: 'scale(1.05)'
                }
              }}>
              <Typography variant="h5" color="primary" gutterBottom>
                {plan.title}
              </Typography>
              <Typography variant="h4" color="textSecondary" gutterBottom>
                {plan.price}
              </Typography>
              <CardContent>
                {plan.features.map(feature => (
                  <Typography key={feature} variant="body1" gutterBottom>
                    {feature}
                  </Typography>
                ))}
              </CardContent>
              <Button variant="contained" color="primary">
                Choose Plan
              </Button>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default PricingPage;
