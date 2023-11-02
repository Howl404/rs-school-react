import { useContext } from 'react';

import { SearchParamsContext } from 'src/contexts/SearchParamsContext';
import { Product } from 'src/interfaces/product';

import styles from 'components/card/Card.module.scss';

export type CardProps = {
  product: Product;
};

export default function Card({
  product: { id, tagline, name, image_url },
}: CardProps): JSX.Element {
  const { setSearchParams } = useContext(SearchParamsContext);

  const openDetailedPage = () => {
    setSearchParams((searchParams) => {
      searchParams.set('productId', id.toString());
      return searchParams;
    });
  };

  return (
    <div className={styles.card} onClick={openDetailedPage} data-testid="card">
      <h3 className={styles.cardHeading}>{name}</h3>
      <img src={image_url} alt={`${name} image`} className={styles.cardImage} />
      <p className={styles.cardText}>{tagline}</p>
    </div>
  );
}
