import { Product } from 'src/interfaces/product';

import styles from 'src/components/detailedCard/DetailedCard.module.scss';

interface DetailedCardProps {
  product: Product;
  closeDetailedPage: (e: React.MouseEvent) => void;
}

export default function DetailedCard({
  product: { description, tagline, name, image_url, first_brewed },
  closeDetailedPage,
}: DetailedCardProps): JSX.Element {
  return (
    <div className={styles.detailedCard}>
      <button className={styles.closeButton} onClick={closeDetailedPage}>
        close
      </button>
      <h3 className={styles.cardHeading}>{name}</h3>
      <img src={image_url} alt={`${name} image`} className={styles.cardImage} />
      <p className={styles.cardText}>{tagline}</p>
      <p className={styles.cardText}>{description}</p>
      <p className={styles.cardText}>{first_brewed}</p>
    </div>
  );
}
