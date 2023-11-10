import { useDispatch } from 'react-redux';

import { Product } from 'src/interfaces/product';

import { AppDispatch } from 'src/store/store';
import {
  setDetailedProductId,
  setViewMode,
} from 'src/store/products/productsSlice';

import styles from './Card.module.scss';

export type CardProps = {
  product: Product;
};

export default function Card({
  product: { id, tagline, name, image_url },
}: CardProps): JSX.Element {
  const dispatch = useDispatch<AppDispatch>();

  const openDetailedPage = () => {
    dispatch(setDetailedProductId(id.toString()));
    dispatch(setViewMode(true));
  };

  return (
    <div
      className={styles.card}
      onClick={openDetailedPage}
      data-testid="card"
      role="listitem"
    >
      <h3 className={styles.cardHeading}>{name}</h3>
      <img src={image_url} alt={`${name} image`} className={styles.cardImage} />
      <p className={styles.cardText}>{tagline}</p>
    </div>
  );
}
