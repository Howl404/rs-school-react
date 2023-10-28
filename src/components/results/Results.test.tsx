import { act, render, screen, waitFor } from '@testing-library/react';
import { expect, it, vi } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import Results, { Product } from 'src/components/results/Results';
import { ProductsContext } from 'src/contexts/ProductsContext';
import { SearchParamsContext } from 'src/contexts/SearchParamsContext';
import { SearchTermContext } from 'src/contexts/SearchTermContext';

it('Results components renders correctly', async () => {
  vi.mock('services/apiService', () => ({
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

  const mockProducts: Product[] = [];

  const mockSetSearchTerm = vi.fn();

  const mockSetProducts = vi.fn((newProducts) => {
    mockProducts.length = 0;
    mockProducts.push(...newProducts);
  });

  const mockSetSearchParams = vi.fn();

  const mockSearchParams = new URLSearchParams();
  mockSearchParams.set('page', '1');

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
            <SearchParamsContext.Provider
              value={{
                searchParams: mockSearchParams,
                setSearchParams: mockSetSearchParams,
              }}
            >
              <Results />
            </SearchParamsContext.Provider>
          </ProductsContext.Provider>
        </SearchTermContext.Provider>
      </BrowserRouter>
    );
  });

  await waitFor(async () => {
    const products = screen.getAllByRole('heading');

    expect(products).toHaveLength(2);
  });
});
