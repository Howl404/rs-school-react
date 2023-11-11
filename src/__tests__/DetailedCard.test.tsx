import { mockProduct } from './mock/handler';

import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import Router from 'src/router/Router';
import { expect, it } from 'vitest';

import { store } from 'store/store';

it('Check that a loading indicator is displayed while fetching data', async () => {
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

  await waitFor(() => {
    const spinner = screen.queryByTestId('spinner-container');

    expect(spinner).toBeInTheDocument();
  });
});

it('Make sure the detailed card component correctly displays the detailed card data', async () => {
  render(
    <BrowserRouter>
      <Provider store={store}>
        <Router />
      </Provider>
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

  await waitFor(() => {
    const loader = screen.getByTestId('spinner-container');
    expect(loader).toBeInTheDocument();
  });

  await waitFor(() => new Promise((resolve) => setTimeout(resolve, 200)));

  const detailedCard = screen.getByTestId('detailed-card');

  expect(detailedCard).toBeInTheDocument();

  const closeButton = screen.getByTestId('close-button');

  fireEvent.click(closeButton);

  await waitFor(() => {
    const detailedCard = screen.queryByTestId('detailed-card');
    expect(detailedCard).not.toBeInTheDocument();
  });
});
