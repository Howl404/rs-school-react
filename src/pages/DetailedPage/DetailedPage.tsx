import { apiService } from 'store/api/api';
import { productsActions } from 'store/products/productsSlice';
import { useAppDispatch, useAppSelector } from 'store/store';

import DetailedCard from 'components/detailedCard/DetailedCard';
import Spinner from 'components/spinner/Spinner';

import styles from './DetailedPage.module.scss';

export default function DetailedPage() {
  const detailedProductId = useAppSelector(
    (state) => state.products.detailedProductId
  );

  const detailsPageIsLoading = useAppSelector(
    (state) => state.loading.detailsPageIsLoading
  );

  const dispatch = useAppDispatch();

  const { data } = apiService.useGetItemQuery(detailedProductId);

  const closeDetailedPage = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      dispatch(productsActions.setDetailedProductId(''));
      dispatch(productsActions.setViewMode(false));
    }
  };

  if (!detailedProductId) {
    return <h2>Product Id is not provided</h2>;
  }

  return (
    <div className={styles.container} onClick={closeDetailedPage}>
      {detailsPageIsLoading ? (
        <Spinner />
      ) : (
        data && (
          <DetailedCard
            product={data[0]}
            closeDetailedPage={closeDetailedPage}
          />
        )
      )}
    </div>
  );
}
