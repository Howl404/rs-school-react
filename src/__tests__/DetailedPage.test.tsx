import { render, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { expect, it } from 'vitest';

import { store } from 'store/store';

import DetailedPage from 'pages/DetailedPage/DetailedPage';

it('Returns text if product id is not provided via context', async () => {
  render(
    <BrowserRouter>
      <Provider store={store}>
        <DetailedPage />
      </Provider>
    </BrowserRouter>
  );

  await waitFor(() => {
    expect(screen.getByText('Product Id is not provided')).toBeInTheDocument();
  });
});
