import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { expect, it, vi } from 'vitest';

import { store } from 'store/store';

import Search from 'components/search/Search';

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
      <Provider store={store}>
        <Search />
      </Provider>
    </BrowserRouter>
  );

  const inputElement = screen.getByRole('textbox');
  const button = screen.getByText('Search');

  fireEvent.change(inputElement, { target: { value: 'test search' } });

  fireEvent.click(button);

  expect(localStorage.getItem('howl-searchTerm')).toBe('test search');
});

it('Component retrieves the value from local storage upon mounting', () => {
  render(
    <BrowserRouter>
      <Provider store={store}>
        <Search />
      </Provider>
    </BrowserRouter>
  );

  const inputElement = screen.getByRole('textbox') as HTMLInputElement;

  waitFor(() => {
    expect(inputElement.value).toBe('test search');
    expect(mockSetSearchTerm).toHaveBeenCalledWith('test search');
  });
});

it('Clicking "Enter" saves the entered value to local storage', () => {
  render(
    <BrowserRouter>
      <Provider store={store}>
        <Search />
      </Provider>
    </BrowserRouter>
  );

  const inputElement = screen.getByRole('textbox');

  fireEvent.change(inputElement, { target: { value: 'test enter' } });

  fireEvent.focus(inputElement);

  fireEvent.keyDown(inputElement, { key: 'Enter' });

  expect(localStorage.getItem('howl-searchTerm')).toBe('test enter');
});
