import Image from 'next/image';
import React from 'react';

import { Product } from 'src/interfaces/product';

import styles from './Card.module.scss';

export type CardProps = {
  product: Product;
  onClick: () => void;
};

function CardComponent({ product, onClick }: CardProps) {
  const { tagline, name, image_url } = product;

  return (
    <button
      className={styles.card}
      data-testid="card"
      role="listitem"
      type="button"
      onClick={onClick}
    >
      <h3 className={styles.cardHeading}>{name}</h3>

      <div style={{ width: '300px', height: '300px' }}>
        {image_url && (
          <Image
            src={image_url} // добавь дефолтную заглушку для всех
            alt={`${name} image`}
            className={styles.cardImage}
            width={200}
            height={300}
          />
        )}
      </div>
      <p className={styles.cardText}>{tagline}</p>
    </button>
  );
}

const Card = React.memo(CardComponent);
export default Card;
