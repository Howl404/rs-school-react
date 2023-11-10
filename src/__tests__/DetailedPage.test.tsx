import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { expect, it } from 'vitest';
import '@testing-library/jest-dom';

import { DetailedProductContextProvider } from 'contexts/DetailedProductContext';

import DetailedPage from 'pages/DetailedPage/DetailedPage';

it('Returns text if product id is not provided via context', async () => {
  render(
    <BrowserRouter>
      <DetailedProductContextProvider>
        <DetailedPage />
      </DetailedProductContextProvider>
    </BrowserRouter>
  );

  await waitFor(() => {
    expect(screen.getByText('Product Id is not provided')).toBeInTheDocument();
  });
});
