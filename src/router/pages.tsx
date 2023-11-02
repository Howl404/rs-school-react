import MainPage from 'src/pages/MainPage/MainPage';
import DetailedPage from 'src/pages/DetailedPage/DetailedPage';
import NotFoundPage from 'src/pages/NotFoundPage/NotFoundPage';

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
