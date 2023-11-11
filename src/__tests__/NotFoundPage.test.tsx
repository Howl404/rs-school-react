import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import Router from 'src/router/Router';
import { expect, it } from 'vitest';

import { store } from 'store/store';

it('Ensure that the 404 page is displayed when navigating to an invalid route', () => {
  render(
    <MemoryRouter initialEntries={['/not-existing-route']}>
      <Provider store={store}>
        <Router />
      </Provider>
    </MemoryRouter>
  );

  const notFoundElement = screen.getByText('Page is not found');

  expect(notFoundElement).toBeInTheDocument();
});
