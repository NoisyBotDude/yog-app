import React from 'react';
import { Container, Typography, Box } from '@mui/material';
import Marketplace from '../components/MarketPlace';

const MarketplacePage = () => {
  return (
    <Container style={{ marginTop: '40px', backgroundColor: '#151515', borderRadius: '10px', padding: '20px' }}>
      <Box marginBottom={3}>
        <Typography variant="h4" color="primary" gutterBottom>
          Marketplace
        </Typography>
        <Typography variant="subtitle1" color="textSecondary">
          Explore and purchase from a wide range of products.
        </Typography>
      </Box>
      <Marketplace />
    </Container>
  );
};

export default MarketplacePage;
