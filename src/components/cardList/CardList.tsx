import React, { useContext } from 'react';

import { ProductsContext } from 'contexts/ProductsContext';

import Card from 'components/card/Card';

import styles from './CardList.module.scss';

export default function CardList() {
  const { products } = useContext(ProductsContext);

  if (!products.length) {
    return (
      <div className={styles.container}>
        <h2>Nothing is found</h2>
      </div>
    );
  }

  return (
    <div className={styles.container} data-testid="card-container" role="list">
      {products.map((product) => (
        <Card product={product} key={product.id} />
      ))}
    </div>
  );
}
