import styles from 'components/cardList/CardList.module.scss';
import Card from 'components/card/Card';
import { useSearchParams } from 'react-router-dom';
import { ProductsContext } from 'src/contexts/ProductsContext';
import { useContext } from 'react';

function CardList() {
  const [, setSearchParams] = useSearchParams();
  const { products } = useContext(ProductsContext);
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
