import styles from 'src/components/card/Card.module.scss';

interface CardProps {
  result: {
    name: string;
    description: string;
    id: number;
    image_url: string;
  };
}

function Card(props: CardProps): JSX.Element {
  const { id, description, name, image_url } = props.result;

  return (
    <div key={id} className={styles.card}>
      <h3 className={styles.card_header}>{name}</h3>
      <img
        src={image_url}
        alt={`${name} image`}
        className={styles.card_image}
      />
      <p className={styles.card_description}>{description}</p>
    </div>
  );
}

export default Card;
