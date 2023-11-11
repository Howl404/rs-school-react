import { fireEvent, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';

import { store } from 'store/store';

import Pagination from 'components/pagination/Pagination';

describe('Make sure the component updates URL query parameter when page changes', () => {
  it('When user changes the page', () => {
    render(
      <BrowserRouter>
        <Provider store={store}>
          <Pagination />
        </Provider>
      </BrowserRouter>
    );

    const nextButton = screen.getByText('ᐳ');

    fireEvent.click(nextButton);

    expect(window.location.search).toContain('page=2');

    const prevButton = screen.getByText('ᐸ');

    fireEvent.click(prevButton);

    expect(window.location.search).toContain('page=1');
  });

  it('When user changes amount of items on page, reset page to first', () => {
    render(
      <BrowserRouter>
        <Provider store={store}>
          <Pagination />
        </Provider>
      </BrowserRouter>
    );
    const nextButton = screen.getByText('ᐳ');

    fireEvent.click(nextButton);

    expect(window.location.search).toContain('page=2');

    const select = screen.getByRole('combobox');

    fireEvent.change(select, { target: { value: 10 } });

    expect(window.location.search).toContain('page=1');
  });
});
