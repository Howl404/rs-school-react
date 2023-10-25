import MainPage from 'src/pages/MainPage/MainPage';
import DetailedPage from 'src/pages/DetailedPage/DetailedPage';

const pages = {
  mainPage: {
    path: '/',
    element: <MainPage />,
  },
  detailedPage: {
    path: '',
    element: <DetailedPage />,
  },
};

export default pages;
