import { useCallback, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import LoadingSpinner from 'components/loadingSpinner/LoadingSpinner';
import { Product } from 'components/results/Results';
import { fetchItem } from 'services/apiService';
import styles from 'pages/DetailedPage/DetailedPage.module.scss';
import DetailedCard from 'components/detailedCard/DetailedCard';

function DetailedPage() {
  const [searchParams] = useSearchParams();
  const productId = searchParams.get('productId');

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, isLoading] = useState(false);

  const loadProduct = useCallback(async () => {
    if (productId) {
      isLoading(true);
      const data = await fetchItem(productId);
      setProduct(data);
      isLoading(false);
    }
  }, [productId]);

  useEffect(() => {
    loadProduct();
  }, [loadProduct]);

  return (
    <div className={styles.container}>
      {loading ? (
        <LoadingSpinner />
      ) : product ? (
        <DetailedCard product={product} />
      ) : null}
    </div>
  );
}

export default DetailedPage;
