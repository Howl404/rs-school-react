import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import { SearchParamsContext } from 'src/contexts/SearchParamsContext';
import Pagination from 'src/components/pagination/Pagination';

describe('Make sure the component updates URL query parameter when page changes', () => {
  it('When next page button is clicked', () => {
    const page = 5;
    const mockSetSearchParams = vi.fn();
    const mockSearchParams = new URLSearchParams(`page=${page}`);

    render(
      <BrowserRouter>
        <SearchParamsContext.Provider
          value={{
            searchParams: mockSearchParams,
            setSearchParams: mockSetSearchParams,
          }}
        >
          <Pagination page={page} />
        </SearchParamsContext.Provider>
      </BrowserRouter>
    );

    const nextButton = screen.getByText('>');

    fireEvent.click(nextButton);

    expect(mockSetSearchParams).toHaveBeenCalledWith(expect.any(Function));
    const capturedArguments = mockSetSearchParams.mock.calls[0][0];
    const updatedPage = capturedArguments(new URLSearchParams()).get('page');

    expect(updatedPage).toBe('6');
  });

  it('When previous page button is clicked', () => {
    const page = 5;
    const mockSetSearchParams = vi.fn();
    const mockSearchParams = new URLSearchParams(`page=${page}`);

    render(
      <BrowserRouter>
        <SearchParamsContext.Provider
          value={{
            searchParams: mockSearchParams,
            setSearchParams: mockSetSearchParams,
          }}
        >
          <Pagination page={page} />
        </SearchParamsContext.Provider>
      </BrowserRouter>
    );

    const prevButton = screen.getByText('<');

    fireEvent.click(prevButton);

    expect(mockSetSearchParams).toHaveBeenCalledWith(expect.any(Function));
    const capturedArguments = mockSetSearchParams.mock.calls[0][0];
    const updatedPage = capturedArguments(new URLSearchParams()).get('page');

    expect(updatedPage).toBe('4');
  });
});
