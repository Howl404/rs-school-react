import { useRoutes } from 'react-router-dom';

import { MainPage, UncontrolledFormPage, HookFormPage } from 'pages/index';

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
    {
      path: '/hookform',
      element: <HookFormPage />,
    },
  ]);
}
