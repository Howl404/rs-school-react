import '@testing-library/jest-dom';
import { cleanup } from '@testing-library/react';
import { beforeAll, afterEach, afterAll } from 'vitest';

import { apiService } from 'store/api/api';
import { store } from 'store/store';

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
});

afterEach(() => {
  server.resetHandlers();
  store.dispatch(apiService.util.resetApiState());
  requests.length = 0;
  cleanup();
});

afterAll(() => server.close());
