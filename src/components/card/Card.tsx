import styles from 'components/card/Card.module.scss';
import { Product } from 'components/results/Results';
import { useContext } from 'react';
import { SearchParamsContext } from 'src/contexts/SearchParamsContext';

export type CardProps = {
  product: Product;
};

function Card(props: CardProps): JSX.Element {
  const { id, tagline, name, image_url } = props.product;
  const { setSearchParams } = useContext(SearchParamsContext);

  return (
    <div
      key={id}
      className={styles.card}
      data-testid="card"
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
