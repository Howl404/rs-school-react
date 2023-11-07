import { render, screen } from '@testing-library/react';
import { expect, it } from 'vitest';
import '@testing-library/jest-dom';

import Spinner from 'components/spinner/Spinner';

it('Renders the Spinner component', () => {
  render(<Spinner />);
  const spinnerContainer = screen.getByTestId('spinner-container');
  expect(spinnerContainer).toBeInTheDocument();
});
