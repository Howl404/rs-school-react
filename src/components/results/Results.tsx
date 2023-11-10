import { useContext } from 'react';
import { Outlet } from 'react-router-dom';

import { cls } from 'src/utils/cls';

import { DetailedProductContext } from 'contexts/DetailedProductContext';

import useItems from 'hooks/useItems';

import CardList from 'components/cardList/CardList';
import Pagination from 'components/pagination/Pagination';
import Spinner from 'components/spinner/Spinner';

import styles from './Results.module.scss';

export default function Results() {
  const { detailedProductId } = useContext(DetailedProductContext);
  const { isLoading } = useItems();

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
      <Pagination />
    </div>
  );
}
