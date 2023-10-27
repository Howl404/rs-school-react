import { useSearchParams } from 'react-router-dom';
import styles from 'src/components/detailedCard/DetailedCard.module.scss';
import { CardProps } from 'src/components/card/Card';

function DetailedCard(props: CardProps): JSX.Element {
  const { id, description, name, image_url, first_brewed } = props.product;
  const [, setSearchParams] = useSearchParams();

  return (
    <div key={id} className={styles.detailedCard}>
      <button
        className={styles.button}
        onClick={() => {
          setSearchParams((searchParams) => {
            searchParams.delete('productId');
            return searchParams;
          });
        }}
      >
        close
      </button>
      <h3 className={styles.card_header}>{name}</h3>
      <img
        src={image_url}
        alt={`${name} image`}
        className={styles.card_image}
      />
      <p className={styles.card_description}>{description}</p>
      <p className={styles.card_description}>{first_brewed}</p>
    </div>
  );
}

export default DetailedCard;
