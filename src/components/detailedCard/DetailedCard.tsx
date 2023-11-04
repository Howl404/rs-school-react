import { useContext } from 'react';
import { useSearchParams } from 'react-router-dom';

import { CardProps } from 'src/components/card/Card';

import styles from 'src/components/detailedCard/DetailedCard.module.scss';
import { DetailedProductContext } from 'src/contexts/DetailedProductContext';

export default function DetailedCard({
  product: { description, name, image_url, first_brewed },
}: CardProps): JSX.Element {
  const [, setSearchParams] = useSearchParams();

  const { setDetailedProductId } = useContext(DetailedProductContext);

  const closeDetailedPage = () => {
    setSearchParams((searchParams) => {
      searchParams.delete('productId');
      return searchParams;
    });
    setDetailedProductId('');
  };

  return (
    <div className={styles.detailedCard} data-testid="detailed-card">
      <button
        className={styles.closeButton}
        onClick={closeDetailedPage}
        data-testid="close-button"
      >
        close
      </button>
      <h3 className={styles.cardHeading}>{name}</h3>
      <img src={image_url} alt={`${name} image`} className={styles.cardImage} />
      <p className={styles.cardText}>{description}</p>
      <p className={styles.cardText}>{first_brewed}</p>
    </div>
  );
}
