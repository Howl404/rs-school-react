import { useContext } from 'react';
import styles from 'src/components/pagination/Pagination.module.scss';
import { SearchParamsContext } from 'src/contexts/SearchParamsContext';

interface PaginationProps {
  page: number;
}

function Pagination(props: PaginationProps) {
  const { page } = props;
  const { setSearchParams } = useContext(SearchParamsContext);

  function changePage(page: number) {
    setSearchParams((searchParams) => {
      searchParams.set('page', page.toString());
      return searchParams;
    });
  }

  return (
    <div className={styles.container}>
      <button
        onClick={() => {
          changePage(page - 1);
        }}
        disabled={page === 1}
      >
        {'<'}
      </button>
      <p>{page}</p>
      <button
        onClick={() => {
          changePage(page + 1);
        }}
      >
        {'>'}
      </button>
    </div>
  );
}

export default Pagination;
