import { useSearchParams } from 'react-router-dom';

import useItem from 'src/hooks/useItem';

import Spinner from 'components/spinner/Spinner';
import DetailedCard from 'components/detailedCard/DetailedCard';

import styles from 'pages/DetailedPage/DetailedPage.module.scss';

export default function DetailedPage() {
  const [searchParams, setSearchParams] = useSearchParams();

  const productId = searchParams.get('productId') || '1';

  const { product, isLoading } = useItem(productId);

  const closeDetailedPage = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      setSearchParams((searchParams) => {
        searchParams.delete('productId');
        return searchParams;
      });
    }
  };

  return (
    <div className={styles.container} onClick={closeDetailedPage}>
      <div></div>
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
