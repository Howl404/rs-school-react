import { useRoutes } from 'react-router-dom';

import { HookFormPage } from 'pages/HookFormPage';
import { MainPage } from 'pages/MainPage';
import { UncontrolledFormPage } from 'pages/UncontrolledFormPage';

export enum Routes {
  Home = '/',
  UncontrolledForm = '/uncontrolled',
  HookForm = '/hookform',
}

export default function Router() {
  return useRoutes([
    {
      path: Routes.Home,
      element: <MainPage />,
    },
    {
      path: Routes.UncontrolledForm,
      element: <UncontrolledFormPage />,
    },
    {
      path: Routes.HookForm,
      element: <HookFormPage />,
    },
  ]);
}
