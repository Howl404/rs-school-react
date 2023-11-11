import { useDispatch, useSelector } from 'react-redux';

import { setPage, setPerPage } from 'store/search/searchSlice';
import { AppDispatch, RootState } from 'store/store';

import styles from './Pagination.module.scss';

const perPageOptions = [5, 10, 15];

export default function Pagination() {
  const page = useSelector((state: RootState) => state.search.page);
  const perPage = useSelector((state: RootState) => state.search.perPage);

  const dispatch = useDispatch<AppDispatch>();

  const isFirstPage = page === 1;

  const changePage = (page: number) => {
    dispatch(setPage(page));
  };

  const nextPage = () => {
    changePage(page + 1);
  };

  const previousPage = () => {
    changePage(page - 1);
  };

  const handlePerPageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    changePage(1);
    dispatch(setPerPage(event.target.value));
  };

  return (
    <>
      <div className={styles.paginationContainer}>
        <button onClick={previousPage} disabled={isFirstPage} type="button">
          &#5176;
        </button>
        <p>{page}</p>
        <button onClick={nextPage} type="button">
          &#5171;
        </button>
        <select onChange={handlePerPageChange} value={perPage}>
          {perPageOptions.map((option) => (
            <option key={option} value={option}>
              {option} items per page
            </option>
          ))}
        </select>
      </div>
    </>
  );
}
