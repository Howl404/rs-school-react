import { render, screen } from '@testing-library/react';
import LoadingSpinner from 'src/components/loadingSpinner/LoadingSpinner';
import { expect, it } from 'vitest';
import '@testing-library/jest-dom';

it('Renders the LoadingSpinner component', () => {
  render(<LoadingSpinner />);
  const spinnerContainer = screen.getByTestId('loading-spinner-container');
  expect(spinnerContainer).toBeInTheDocument();

  const svgElement = screen.getByTestId('loading-spinner-svg');
  expect(svgElement).toBeInTheDocument();
});
