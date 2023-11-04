import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import ErrorBoundary from 'components/errorBoundary/ErrorBoundary';
import Router from 'src/router/Router';

import 'src/main.scss';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ErrorBoundary>
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </ErrorBoundary>
  </React.StrictMode>
);
