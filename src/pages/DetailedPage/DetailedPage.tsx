import { useSearchParams } from 'react-router-dom';

import useItem from 'src/hooks/useItem';

import Spinner from 'components/spinner/Spinner';
import DetailedCard from 'components/detailedCard/DetailedCard';

import styles from 'pages/DetailedPage/DetailedPage.module.scss';

export default function DetailedPage() {
  const [searchParams] = useSearchParams();
  const productId = searchParams.get('productId') || '1';

  const { product, isLoading } = useItem(productId);

  return (
    <div className={styles.container}>
      {isLoading ? <Spinner /> : product && <DetailedCard product={product} />}
    </div>
  );
}
