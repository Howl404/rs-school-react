import styles from 'components/cardList/CardList.module.scss';
import Card from 'components/card/Card';
import { Product } from 'components/results/Results';
import { SetURLSearchParams } from 'react-router-dom';

interface CardListProps {
  products: Product[];
  setSearchParams: SetURLSearchParams;
}

function CardList(props: CardListProps) {
  const { products, setSearchParams } = props;
  return (
    <div
      className={styles.container}
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          setSearchParams((searchParams) => {
            searchParams.delete('productId');
            return searchParams;
          });
        }
      }}
    >
      {products.map((product) => (
        <Card product={product} key={product.id} />
      ))}
    </div>
  );
}

export default CardList;
