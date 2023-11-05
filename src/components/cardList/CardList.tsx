import React from 'react';
import { SetURLSearchParams } from 'react-router-dom';

import { Product } from 'src/interfaces/product';

import Card from 'components/card/Card';

import styles from 'components/cardList/CardList.module.scss';

interface CardListProps {
  products: Product[];
  setSearchParams: SetURLSearchParams;
}

export default function CardList({ products }: CardListProps) {
  if (!products.length) {
    return (
      <div className={styles.container}>
        <h2>Nothing is found</h2>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      {products.map((product) => (
        <Card product={product} key={product.id} />
      ))}
    </div>
  );
}
