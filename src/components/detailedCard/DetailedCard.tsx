import { Product } from 'src/interfaces/product';

import styles from './DetailedCard.module.scss';

interface DetailedCardProps {
  product: Product;
  closeDetailedPage: (e: React.MouseEvent) => void;
}

export default function DetailedCard({
  product: { description, tagline, name, image_url, first_brewed },
  closeDetailedPage,
}: DetailedCardProps): JSX.Element {
  return (
    <div className={styles.detailedCard} data-testid="detailed-card">
      <button
        type="button"
        className={styles.closeButton}
        onClick={closeDetailedPage}
        data-testid="close-button"
      >
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
