import React from 'react';
import { render, screen } from '@testing-library/react';
import { expect, it, vi } from 'vitest';
import { Product } from 'components/results/Results';
import { BrowserRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import { SearchParamsContext } from 'src/contexts/SearchParamsContext';
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

  const mockSetSearchParams = vi.fn();
  const mockSearchParams = {} as URLSearchParams;

  render(
    <BrowserRouter>
      <SearchParamsContext.Provider
        value={{
          searchParams: mockSearchParams,
          setSearchParams: mockSetSearchParams,
        }}
      >
        <Card product={mockProduct} />
      </SearchParamsContext.Provider>
    </BrowserRouter>
  );

  expect(screen.getByText(mockProduct.name)).toBeInTheDocument();
  expect(screen.getByAltText('Product 1 image')).toHaveAttribute(
    'src',
    mockProduct.image_url
  );
  expect(screen.getByText(mockProduct.tagline)).toBeInTheDocument();
});
