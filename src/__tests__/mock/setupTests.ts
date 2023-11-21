import '@testing-library/jest-dom';
import { cleanup } from '@testing-library/react';
import { beforeAll, afterEach, afterAll, vi } from 'vitest';

import { server } from './server';

import '@testing-library/jest-dom';

export const requests: { url: string }[] = [];

server.events.on('request:start', (req) => {
  requests.push({
    url: req.request.url,
  });
});

beforeAll(() => {
  server.listen();
  vi.mock('next/router', () => require('next-router-mock'));
});

afterEach(() => {
  server.resetHandlers();
  requests.length = 0;
  cleanup();
});

afterAll(() => server.close());
