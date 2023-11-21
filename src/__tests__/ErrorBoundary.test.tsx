import { fireEvent, waitFor, render, screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import ErrorBoundary from 'src/components/errorBoundary/ErrorBoundary';
import MainPage from 'src/pages/MainPage/MainPage';
import { expect, it } from 'vitest';

import { store } from 'store/store';

it('Error boundary catches error', async () => {
  render(
    <BrowserRouter>
      <ErrorBoundary>
        <Provider store={store}>
          <MainPage />
        </Provider>
      </ErrorBoundary>
    </BrowserRouter>
  );

  await act(async () => {});

  const errorButton = screen.getByTestId('error-button');

  fireEvent.click(errorButton);

  await waitFor(() => {
    const textError = screen.getByText('Something went wrong');
    const resetButton = screen.getByText('Reset');

    expect(textError).toBeInTheDocument();
    expect(resetButton).toBeInTheDocument();

    fireEvent.click(resetButton);
  });

  await waitFor(() => {
    const textError = screen.queryByText('Something went wrong');
    const resetButton = screen.queryByText('Reset');

    expect(textError).not.toBeInTheDocument();
    expect(resetButton).not.toBeInTheDocument();
  });
});
