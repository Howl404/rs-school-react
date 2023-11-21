import { mockProduct } from './mock/handler';

import { fireEvent, render, screen } from '@testing-library/react';
import mockRouter from 'next-router-mock';
import { expect, it } from 'vitest';

import Card from 'components/card/Card';

it('Ensure that the card component renders the relevant card data', () => {
  render(<Card product={mockProduct} />);

  expect(screen.getByText(mockProduct.name)).toBeInTheDocument();
  expect(screen.getByAltText(`${mockProduct.name} image`)).toHaveAttribute(
    'src',
    mockProduct.image_url
  );
  expect(screen.getByText(mockProduct.tagline)).toBeInTheDocument();
});

it('Validate that clicking on a card sets id to query params', async () => {
  render(<Card product={mockProduct} />);

  const firstCard = screen.getAllByTestId('card')[0];
  fireEvent.click(firstCard);

  expect(mockRouter.query.id).toBe(1);
});
