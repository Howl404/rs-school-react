import { Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { RootState } from 'src/store/store';
import { useGetItemsQuery } from 'src/store/api/api';

import { cls } from 'src/utils/cls';

import Spinner from 'components/spinner/Spinner';
import Pagination from 'components/pagination/Pagination';
import CardList from 'components/cardList/CardList';

import styles from './Results.module.scss';

export default function Results() {
  const viewMode = useSelector((state: RootState) => state.products.viewMode);

  const page = useSelector((state: RootState) => state.search.page);
  const perPage = useSelector((state: RootState) => state.search.perPage);
  const searchTerm = useSelector((state: RootState) => state.search.searchTerm);

  const { data } = useGetItemsQuery({
    searchTerm,
    page,
    perPage,
  });

  const isLoading = useSelector(
    (state: RootState) => state.loading.mainPageIsLoading
  );

  const content = () => {
    if (isLoading) {
      return <Spinner />;
    }
    return data && <CardList data={data} />;
  };

  return (
    <div className={cls(viewMode && styles.wrapper)}>
      {content()}
      {viewMode && <Outlet />}
      <Pagination />
    </div>
  );
}
