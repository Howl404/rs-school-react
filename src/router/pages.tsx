import MainPage from 'pages/MainPage/MainPage';
import DetailedPage from 'pages/DetailedPage/DetailedPage';
import NotFoundPage from 'pages/NotFoundPage/NotFoundPage';

export const pages = {
  mainPage: {
    path: '/',
    element: <MainPage />,
  },
  detailedPage: {
    path: '',
    element: <DetailedPage />,
  },
  notFoundPage: {
    path: '*',
    element: <NotFoundPage />,
  },
};
