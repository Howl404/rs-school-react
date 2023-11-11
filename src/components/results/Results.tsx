import { useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';

import { cls } from 'utils/cls';

import { useGetItemsQuery } from 'store/api/api';
import { RootState } from 'store/store';

import useSavedParams from 'hooks/useSavedParams';

import CardList from 'components/cardList/CardList';
import Pagination from 'components/pagination/Pagination';
import Spinner from 'components/spinner/Spinner';

import styles from './Results.module.scss';

export default function Results() {
  const viewMode = useSelector((state: RootState) => state.products.viewMode);

  const { page, perPage, searchTerm } = useSavedParams();

  const { data } = useGetItemsQuery({
    searchTerm,
    page,
    perPage,
  });

  const mainPageIsLoading = useSelector(
    (state: RootState) => state.loading.mainPageIsLoading
  );

  const content = () => {
    if (mainPageIsLoading) {
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
