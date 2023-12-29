import { render, screen } from '@testing-library/react';
import { mockProducts } from 'mock/handler';
import { Provider } from 'react-redux';
import { store } from 'src/store';
import { expect, test } from 'vitest';

import CardList from './CardList';

test('Verify that the component renders the specified number of cards', async () => {
  render(
    <Provider store={store()}>
      <CardList data={mockProducts} setSelected={() => {}} />
    </Provider>
  );

  const cards = await screen.findAllByTestId('card');

  expect(cards).toHaveLength(10);
});

test('Check that an appropriate message is displayed if no cards are present', async () => {
  render(
    <Provider store={store()}>
      <CardList data={[]} setSelected={() => {}} />
    </Provider>
  );

  const message = screen.getByText('Nothing is found');
  expect(message).toBeInTheDocument();
});
