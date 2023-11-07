import { useContext } from 'react';
import { useSearchParams } from 'react-router-dom';

import useItem from 'hooks/useItem';

import { DetailedProductContext } from 'contexts/DetailedProductContext';

import Spinner from 'components/spinner/Spinner';
import DetailedCard from 'components/detailedCard/DetailedCard';

import styles from './DetailedPage.module.scss';

export default function DetailedPage() {
  const [, setSearchParams] = useSearchParams();

  const { detailedProductId, setDetailedProductId } = useContext(
    DetailedProductContext
  );

  const { product, isLoading } = useItem(detailedProductId);

  const closeDetailedPage = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      setSearchParams((prevParams) => {
        prevParams.delete('productId');
        return prevParams;
      });
      setDetailedProductId('');
    }
  };

  if (!detailedProductId) {
    return <h2>Product Id is not provided</h2>;
  }

  return (
    <div className={styles.container} onClick={closeDetailedPage}>
      {isLoading ? (
        <Spinner />
      ) : (
        product && (
          <DetailedCard
            product={product}
            closeDetailedPage={closeDetailedPage}
          />
        )
      )}
    </div>
  );
}
