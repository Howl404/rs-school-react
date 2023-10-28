import styles from 'components/cardList/CardList.module.scss';
import Card from 'components/card/Card';
import { SetURLSearchParams } from 'react-router-dom';
import { ProductsContext } from 'src/contexts/ProductsContext';
import { useContext } from 'react';

type CardListProps = {
  setSearchParams: SetURLSearchParams;
};

function CardList(props: CardListProps) {
  const { setSearchParams } = props;
  const { products } = useContext(ProductsContext);

  if (products.length === 0) {
    return (
      <div className={styles.container}>
        <p>No cards are present</p>
      </div>
    );
  }

  return (
    <div
      className={styles.container}
      data-testid="card-container"
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
