import { useRouter } from 'next/router';
import { ChangeEvent } from 'react';

import styles from './Pagination.module.scss';

const perPageOptions = [5, 10, 15];

type PaginationProps = {
  page: number;
  perPage: number;
};

export default function Pagination({ page, perPage }: PaginationProps) {
  const router = useRouter();

  const isFirstPage = +page === 1;

  const changePage = (page: number) => {
    void router.push({
      pathname: '/',
      query: { ...router.query, page },
    });
  };

  const nextPage = () => {
    changePage(page + 1);
  };

  const previousPage = () => {
    changePage(page - 1);
  };

  const handlePerPageChange = (event: ChangeEvent<HTMLSelectElement>) => {
    void router.push({
      pathname: '/',
      query: { ...router.query, page: 1, perPage: event.target.value },
    });
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
