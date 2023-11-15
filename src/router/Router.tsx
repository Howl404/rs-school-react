import { useRoutes } from 'react-router-dom';

import MainPage from 'pages/MainPage';
import UncontrolledFormPage from 'pages/UncontrolledFormPage';

export default function Router() {
  return useRoutes([
    {
      path: '/',
      element: <MainPage />,
    },
    {
      path: '/uncontrolled',
      element: <UncontrolledFormPage />,
    },
  ]);
}
