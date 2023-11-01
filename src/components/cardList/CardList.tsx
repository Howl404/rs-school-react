import React from 'react';
import { SetURLSearchParams } from 'react-router-dom';

import { Product } from 'src/interfaces/product';

import Card from 'components/card/Card';

import styles from 'components/cardList/CardList.module.scss';

interface CardListProps {
  products: Product[];
  setSearchParams: SetURLSearchParams;
}

export default function CardList(props: CardListProps) {
  const { products, setSearchParams } = props;

  const closeDetailedPage = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      setSearchParams((searchParams) => {
        searchParams.delete('productId');
        return searchParams;
      });
    }
  };

  return (
    <div className={styles.container} onClick={closeDetailedPage}>
      {products.map((product) => (
        <Card product={product} key={product.id} />
      ))}
    </div>
  );
}
