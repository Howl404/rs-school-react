import { render } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import { BrowserRouter } from 'react-router-dom';
import { expect, it, vi } from 'vitest';
import '@testing-library/jest-dom';

import { fetchItemMock, fetchItemsMock } from './mock/apiServiceMocks';

import MainPage from 'pages/MainPage/MainPage';

vi.mock('services/apiService', () => ({
  fetchItem: fetchItemMock,
  fetchItems: fetchItemsMock,
}));

it('Renders main page with all components and 2 products', async () => {
  const { asFragment } = render(
    <BrowserRouter>
      <MainPage />
    </BrowserRouter>
  );

  await act(async () => {});

  expect(asFragment()).toMatchSnapshot();
});
