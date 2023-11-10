import { useContext } from 'react';
import { useSearchParams } from 'react-router-dom';

import { DetailedProductContext } from 'contexts/DetailedProductContext';

import { Product } from 'src/interfaces/product';

import styles from './Card.module.scss';

export type CardProps = {
  product: Product;
};

export default function Card({
  product: { id, tagline, name, image_url },
}: CardProps): JSX.Element {
  const [, setSearchParams] = useSearchParams();

  const { setDetailedProductId } = useContext(DetailedProductContext);

  const openDetailedPage = () => {
    setSearchParams((searchParams) => {
      searchParams.set('productId', id.toString());
      return searchParams;
    });
    setDetailedProductId(id.toString());
  };

  return (
    <button
      className={styles.card}
      onClick={openDetailedPage}
      data-testid="card"
      role="listitem"
      type="button"
    >
      <h3 className={styles.cardHeading}>{name}</h3>
      <img src={image_url} alt={`${name} image`} className={styles.cardImage} />
      <p className={styles.cardText}>{tagline}</p>
    </button>
  );
}
