import MainPage from 'src/pages/MainPage/MainPage';
import DetailedPage from 'src/pages/DetailedPage/DetailedPage';

export const pages = {
  mainPage: {
    path: '/',
    element: <MainPage />,
  },
  detailedPage: {
    path: '',
    element: <DetailedPage />,
  },
};
