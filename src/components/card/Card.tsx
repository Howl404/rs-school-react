import { productsActions } from 'store/products/productsSlice';
import { useAppDispatch } from 'store/store';

import { Product } from 'src/interfaces/product';

import styles from './Card.module.scss';

export type CardProps = {
  product: Product;
};

export default function Card({
  product: { id, tagline, name, image_url },
}: CardProps): JSX.Element {
  const dispatch = useAppDispatch();

  const openDetailedPage = () => {
    dispatch(productsActions.setDetailedProductId(id.toString()));
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
