import React, { useContext } from 'react';

import { ProductsContext } from 'src/contexts/ProductsContext';
import { SearchParamsContext } from 'src/contexts/SearchParamsContext';

import Card from 'components/card/Card';

import styles from 'components/cardList/CardList.module.scss';

export default function CardList() {
  const { products } = useContext(ProductsContext);
  const { setSearchParams } = useContext(SearchParamsContext);

  const closeDetailedPage = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      setSearchParams((searchParams) => {
        searchParams.delete('productId');
        return searchParams;
      });
    }
  };

  if (!products.length) {
    return (
      <div className={styles.container}>
        <h2>Nothing is found</h2>
      </div>
    );
  }

  return (
    <div
      className={styles.container}
      onClick={closeDetailedPage}
      data-testid="card-container"
    >
      {products.map((product) => (
        <Card product={product} key={product.id} />
      ))}
    </div>
  );
}
