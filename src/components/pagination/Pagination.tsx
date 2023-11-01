import { SetURLSearchParams } from 'react-router-dom';

import styles from 'src/components/pagination/Pagination.module.scss';

interface PaginationProps {
  setSearchParams: SetURLSearchParams;
  page: number;
}

export default function Pagination(props: PaginationProps) {
  const { setSearchParams, page } = props;

  const isFirstPage = page === 1;

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

  return (
    <div className={styles.paginationContainer}>
      <button onClick={previousPage} disabled={isFirstPage}>
        {'<'}
      </button>
      <p>{page}</p>
      <button onClick={nextPage}>{'>'}</button>
    </div>
  );
}
