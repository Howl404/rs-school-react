import { Outlet } from 'react-router-dom';

import { cls } from 'utils/cls';

import { apiService } from 'store/api/api';
import { RootState, useAppSelector } from 'store/store';

import useSavedParams from 'hooks/useSavedParams';

import CardList from 'components/cardList/CardList';
import Pagination from 'components/pagination/Pagination';
import Spinner from 'components/spinner/Spinner';

import styles from './Results.module.scss';

export default function Results() {
  const viewMode = useAppSelector((state) => state.products.viewMode);
  const mainPageIsLoading = useAppSelector(
    (state: RootState) => state.loading.mainPageIsLoading
  );

  const { page, perPage, searchTerm } = useSavedParams();

  const { data } = apiService.useGetItemsQuery({
    searchTerm,
    page,
    perPage,
  });

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
