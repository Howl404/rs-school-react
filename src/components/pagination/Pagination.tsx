import { useSearchParams } from 'react-router-dom';
import styles from 'src/components/pagination/Pagination.module.scss';

interface PaginationProps {
  page: number;
}

function Pagination(props: PaginationProps) {
  const { page } = props;
  const [, setSearchParams] = useSearchParams();

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
