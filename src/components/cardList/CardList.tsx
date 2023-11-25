import { Product } from 'src/interfaces/product';

import styles from './CardList.module.scss';
import Card from 'components/card/Card';

type CardListProps = { data?: Product[]; setSelected: any };

export default function CardList({ data = [], setSelected }: CardListProps) {
  if (!data.length) {
    return (
      <div className={styles.container}>
        <h2>Nothing is found</h2>
      </div>
    );
  }

  return (
    <>
      <div
        className={styles.container}
        data-testid="card-container"
        role="list"
      >
        {data.map((product) => (
          <Card
            product={product}
            key={product.id}
            onClick={() => setSelected(product.id)}
          />
        ))}
      </div>
    </>
  );
}
