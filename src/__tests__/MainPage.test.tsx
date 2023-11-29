import { render, screen } from '@testing-library/react';
import { mockProducts } from 'mock/handler';
import { Provider } from 'react-redux';
import { store } from 'src/store';
import { expect, it } from 'vitest';

import MainPage from '../pages/index';

it('Ensure that MainPage renders correctly', async () => {
  render(
    <Provider store={store()}>
      <MainPage
        searchTerm="test"
        products={mockProducts}
        page={1}
        perPage={mockProducts.length}
      />
    </Provider>
  );

  const cards = await screen.findAllByTestId('card');

  expect(cards).toHaveLength(mockProducts.length);

  const inputElement = screen.getByRole('textbox') as HTMLInputElement;

  expect(inputElement.value).toBe('test');
});
