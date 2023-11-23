import Image from 'next/image';
import { useRouter } from 'next/router';

import { Product } from 'src/interfaces/product';

import styles from './DetailedCard.module.scss';

interface DetailedCardProps {
  product: Product;
}

export default function DetailedCard({
  product: { description, tagline, name, image_url, first_brewed },
}: DetailedCardProps): JSX.Element {
  const router = useRouter();

  const closeDetailedPage = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      delete router.query.id;
      router.push({
        pathname: '/',
        query: { ...router.query },
      });
    }
  };
  return (
    <div className={styles.container} onClick={closeDetailedPage}>
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
        <Image
          src={image_url}
          alt={`${name} image`}
          className={styles.cardImage}
          height={0}
          width={300}
        />
        <p className={styles.cardText}>{tagline}</p>
        <p className={styles.cardText}>{description}</p>
        <p className={styles.cardText}>{first_brewed}</p>
      </div>
    </div>
  );
}
