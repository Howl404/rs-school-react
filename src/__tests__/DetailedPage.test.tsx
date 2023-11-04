import { BrowserRouter } from 'react-router-dom';

import { render, screen, waitFor } from '@testing-library/react';
import { expect, it } from 'vitest';
import '@testing-library/jest-dom';

import { DetailedProductContextProvider } from 'src/contexts/DetailedProductContext';

import DetailedPage from 'src/pages/DetailedPage/DetailedPage';

it('Returns text if product id not provided via context', async () => {
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
