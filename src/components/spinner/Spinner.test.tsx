import { render, screen } from '@testing-library/react';
import Spinner from 'src/components/spinner/Spinner';
import { expect, it } from 'vitest';
import '@testing-library/jest-dom';

it('Renders the Spinner component', () => {
  render(<Spinner />);
  const spinnerContainer = screen.getByTestId('loading-spinner-container');
  expect(spinnerContainer).toBeInTheDocument();

  const svgElement = screen.getByTestId('loading-spinner-svg');
  expect(svgElement).toBeInTheDocument();
});
