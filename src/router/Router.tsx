import { Route, Routes } from 'react-router-dom';
import pages from './pages';

export const Router = () => {
  return (
    <Routes>
      <Route path={pages.mainPage.path} element={pages.mainPage.element} />
    </Routes>
  );
};
