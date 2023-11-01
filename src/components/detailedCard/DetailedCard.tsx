import { useSearchParams } from 'react-router-dom';

import { CardProps } from 'src/components/card/Card';

import styles from 'src/components/detailedCard/DetailedCard.module.scss';

export default function DetailedCard(props: CardProps): JSX.Element {
  const { description, name, image_url, first_brewed } = props.product;
  const [, setSearchParams] = useSearchParams();

  const closeDetailedPage = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      setSearchParams((searchParams) => {
        searchParams.delete('productId');
        return searchParams;
      });
    }
  };

  return (
    <div className={styles.detailedCard}>
      <button className={styles.closeButton} onClick={closeDetailedPage}>
        close
      </button>
      <h3 className={styles.cardHeading}>{name}</h3>
      <img src={image_url} alt={`${name} image`} className={styles.cardImage} />
      <p className={styles.cardText}>{description}</p>
      <p className={styles.cardText}>{first_brewed}</p>
    </div>
  );
}
