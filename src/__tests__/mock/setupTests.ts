import '@testing-library/jest-dom';
import { cleanup } from '@testing-library/react';
import { beforeAll, afterEach, afterAll, vi } from 'vitest';

import { server } from './server';

import '@testing-library/jest-dom';

beforeAll(() => {
  server.listen();
  vi.mock('next/router', () => require('next-router-mock'));
});

afterEach(() => {
  server.resetHandlers();
  cleanup();
});

afterAll(() => server.close());
