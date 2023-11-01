import { useSearchParams } from 'react-router-dom';

import { Product } from 'src/interfaces/product';

import styles from 'components/card/Card.module.scss';

export interface CardProps {
  product: Product;
}

export default function Card(props: CardProps): JSX.Element {
  const { id, tagline, name, image_url } = props.product;
  const [, setSearchParams] = useSearchParams();

  const openDetailedPage = () => {
    setSearchParams((searchParams) => {
      searchParams.set('productId', id.toString());
      return searchParams;
    });
  };

  return (
    <div className={styles.card} onClick={openDetailedPage}>
      <h3 className={styles.cardHeading}>{name}</h3>
      <img src={image_url} alt={`${name} image`} className={styles.cardImage} />
      <p className={styles.cardText}>{tagline}</p>
    </div>
  );
}
