import { fireEvent, render, screen } from '@testing-library/react';
import mockRouter from 'next-router-mock';
import { describe, expect, it } from 'vitest';

import Pagination from './Pagination';

describe('Make sure the component updates URL query parameter when page changes', () => {
  it('When user clicks next page', () => {
    render(<Pagination page={1} perPage={10} />);

    const nextButton = screen.getByText('ᐳ');

    fireEvent.click(nextButton);

    expect(mockRouter.query.page).toBe(2);
  });

  it('When user clicks previous page', () => {
    render(<Pagination page={2} perPage={10} />);

    const prevButton = screen.getByText('ᐸ');

    fireEvent.click(prevButton);

    expect(mockRouter.query.page).toBe(1);
  });

  it('When user changes amount of items on page, reset page to first', () => {
    render(<Pagination page={1} perPage={10} />);
    const nextButton = screen.getByText('ᐳ');

    fireEvent.click(nextButton);

    expect(mockRouter.query.page).toBe(2);

    const select = screen.getByRole('combobox');

    fireEvent.change(select, { target: { value: 10 } });

    expect(mockRouter.query.page).toBe(1);
  });
});
