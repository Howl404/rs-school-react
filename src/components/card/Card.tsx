import Image from 'next/image';
import { useRouter } from 'next/router';

import { Product } from 'src/interfaces/product';

import styles from './Card.module.scss';

export type CardProps = {
  product: Product;
};

export default function Card({
  product: { id, tagline, name, image_url },
}: CardProps): JSX.Element {
  const router = useRouter();

  const openDetailedPage = () => {
    router.push({
      query: { ...router.query, id },
    });
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
      <Image
        src={image_url}
        alt={`${name} image`}
        className={styles.cardImage}
        height={0}
        width={300}
      />
      <p className={styles.cardText}>{tagline}</p>
    </button>
  );
}
