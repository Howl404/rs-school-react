import { useContext } from 'react';

import { SearchParamsContext } from 'src/contexts/SearchParamsContext';

import styles from 'src/components/pagination/Pagination.module.scss';

interface PaginationProps {
  page: number;
  perPage: string;
}

const perPageOptions = [5, 10, 15];

export default function Pagination({ page, perPage }: PaginationProps) {
  const isFirstPage = page === 1;

  const { setSearchParams } = useContext(SearchParamsContext);

  const changePage = (page: number) => {
    setSearchParams((searchParams) => {
      searchParams.set('page', page.toString());
      return searchParams;
    });
  };

  const nextPage = () => {
    changePage(page + 1);
  };

  const previousPage = () => {
    changePage(page - 1);
  };

  const handlePerPageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    changePage(1);
    setSearchParams((searchParams) => {
      searchParams.set('perPage', event.target.value);
      return searchParams;
    });
  };

  return (
    <>
      <div className={styles.paginationContainer}>
        <button onClick={previousPage} disabled={isFirstPage}>
          &#5176;
        </button>
        <p>{page}</p>
        <button onClick={nextPage}>&#5171;</button>
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
