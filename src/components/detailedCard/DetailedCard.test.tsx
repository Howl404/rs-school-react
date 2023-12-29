import { fireEvent, render, screen } from '@testing-library/react';
import { mockProduct } from 'mock/handler';
import { expect, it, vi } from 'vitest';

import DetailedCard from './DetailedCard';

it('Make sure the detailed card component correctly displays the detailed card data', async () => {
  render(<DetailedCard product={mockProduct} closeModal={() => {}} />);

  const detailedCard = screen.getByTestId('detailed-card');

  expect(detailedCard).toBeInTheDocument();

  expect(screen.getByText(mockProduct.name)).toBeInTheDocument();
  expect(screen.getByText(mockProduct.description)).toBeInTheDocument();
});

it('Ensure that clicking the close button calls callback', async () => {
  const mockCallback = vi.fn();
  render(<DetailedCard product={mockProduct} closeModal={mockCallback} />);

  const detailedCard = screen.getByTestId('detailed-card');

  expect(detailedCard).toBeInTheDocument();

  const closeButton = screen.getByTestId('close-button');

  fireEvent.click(closeButton);

  expect(mockCallback).toBeCalled();
});
