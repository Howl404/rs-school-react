import { act, render, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { expect, it } from 'vitest';

import { store } from 'store/store';

import Results from 'components/results/Results';

it('Results is getting products from API and displays it', async () => {
  act(() => {
    render(
      <BrowserRouter>
        <Provider store={store}>
          <Results />
        </Provider>
      </BrowserRouter>
    );
  });

  await waitFor(async () => {
    const products = screen.getAllByTestId('card');

    expect(products).toHaveLength(10);
  });
});
