import { Outlet, useSearchParams } from 'react-router-dom';

import { cls } from 'src/utils/cls';
import useItems from 'src/hooks/useItems';
import useDefaultParams from 'src/hooks/useDefaultParams';

import Spinner from 'src/components/spinner/Spinner';
import Pagination from 'components/pagination/Pagination';
import CardList from 'components/cardList/CardList';

import styles from 'components/Results/Results.module.scss';

interface ResultsProps {
  searchTerm: string;
}

export default function Results({ searchTerm }: ResultsProps) {
  const [searchParams, setSearchParams] = useSearchParams();

  const { page, perPage } = useDefaultParams();

  const productId = searchParams.get('productId');

  const { products, isLoading } = useItems({ page, searchTerm, perPage });

  const content = () => {
    if (isLoading) {
      return <Spinner />;
    }
    return (
      <>
        <CardList products={products} setSearchParams={setSearchParams} />
        <Pagination
          setSearchParams={setSearchParams}
          page={page}
          perPage={perPage}
        />
      </>
    );
  };

  return (
    <div className={cls(productId && styles.wrapper)}>
      {content()}
      {productId && <Outlet />}
    </div>
  );
}
