import { render, screen } from '@testing-library/react';
import { mockProducts } from 'mock/handler';
import { expect, test } from 'vitest';

import CardList from './CardList';

test('Verify that the component renders the specified number of cards', async () => {
  render(<CardList data={mockProducts} />);

  const cards = await screen.findAllByTestId('card');

  expect(cards).toHaveLength(10);
});

test('Check that an appropriate message is displayed if no cards are present', async () => {
  render(<CardList data={[]} />);

  const message = screen.getByText('Nothing is found');
  expect(message).toBeInTheDocument();
});
