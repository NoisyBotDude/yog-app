import React, { useState } from 'react';
import Category from './Category';
import ProductCard from './Product';

const Marketplace = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const products = [
    // Sample data - you can replace this with real data from your API
    { id: 1, category: 'gym equipments', name: 'Dumbbell', price: '$20', imageUrl: 'placeholder-image-url' },
    { id: 2, category: 'proteins', name: 'Whey Protein', price: '$50', imageUrl: 'placeholder-image-url' },
    // ... Add more sample products
  ];

  const filteredProducts = selectedCategory === 'all'
    ? products
    : products.filter(product => product.category === selectedCategory);

  return (
    <div style={{ display: 'flex' }}>
      <Category setSelectedCategory={setSelectedCategory} />
      <div style={{ flex: 1, padding: '20px' }}>
        {filteredProducts.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Marketplace;
