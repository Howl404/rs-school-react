import React from 'react';
import { render, screen } from '@testing-library/react';
import { expect, it } from 'vitest';
import { Product } from 'components/results/Results';
import { BrowserRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import Card from 'src/components/card/Card';

it('Ensure that the card component renders the relevant card data', () => {
  const mockProduct: Product = {
    id: 1,
    name: 'Product 1',
    description: '',
    image_url: 'test url',
    tagline: 'test tagline',
    first_brewed: '',
  };

  render(
    <BrowserRouter>
      <Card product={mockProduct} />
    </BrowserRouter>
  );

  expect(screen.getByText(mockProduct.name)).toBeInTheDocument();
  expect(screen.getByAltText('Product 1 image')).toHaveAttribute(
    'src',
    mockProduct.image_url
  );
  expect(screen.getByText(mockProduct.tagline)).toBeInTheDocument();
});
