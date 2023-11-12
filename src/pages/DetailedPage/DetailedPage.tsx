import { useSelector } from 'react-redux';

import { apiService } from 'store/api/api';
import { productsActions } from 'store/products/productsSlice';
import {
  selectDetailedProductId,
  selectDetailsPageIsLoading,
} from 'store/selectors';
import { useAppDispatch } from 'store/store';

import DetailedCard from 'components/detailedCard/DetailedCard';
import Spinner from 'components/spinner/Spinner';

import styles from './DetailedPage.module.scss';

export default function DetailedPage() {
  const detailedProductId = useSelector(selectDetailedProductId);

  const detailsPageIsLoading = useSelector(selectDetailsPageIsLoading);

  const dispatch = useAppDispatch();

  const { data: product } = apiService.useGetItemQuery(detailedProductId);

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
