import React from 'react';
import { Card, CardContent, CardMedia, Typography } from '@mui/material';

const ProductCard = ({ product }) => {
  return (
    <Card style={{ width: '240px', margin: '10px', backgroundColor: '#3C3C3C', borderRadius: '5px' }}>
      <CardMedia
        component="img"
        height="140"
        image={product.imageUrl}
        alt={product.name}
      />
      <CardContent>
        <Typography variant="h6" color="textPrimary">
          {product.name}
        </Typography>
        <Typography variant="subtitle1" color="textSecondary">
          {product.price}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
