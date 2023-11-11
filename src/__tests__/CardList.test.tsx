import { render, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { expect, test } from 'vitest';

import { setPerPage } from 'store/search/searchSlice';
import { store } from 'store/store';

import CardList from 'components/cardList/CardList';
import Results from 'components/results/Results';

test('Verify that the component renders the specified number of cards', async () => {
  render(
    <BrowserRouter>
      <Provider store={store}>
        <Results />
      </Provider>
    </BrowserRouter>
  );

  await waitFor(() => new Promise((resolve) => setTimeout(resolve, 50)));

  const cards = await screen.findAllByTestId('card');

  expect(cards).toHaveLength(10);

  store.dispatch(setPerPage('5'));

  await waitFor(() => new Promise((resolve) => setTimeout(resolve, 50)));

  await waitFor(async () => {
    const cards = await screen.findAllByTestId('card');

    expect(cards).toHaveLength(5);
  });
});

test('Check that an appropriate message is displayed if no cards are present', async () => {
  render(<CardList data={[]} />);

  const message = screen.getByText('Nothing is found');
  expect(message).toBeInTheDocument();
});
