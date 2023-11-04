import { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { expect, it, vi } from 'vitest';
import '@testing-library/jest-dom';

import * as apiService from 'src/services/apiService';

import {
  DetailedProductContext,
  DetailedProductContextProvider,
} from 'src/contexts/DetailedProductContext';
import { SearchTermContext } from 'src/contexts/SearchTermContext';
import { ProductsContext } from 'src/contexts/ProductsContext';

import { Product } from 'src/interfaces/product';

import Card from 'src/components/card/Card';
import DetailedPage from 'src/pages/DetailedPage/DetailedPage';
import Results from 'components/results/Results';

let mockSearchParam = 'page=2&perPage=10';

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
        (fn: (params: URLSearchParams) => URLSearchParams) => {
          const newParams = fn(params);
          mockSearchParam = newParams.toString();
          setParams(newParams);
        },
      ];
    },
  };
});

vi.mock('services/apiService', () => ({
  fetchItem: vi.fn().mockImplementation(
    () =>
      new Promise((resolve) =>
        setTimeout(
          () =>
            resolve({
              id: 1,
              name: 'Detailed product',
              description: 'test description',
              image_url: 'test url',
              tagline: 'test tagline',
              first_brewed: '1992',
            }),
          100
        )
      )
  ),
  fetchItems: vi.fn().mockResolvedValue([
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
  ]),
}));

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

it('Check that a loading indicator is displayed while fetching data', async () => {
  render(<TestAppWrapper />);

  await waitFor(async () => {
    const firstCard = screen.getAllByTestId('card')[0];
    fireEvent.click(firstCard);
  });

  const fetchItem = vi.mocked(apiService.fetchItem);

  expect(fetchItem).toBeCalled();

  await waitFor(() => {
    const loader = screen.getByTestId('spinner-container');
    expect(loader).toBeInTheDocument();
  });
});
