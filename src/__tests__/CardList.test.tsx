import React, { useState } from 'react';
import { BrowserRouter } from 'react-router-dom';

import { render, screen } from '@testing-library/react';
import { expect, it, vi } from 'vitest';
import '@testing-library/jest-dom';

import { ProductsContext } from 'contexts/ProductsContext';
import { DetailedProductContextProvider } from 'contexts/DetailedProductContext';

import { Product } from 'src/interfaces/product';

import CardList from 'components/cardList/CardList';

let mockSearchParam = 'productId=123';

vi.mock('react-router-dom', async () => {
  const actual: object = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useSearchParams: () => {
      const [params, setParams] = useState(
        new URLSearchParams(mockSearchParam)
      );

      return [
        params,
        (fn: (searchParams: URLSearchParams) => URLSearchParams) => {
          const newParams = fn(params);
          setParams(newParams);
          mockSearchParam = newParams.toString();
        },
      ];
    },
  };
});

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

it('Verify that the component renders the specified number of cards', () => {
  render(
    <BrowserRouter>
      <ProductsContext.Provider
        value={{ products: mockProducts, setProducts: mockSetProducts }}
      >
        <DetailedProductContextProvider>
          <CardList />
        </DetailedProductContextProvider>
      </ProductsContext.Provider>
    </BrowserRouter>
  );

  const cards = screen.getAllByTestId('card');
  expect(cards).toHaveLength(2);
});

it('Check that an appropriate message is displayed if no cards are present', () => {
  const mockProducts: Product[] = [];

  render(
    <BrowserRouter>
      <ProductsContext.Provider
        value={{ products: mockProducts, setProducts: mockSetProducts }}
      >
        <DetailedProductContextProvider>
          <CardList />
        </DetailedProductContextProvider>
      </ProductsContext.Provider>
    </BrowserRouter>
  );

  const message = screen.getByText('Nothing is found');
  expect(message).toBeInTheDocument();
});
