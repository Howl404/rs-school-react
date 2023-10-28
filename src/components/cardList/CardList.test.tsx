import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { expect, it, vi } from 'vitest';
import CardList from './CardList';
import { ProductsContext } from 'src/contexts/ProductsContext';
import { Product } from '../results/Results';
import { BrowserRouter } from 'react-router-dom';
import '@testing-library/jest-dom';

it('renders the specified number of cards', () => {
  const mockProducts: Product[] = [
    {
      id: 1,
      name: 'Product 1',
      description: '',
      image_url: '',
      tagline: '',
      first_brewed: '',
    },
    {
      id: 2,
      name: 'Product 2',
      description: '',
      image_url: '',
      tagline: '',
      first_brewed: '',
    },
  ];

  const mockSetProducts: React.Dispatch<
    React.SetStateAction<Product[]>
  > = () => {};

  const mockSetSearchParams = vi.fn();

  render(
    <BrowserRouter>
      <ProductsContext.Provider
        value={{ products: mockProducts, setProducts: mockSetProducts }}
      >
        <CardList setSearchParams={mockSetSearchParams} />
      </ProductsContext.Provider>
    </BrowserRouter>
  );

  const cards = screen.getAllByRole('heading');
  expect(cards).toHaveLength(2);
});

it('displays a message when no cards are present', () => {
  const mockProducts: Product[] = [];

  const mockSetProducts: React.Dispatch<
    React.SetStateAction<Product[]>
  > = () => {};

  const mockSetSearchParams = vi.fn();

  render(
    <BrowserRouter>
      <ProductsContext.Provider
        value={{ products: mockProducts, setProducts: mockSetProducts }}
      >
        <CardList setSearchParams={mockSetSearchParams} />
      </ProductsContext.Provider>
    </BrowserRouter>
  );

  const message = screen.getByText('No cards are present');
  expect(message).toBeInTheDocument();
});

it('calls function on click', async () => {
  const mockProducts: Product[] = [
    {
      id: 1,
      name: 'Product 1',
      description: '',
      image_url: '',
      tagline: '',
      first_brewed: '',
    },
    {
      id: 2,
      name: 'Product 2',
      description: '',
      image_url: '',
      tagline: '',
      first_brewed: '',
    },
  ];

  const mockSetProducts: React.Dispatch<
    React.SetStateAction<Product[]>
  > = () => {};

  const mockSetSearchParams = vi.fn();

  render(
    <BrowserRouter>
      <ProductsContext.Provider
        value={{ products: mockProducts, setProducts: mockSetProducts }}
      >
        <CardList setSearchParams={mockSetSearchParams} />
      </ProductsContext.Provider>
    </BrowserRouter>
  );

  const container = screen.getByTestId('card-container');

  fireEvent.click(container);

  expect(mockSetSearchParams).toHaveBeenCalledTimes(1);
});
