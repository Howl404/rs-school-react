import { useEffect } from 'react';
import { Outlet, useSearchParams } from 'react-router-dom';

import { cls } from 'src/utils/cls';
import useItems from 'src/hooks/useItems';

import LoadingSpinner from 'src/components/spinner/Spinner';
import Pagination from 'components/pagination/Pagination';
import CardList from 'components/cardList/CardList';

import styles from 'components/Results/Results.module.scss';

const defaultParams = [
  { key: 'page', value: '1' },
  { key: 'perPage', value: '10' },
];

interface ResultsProps {
  searchTerm: string;
}

export default function Results({ searchTerm }: ResultsProps) {
  const [searchParams, setSearchParams] = useSearchParams();

  const page = Number(searchParams.get('page') || 1);
  const perPage = searchParams.get('perPage') || '10';
  const productId = searchParams.get('productId');

  const { products, isLoading } = useItems({ page, searchTerm, perPage });

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
      return <LoadingSpinner />;
    }
    return <CardList products={products} setSearchParams={setSearchParams} />;
  };

  return (
    <div className={cls(productId && styles.wrapper)}>
      {content()}
      {productId && <Outlet />}
      <Pagination
        setSearchParams={setSearchParams}
        page={page}
        perPage={perPage}
      />
    </div>
  );
}
