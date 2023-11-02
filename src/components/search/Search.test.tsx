import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import Search from 'src/components/search/Search';
import { afterEach, expect, it, vi } from 'vitest';
import '@testing-library/jest-dom';
import { SearchTermContext } from 'src/contexts/SearchTermContext';
import { BrowserRouter } from 'react-router-dom';

class LocalStorageMock {
  store: { [key: string]: string };

  constructor() {
    this.store = {};
  }

  getItem(key: string) {
    return this.store[key] || null;
  }

  setItem(key: string, value: string) {
    this.store[key] = value.toString();
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
it('Clicking the Search button saves the entered value to local storage', () => {
  const mockSetSearchTerm = vi.fn();
  const setItemSpy = vi.spyOn(localStorage, 'setItem');

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

  expect(setItemSpy).toHaveBeenCalledWith('howl-searchTerm', 'test search');
});

it('Component retrieves the value from local storage upon mounting', () => {
  const mockSetSearchTerm = vi.fn();

  localStorage.setItem('howl-searchTerm', 'test search');

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

afterEach(() => {
  vi.clearAllMocks();
});
