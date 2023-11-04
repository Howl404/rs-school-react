import { BrowserRouter } from 'react-router-dom';

import { fireEvent, render, screen } from '@testing-library/react';
import { expect, it, vi } from 'vitest';
import { act } from 'react-dom/test-utils';
import '@testing-library/jest-dom';

import MainPage from 'src/pages/MainPage/MainPage';

vi.mock('services/apiService', () => ({
  fetchItems: vi.fn().mockResolvedValue([
    {
      id: 1,
      name: 'Product 1',
      description: '',
      image_url: '',
      tagline: '',
      first_brewed: '',
    },
    {
      id: 2,
      name: 'Product 2',
      description: '',
      image_url: '',
      tagline: '',
      first_brewed: '',
    },
  ]),
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

it('Throw error on button click', async () => {
  render(
    <BrowserRouter>
      <MainPage />
    </BrowserRouter>
  );

  await act(async () => {});

  const errorButton = screen.getByTestId('error-button');

  expect(() => {
    fireEvent.click(errorButton);
  }).toThrow('This is a test error');
});
