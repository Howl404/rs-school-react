import { BrowserRouter } from 'react-router-dom';

import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import { expect, it, vi } from 'vitest';
import '@testing-library/jest-dom';

import { SearchTermContext } from 'src/contexts/SearchTermContext';

import Search from 'src/components/search/Search';

class LocalStorageMock {
  store: { [key: string]: string };

  constructor() {
    this.store = {};
  }

  getItem(key: string) {
    return this.store[key] || null;
  }

  setItem(key: string, value: string) {
    this.store[key] = value;
  }

  removeItem(key: string) {
    delete this.store[key];
  }

  clear() {
    this.store = {};
  }

  key(index: number) {
    const keys = Object.keys(this.store);
    return keys[index] || null;
  }

  get length() {
    return Object.keys(this.store).length;
  }
}

const localStorage = new LocalStorageMock();
global.localStorage = localStorage;

const mockSetSearchTerm = vi.fn();

it('Clicking the Search button saves the entered value to local storage', () => {
  render(
    <BrowserRouter>
      <SearchTermContext.Provider
        value={{
          searchTerm: '',
          setSearchTerm: mockSetSearchTerm,
        }}
      >
        <Search />
      </SearchTermContext.Provider>
    </BrowserRouter>
  );

  const inputElement = screen.getByRole('textbox');
  const button = screen.getByText('Search');

  fireEvent.change(inputElement, { target: { value: 'test search' } });

  fireEvent.click(button);

  expect(localStorage.getItem('howl-searchTerm')).toBe('test search');
});

it('Clicking "Enter" saves the entered value to local storage', () => {
  render(
    <BrowserRouter>
      <SearchTermContext.Provider
        value={{
          searchTerm: '',
          setSearchTerm: mockSetSearchTerm,
        }}
      >
        <Search />
      </SearchTermContext.Provider>
    </BrowserRouter>
  );

  const inputElement = screen.getByRole('textbox');

  fireEvent.change(inputElement, { target: { value: 'test enter' } });

  fireEvent.focus(inputElement);

  fireEvent.keyDown(inputElement, { key: 'Enter' });

  expect(localStorage.getItem('howl-searchTerm')).toBe('test enter');
});

it('Component retrieves the value from local storage upon mounting', () => {
  render(
    <BrowserRouter>
      <SearchTermContext.Provider
        value={{
          searchTerm: '',
          setSearchTerm: mockSetSearchTerm,
        }}
      >
        <Search />
      </SearchTermContext.Provider>
    </BrowserRouter>
  );

  const inputElement = screen.getByRole('textbox') as HTMLInputElement;

  waitFor(() => {
    expect(inputElement.value).toBe('test search');
    expect(mockSetSearchTerm).toHaveBeenCalledWith('test search');
  });
});
