import { useState } from 'react';
import { BrowserRouter } from 'react-router-dom';

import { fireEvent, render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import '@testing-library/jest-dom';

import Pagination from 'src/components/pagination/Pagination';

let page: number;
const perPage = '5';
let mockSearchParam: string;

beforeEach(() => {
  page = 2;

  mockSearchParam = `page=${page}&perPage=${perPage}`;

  vi.mock('react-router-dom', async () => {
    const actual: object = await vi.importActual('react-router-dom');
    return {
      ...actual,
      useSearchParams: () => {
        const [params, setParams] = useState(
          new URLSearchParams(mockSearchParam)
        );

        return [
          params,
          (fn: (searchParams: URLSearchParams) => URLSearchParams) => {
            const newParams = fn(params);
            setParams(newParams);
            mockSearchParam = newParams.toString();
          },
        ];
      },
    };
  });
});

describe('Make sure the component updates URL query parameter when page changes', () => {
  it('When next page button is clicked', () => {
    render(
      <BrowserRouter>
        <Pagination page={page} perPage={perPage} />
      </BrowserRouter>
    );

    const nextButton = screen.getByText('ᐳ');

    expect(mockSearchParam).toContain(`page=${page}`);

    fireEvent.click(nextButton);

    expect(mockSearchParam).toContain(`page=${page + 1}`);
  });

  it('When previous page button is clicked', () => {
    render(
      <BrowserRouter>
        <Pagination page={page} perPage={perPage} />
      </BrowserRouter>
    );

    const prevButton = screen.getByText('ᐸ');

    expect(mockSearchParam).toContain(`page=${page}`);

    fireEvent.click(prevButton);

    expect(mockSearchParam).toContain(`page=${page - 1}`);
  });
});
