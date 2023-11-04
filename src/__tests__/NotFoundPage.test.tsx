import Router from 'src/router/Router';
import { MemoryRouter } from 'react-router-dom';

import { render, screen } from '@testing-library/react';
import { expect, it } from 'vitest';
import '@testing-library/jest-dom';

it('Ensure that the 404 page is displayed when navigating to an invalid route', () => {
  render(
    <MemoryRouter initialEntries={['/not-existing-route']}>
      <Router />
    </MemoryRouter>
  );

  const notFoundElement = screen.getByText('Page is not found');

  expect(notFoundElement).toBeInTheDocument();
});
