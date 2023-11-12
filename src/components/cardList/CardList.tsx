import { Product } from 'src/interfaces/product';

import Card from 'components/card/Card';

import styles from './CardList.module.scss';

export default function CardList({ data = [] }: { data: Product[] }) {
  if (!data.length) {
    return (
      <div className={styles.container}>
        <h2>Nothing is found</h2>
      </div>
    );
  }

  return (
    <div className={styles.container} data-testid="card-container" role="list">
      {data.map((product) => (
        <Card product={product} key={product.id} />
      ))}
    </div>
  );
}
