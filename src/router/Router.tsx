import { Route, Routes } from 'react-router-dom';
import pages from 'src/router/pages';

export const Router = () => {
  return (
    <Routes>
      <Route path={pages.mainPage.path} element={pages.mainPage.element}>
        <Route
          path={pages.detailedPage.path}
          element={pages.detailedPage.element}
        />
      </Route>
    </Routes>
  );
};
