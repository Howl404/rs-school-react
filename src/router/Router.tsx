import { useRoutes } from 'react-router-dom';

import DetailedPage from 'pages/DetailedPage/DetailedPage';
import MainPage from 'pages/MainPage/MainPage';
import NotFoundPage from 'pages/NotFoundPage/NotFoundPage';

export default function Router() {
  return useRoutes([
    {
      path: '/',
      element: <MainPage />,
      children: [
        {
          path: '',
          element: <DetailedPage />,
        },
      ],
    },
    { path: '*', element: <NotFoundPage /> },
  ]);
}
