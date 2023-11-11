import { requests } from './mock/setupTests';

import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import Router from 'src/router/Router';
import { expect, it } from 'vitest';

import { store } from 'store/store';

import { Product } from 'src/interfaces/product';

import Card from 'components/card/Card';

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
      <Provider store={store}>
        <Card product={mockProduct} />
      </Provider>
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
  render(
    <BrowserRouter>
      <Provider store={store}>
        <Router />
      </Provider>
    </BrowserRouter>
  );

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
  render(
    <BrowserRouter>
      <Provider store={store}>
        <Router />
      </Provider>
    </BrowserRouter>
  );

  await waitFor(async () => {
    const firstCard = screen.getAllByTestId('card')[0];
    fireEvent.click(firstCard);
  });

  expect(
    requests.some((req) => req.url === 'https://api.punkapi.com/v2/beers/1')
  ).toBeTruthy();
});
