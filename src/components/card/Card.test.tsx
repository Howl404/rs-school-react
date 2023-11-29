import { fireEvent, render, screen } from '@testing-library/react';
import { expect, it, vi } from 'vitest';

import Card from './Card';
import { mockProduct } from '../../__tests__/mock/handler';

it('Ensure that the card component renders the relevant card data', () => {
  render(<Card product={mockProduct} onClick={() => {}} />);

  expect(screen.getByText(mockProduct.name)).toBeInTheDocument();
  expect(screen.getByText(mockProduct.tagline)).toBeInTheDocument();
});

it('Validate that clicking on a card calls callback function', async () => {
  const mockCallback = vi.fn();
  render(<Card product={mockProduct} onClick={mockCallback} />);

  const firstCard = screen.getAllByTestId('card')[0];

  fireEvent.click(firstCard);

  expect(mockCallback).toBeCalled();
});
