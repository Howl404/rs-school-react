import { useContext } from 'react';
import { Outlet } from 'react-router-dom';

import { cls } from 'src/utils/cls';

import { DetailedProductContext } from 'contexts/DetailedProductContext';

import useItems from 'hooks/useItems';
import useDefaultParams from 'hooks/useDefaultParams';

import Spinner from 'components/spinner/Spinner';
import Pagination from 'components/pagination/Pagination';
import CardList from 'components/cardList/CardList';

import styles from './Results.module.scss';

export default function Results() {
  const { detailedProductId } = useContext(DetailedProductContext);
  const { page, perPage } = useDefaultParams();
  const { isLoading } = useItems({ page, perPage });

  const content = () => {
    if (isLoading) {
      return <Spinner />;
    }
    return <CardList />;
  };

  return (
    <div className={cls(detailedProductId && styles.wrapper)}>
      {content()}
      {detailedProductId && <Outlet />}
      <Pagination page={page} perPage={perPage} />
    </div>
  );
}
