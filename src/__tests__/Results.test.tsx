import { act, render, screen, waitFor } from '@testing-library/react';
import { useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { expect, it, vi } from 'vitest';
import '@testing-library/jest-dom';

import { fetchItemMock, fetchItemsMock } from './mock/apiServiceMocks';

import { DetailedProductContextProvider } from 'contexts/DetailedProductContext';
import { ProductsContext } from 'contexts/ProductsContext';
import { SearchTermContext } from 'contexts/SearchTermContext';

import { Product } from 'src/interfaces/product';

import Results from 'components/results/Results';

let mockSearchParam = '';

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

it('Results is getting products from API and displays it', async () => {
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

  act(() => {
    render(
      <BrowserRouter>
        <SearchTermContext.Provider
          value={{
            searchTerm: '',
            setSearchTerm: mockSetSearchTerm,
          }}
        >
          <ProductsContext.Provider
            value={{ products: mockProducts, setProducts: mockSetProducts }}
          >
            <DetailedProductContextProvider>
              <Results />
            </DetailedProductContextProvider>
          </ProductsContext.Provider>
        </SearchTermContext.Provider>
      </BrowserRouter>
    );
  });

  await waitFor(async () => {
    const products = screen.getAllByTestId('card');

    expect(products).toHaveLength(2);
  });
});