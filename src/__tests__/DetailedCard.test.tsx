import { useState } from 'react';
import { BrowserRouter, MemoryRouter, Route, Routes } from 'react-router-dom';

import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { expect, it, vi } from 'vitest';
import '@testing-library/jest-dom';

import { DetailedProductContext } from 'contexts/DetailedProductContext';
import { SearchTermContext } from 'contexts/SearchTermContext';
import { ProductsContext } from 'contexts/ProductsContext';

import { Product } from 'src/interfaces/product';

import DetailedPage from 'pages/DetailedPage/DetailedPage';

import Results from 'components/results/Results';

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

it('Make sure the detailed card component correctly displays the detailed card data', async () => {
  const mockProduct = {
    id: 1,
    name: 'Detailed product',
    description: 'test description',
    image_url: 'test url',
    tagline: 'test tagline',
    first_brewed: '1992',
  };

  render(
    <BrowserRouter>
      <DetailedProductContext.Provider
        value={{
          detailedProductId: '1',
          setDetailedProductId: vi.fn(),
        }}
      >
        <DetailedPage />
      </DetailedProductContext.Provider>
    </BrowserRouter>
  );

  await waitFor(async () => {
    const detailedCard = screen.getByTestId('detailed-card');

    expect(detailedCard).toBeInTheDocument();

    expect(screen.getByText(mockProduct.name)).toBeInTheDocument();
    expect(screen.getByAltText('Detailed product image')).toHaveAttribute(
      'src',
      mockProduct.image_url
    );
    expect(screen.getByText(mockProduct.description)).toBeInTheDocument();
  });
});

it('Ensure that clicking the close button hides the component', async () => {
  const mockProducts: Product[] = [];

  const mockSetSearchTerm = vi.fn();

  const mockSetProducts = vi.fn((newProducts) => {
    mockProducts.length = 0;
    mockProducts.push(...newProducts);
  });

  function TestAppWrapper() {
    const [testProductId, setTestProductId] = useState('');

    return (
      <MemoryRouter>
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
      </MemoryRouter>
    );
  }

  render(<TestAppWrapper />);

  await waitFor(async () => {
    const firstCard = screen.getAllByTestId('card')[0];
    fireEvent.click(firstCard);
  });

  await waitFor(() => {
    const loader = screen.getByTestId('spinner-container');
    expect(loader).toBeInTheDocument();
  });

  await waitFor(() => new Promise((resolve) => setTimeout(resolve, 100)));

  const detailedCard = screen.queryByTestId('detailed-card');

  expect(detailedCard).toBeInTheDocument();

  const closeButton = screen.getByTestId('close-button');

  fireEvent.click(closeButton);

  await waitFor(() => {
    const detailedCard = screen.queryByTestId('detailed-card');
    expect(detailedCard).not.toBeInTheDocument();
  });
});
