import { fireEvent, render, screen } from '@testing-library/react';
import mockRouter from 'next-router-mock';
import { expect, it } from 'vitest';

import Card from './Card';
import { mockProduct } from '../../__tests__/mock/handler';

it('Ensure that the card component renders the relevant card data', () => {
  render(<Card product={mockProduct} />);

  expect(screen.getByText(mockProduct.name)).toBeInTheDocument();
  expect(screen.getByText(mockProduct.tagline)).toBeInTheDocument();
});

it('Validate that clicking on a card sets id to query params', async () => {
  render(<Card product={mockProduct} />);

  const firstCard = screen.getAllByTestId('card')[0];

  fireEvent.click(firstCard);

  expect(mockRouter.query.productId).toBe(1);
});
