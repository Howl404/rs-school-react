import useItem from 'src/hooks/useItem';

import Spinner from 'components/spinner/Spinner';
import DetailedCard from 'components/detailedCard/DetailedCard';

import styles from 'pages/DetailedPage/DetailedPage.module.scss';

import { DetailedProductContext } from 'src/contexts/DetailedProductContext';
import { useContext } from 'react';

export default function DetailedPage() {
  const { detailedProductId } = useContext(DetailedProductContext);

  const { product, isLoading } = useItem(detailedProductId);

  if (!detailedProductId) {
    return <h2>Product Id is not provided</h2>;
  }

  return (
    <div className={styles.container}>
      {isLoading ? <Spinner /> : product && <DetailedCard product={product} />}
    </div>
  );
}
