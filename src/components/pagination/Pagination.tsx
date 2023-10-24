import { SetURLSearchParams } from 'react-router-dom';
import styles from 'src/components/pagination/Pagination.module.scss';

interface PaginationProps {
  setSearchParams: SetURLSearchParams;
  page: number;
}

function Pagination(props: PaginationProps) {
  const { setSearchParams, page } = props;

  function previousPage() {
    setSearchParams({ page: (page - 1).toString() });
  }

  function nextPage() {
    setSearchParams({ page: (page + 1).toString() });
  }

  return (
    <div className={styles.container}>
      <button onClick={previousPage} disabled={page === 1}>
        {'<'}
      </button>
      <p>{page}</p>
      <button onClick={nextPage}>{'>'}</button>
    </div>
  );
}

export default Pagination;
