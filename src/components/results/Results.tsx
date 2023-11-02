import { useEffect, useContext } from 'react';
import { Outlet } from 'react-router-dom';

import { cls } from 'src/utils/cls';
import useItems from 'src/hooks/useItems';
import { SearchParamsContext } from 'src/contexts/SearchParamsContext';

import Spinner from 'src/components/spinner/Spinner';
import Pagination from 'components/pagination/Pagination';
import CardList from 'components/cardList/CardList';

import styles from 'components/Results/Results.module.scss';

const defaultParams = [
  { key: 'page', value: '1' },
  { key: 'perPage', value: '10' },
];

export type Product = {
  name: string;
  description: string;
  id: number;
  image_url: string;
  tagline: string;
  first_brewed: string;
};

export default function Results() {
  const { searchParams, setSearchParams } = useContext(SearchParamsContext);

  const page = Number(searchParams.get('page') || 1);
  const perPage = searchParams.get('perPage') || '10';
  const productId = searchParams.get('productId');

  const { isLoading } = useItems({ page, perPage });

  useEffect(() => {
    defaultParams.forEach(({ key, value }) => {
      if (!searchParams.get(key)) {
        setSearchParams((searchParams) => {
          searchParams.set(key, value);
          return searchParams;
        });
      }
    });
  }, [searchParams, setSearchParams]);

  const content = () => {
    if (isLoading) {
      return <Spinner />;
    }
    return <CardList />;
  };

  return (
    <div className={cls(productId && styles.wrapper)}>
      {content()}
      {productId && <Outlet />}
      <Pagination page={page} perPage={perPage} />
    </div>
  );
}
