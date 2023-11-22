import { mockProduct, mockProducts } from './mock/handler';

import { render, screen } from '@testing-library/react';
import MainPage from 'src/pages';
import { expect, it } from 'vitest';

it('Ensure that MainPage renders correctly', async () => {
  render(
    <MainPage
      searchTerm="test"
      products={mockProducts}
      product={mockProduct}
      page={1}
      perPage="10"
    />
  );

  const cards = await screen.findAllByTestId('card');

  expect(cards).toHaveLength(10);

  const detailedCard = screen.getByTestId('detailed-card');

  expect(detailedCard).toBeInTheDocument();

  expect(screen.getByText(mockProduct.name)).toBeInTheDocument();
  expect(screen.getByAltText('Detailed product image')).toHaveAttribute(
    'src',
    mockProduct.image_url
  );
  expect(screen.getByText(mockProduct.description)).toBeInTheDocument();
});
