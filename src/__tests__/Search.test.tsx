import { render, fireEvent, screen } from '@testing-library/react';
import mockRouter from 'next-router-mock';
import { expect, it } from 'vitest';

import Search from 'components/search/Search';

it('Clicking the Search button saves the entered value to query params', async () => {
  render(<Search searchTerm="" />);

  const inputElement = screen.getByRole('textbox');
  const button = screen.getByText('Search');

  fireEvent.change(inputElement, { target: { value: 'test search' } });

  fireEvent.click(button);

  expect(mockRouter.query.searchTerm).toBe('test search');
});

it('Sets passed search term as default value for input', () => {
  render(<Search searchTerm={'test'} />);

  const inputElement = screen.getByRole('textbox') as HTMLInputElement;

  expect(inputElement.value).toBe('test');
});
