import React from 'react';
import { Card, CardActionArea, CardContent, Typography } from '@mui/material';

const Category = ({ setSelectedCategory }) => {
  const categories = ['all', 'gym equipments', 'proteins', 'yoga mats', 'sports wear'];

  return (
    <div style={{ width: '240px', padding: '20px', backgroundColor: '#2C2C2C' }}>
      {categories.map(category => (
        <Card key={category} style={{ marginBottom: '20px', backgroundColor: '#3C3C3C' }}>
          <CardActionArea onClick={() => setSelectedCategory(category)}>
            {/* You can replace this with an actual image later */}
            <div style={{ height: '100px', backgroundColor: '#5C5C5C' }}></div>
            <CardContent>
              <Typography variant="subtitle1" color="textSecondary">
                {category}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      ))}
    </div>
  );
};

export default Category;
