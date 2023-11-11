import { searchActions } from 'store/search/searchSlice';
import { useAppDispatch } from 'store/store';

import useSavedParams from 'hooks/useSavedParams';

import styles from './Pagination.module.scss';

const perPageOptions = [5, 10, 15];

export default function Pagination() {
  const { page, perPage } = useSavedParams();

  const dispatch = useAppDispatch();

  const isFirstPage = page === 1;

  const changePage = (page: number) => {
    dispatch(searchActions.setPage(page));
  };

  const nextPage = () => {
    changePage(page + 1);
  };

  const previousPage = () => {
    changePage(page - 1);
  };

  const handlePerPageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    changePage(1);
    dispatch(searchActions.setPerPage(event.target.value));
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
