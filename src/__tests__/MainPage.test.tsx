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
      perPage={mockProducts.length.toString()}
    />
  );

  const cards = await screen.findAllByTestId('card');

  expect(cards).toHaveLength(mockProducts.length);

  const detailedCard = screen.getByTestId('detailed-card');

  expect(detailedCard).toBeInTheDocument();

  expect(screen.getByText(mockProduct.name)).toBeInTheDocument();
  expect(screen.getByText(mockProduct.description)).toBeInTheDocument();

  const inputElement = screen.getByRole('textbox') as HTMLInputElement;

  expect(inputElement.value).toBe('test');
});
