import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { expect, it, vi } from 'vitest';

import { fetchItemMock, fetchItemsMock } from './mock/apiServiceMocks';

import * as apiService from 'services/apiService';
import '@testing-library/jest-dom';

import {
  DetailedProductContext,
  DetailedProductContextProvider,
} from 'contexts/DetailedProductContext';
import { ProductsContext } from 'contexts/ProductsContext';
import { SearchTermContext } from 'contexts/SearchTermContext';

import { Product } from 'src/interfaces/product';

import Card from 'components/card/Card';
import Results from 'components/results/Results';

import DetailedPage from 'pages/DetailedPage/DetailedPage';

vi.mock('services/apiService', () => ({
  fetchItem: fetchItemMock,
  fetchItems: fetchItemsMock,
}));

const mockProducts: Product[] = [];

const mockSetSearchTerm = vi.fn();

const mockSetProducts = vi.fn((newProducts) => {
  mockProducts.length = 0;
  mockProducts.push(...newProducts);
});

function TestAppWrapper() {
  const [testProductId, setTestProductId] = useState('');

  return (
    <BrowserRouter>
      <SearchTermContext.Provider
        value={{ searchTerm: '', setSearchTerm: mockSetSearchTerm }}
      >
        <ProductsContext.Provider
          value={{ products: mockProducts, setProducts: mockSetProducts }}
        >
          <DetailedProductContext.Provider
            value={{
              detailedProductId: testProductId,
              setDetailedProductId: setTestProductId,
            }}
          >
            <Routes>
              <Route path={'/'} element={<Results />}>
                <Route path="" element={<DetailedPage />} />
              </Route>
            </Routes>
          </DetailedProductContext.Provider>
        </ProductsContext.Provider>
      </SearchTermContext.Provider>
    </BrowserRouter>
  );
}

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
      <DetailedProductContextProvider>
        <Card product={mockProduct} />
      </DetailedProductContextProvider>
    </BrowserRouter>
  );

  expect(screen.getByText(mockProduct.name)).toBeInTheDocument();
  expect(screen.getByAltText('Product 1 image')).toHaveAttribute(
    'src',
    mockProduct.image_url
  );
  expect(screen.getByText(mockProduct.tagline)).toBeInTheDocument();
});

it('Validate that clicking on a card opens a detailed card component', async () => {
  render(<TestAppWrapper />);

  const detailedCard = screen.queryByTestId('detailed-card');

  expect(detailedCard).not.toBeInTheDocument();

  await waitFor(async () => {
    const firstCard = screen.getAllByTestId('card')[0];
    fireEvent.click(firstCard);
  });

  await waitFor(() => new Promise((resolve) => setTimeout(resolve, 100)));

  await waitFor(() => {
    const detailedCard = screen.queryByTestId('detailed-card');

    expect(detailedCard).toBeInTheDocument();
  });
});

it('Check that clicking triggers an additional API call to fetch detailed information', async () => {
  render(<TestAppWrapper />);

  await waitFor(async () => {
    const firstCard = screen.getAllByTestId('card')[0];
    fireEvent.click(firstCard);
  });

  const fetchItem = vi.mocked(apiService.fetchItem);

  expect(fetchItem).toBeCalled();
});
