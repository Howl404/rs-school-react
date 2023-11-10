import { useSelector, useDispatch } from 'react-redux';
import { useGetItemQuery } from 'src/store/api/api';
import {
  setDetailedProductId,
  setViewMode,
} from 'src/store/products/productsSlice';
import { RootState, AppDispatch } from 'src/store/store';

import DetailedCard from 'components/detailedCard/DetailedCard';
import Spinner from 'components/spinner/Spinner';

import styles from './DetailedPage.module.scss';

export default function DetailedPage() {
  const detailedProductId = useSelector(
    (state: RootState) => state.products.detailedProductId
  );

  const detailsPageIsLoading = useSelector(
    (state: RootState) => state.loading.detailsPageIsLoading
  );

  const dispatch = useDispatch<AppDispatch>();

  const { data } = useGetItemQuery(detailedProductId);

  const closeDetailedPage = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      dispatch(setDetailedProductId(''));
      dispatch(setViewMode(false));
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
