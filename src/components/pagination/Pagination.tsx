import { SetURLSearchParams } from 'react-router-dom';

import styles from 'src/components/pagination/Pagination.module.scss';

interface PaginationProps {
  setSearchParams: SetURLSearchParams;
  page: number;
  perPage: string;
}

export default function Pagination(props: PaginationProps) {
  const { setSearchParams, page, perPage } = props;

  const isFirstPage = page === 1;

  const amountPerPage = (perPage: string) => {
    changePage(1);
    setSearchParams((searchParams) => {
      searchParams.set('perPage', perPage);
      return searchParams;
    });
  };

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
    amountPerPage(event.target.value);
  };

  return (
    <>
      <div className={styles.paginationContainer}>
        <button onClick={previousPage} disabled={isFirstPage}>
          {'<'}
        </button>
        <p>{page}</p>
        <button onClick={nextPage}>{'>'}</button>
        <select onChange={handlePerPageChange} defaultValue={perPage}>
          <option value="5">5 items per page</option>
          <option value="10">10 items per page</option>
          <option value="15">15 items per page</option>
        </select>
      </div>
    </>
  );
}
