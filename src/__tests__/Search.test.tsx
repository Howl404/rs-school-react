import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import mockRouter from 'next-router-mock';
import { expect, it } from 'vitest';

import Search from 'components/search/Search';

it('Clicking the Search button saves the entered value to query params', async () => {
  render(<Search />);

  const inputElement = screen.getByRole('textbox');
  const button = screen.getByText('Search');

  fireEvent.change(inputElement, { target: { value: 'test search' } });

  fireEvent.click(button);

  expect(mockRouter.query.searchTerm).toBe('test search');

  await waitFor(() => {});
});

it('Component retrieves the value from query params upon mounting', () => {
  mockRouter.push('?searchTerm=test');

  render(<Search />);

  const inputElement = screen.getByRole('textbox') as HTMLInputElement;

  expect(inputElement.value).toBe('test');
});

it('Clicking "Enter" saves the entered value to query params', () => {
  render(<Search />);

  const inputElement = screen.getByRole('textbox');

  const form = screen.getByTestId('search-form');

  fireEvent.change(inputElement, { target: { value: 'test enter' } });

  fireEvent.keyDown(form, { key: 'Enter' });

  expect(mockRouter.query.searchTerm).toBe('test enter');
});
