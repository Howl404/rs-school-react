import Image from 'next/image';

import { Product } from 'src/interfaces/product';

import styles from './DetailedCard.module.scss';

interface DetailedCardProps {
  product: Product;
  closeModal: () => void;
}

export default function DetailedCard({
  product,
  closeModal,
}: DetailedCardProps) {
  const { description, tagline, name, image_url, first_brewed } = product;

  return (
    <div className={styles.container} onClick={closeModal}>
      <div
        className={styles.detailedCard}
        data-testid="detailed-card"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          className={styles.closeButton}
          onClick={closeModal}
          data-testid="close-button"
        >
          close
        </button>
        <h3>{name}</h3>
        <div style={{ width: '300px', height: '300px' }}>
          {image_url && (
            <Image
              src={image_url}
              alt={`${name} image`}
              className={styles.cardImage}
              height={300}
              width={300}
            />
          )}
        </div>
        <p className={styles.cardText}>{tagline}</p>
        <p className={styles.cardText}>{description}</p>
        <p className={styles.cardText}>{first_brewed}</p>
      </div>
    </div>
  );
}
