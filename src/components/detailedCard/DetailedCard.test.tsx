import { fireEvent, render, screen } from '@testing-library/react';
import { mockProduct } from 'mock/handler';
import mockRouter from 'next-router-mock';
import { expect, it } from 'vitest';

import DetailedCard from './DetailedCard';

it('Make sure the detailed card component correctly displays the detailed card data', async () => {
  render(<DetailedCard product={mockProduct} />);

  const detailedCard = screen.getByTestId('detailed-card');

  expect(detailedCard).toBeInTheDocument();

  expect(screen.getByText(mockProduct.name)).toBeInTheDocument();
  expect(screen.getByText(mockProduct.description)).toBeInTheDocument();
});

it('Ensure that clicking the close button deletes id from query params', async () => {
  mockRouter.push('?id=1');
  render(<DetailedCard product={mockProduct} />);

  expect(mockRouter.query.id).toBe('1');

  const detailedCard = screen.getByTestId('detailed-card');

  expect(detailedCard).toBeInTheDocument();

  const closeButton = screen.getByTestId('close-button');

  fireEvent.click(closeButton);

  expect(mockRouter.query.id).toBeUndefined();
});
