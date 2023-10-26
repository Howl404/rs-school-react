import { useSearchParams } from 'react-router-dom';
import styles from 'components/card/Card.module.scss';
import { Product } from 'components/results/Results';

export interface CardProps {
  product: Product;
}

function Card(props: CardProps): JSX.Element {
  const { id, tagline, name, image_url } = props.product;
  const [, setSearchParams] = useSearchParams();

  return (
    <div
      key={id}
      className={styles.card}
      onClick={() => {
        setSearchParams((searchParams) => {
          searchParams.set('productId', id.toString());
          return searchParams;
        });
      }}
    >
      <h3 className={styles.card_header}>{name}</h3>
      <img
        src={image_url}
        alt={`${name} image`}
        className={styles.card_image}
      />
      <p className={styles.card_description}>{tagline}</p>
    </div>
  );
}

export default Card;
