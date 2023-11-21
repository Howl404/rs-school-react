import { useRouter } from 'next/router';

import styles from './Pagination.module.scss';

const perPageOptions = [5, 10, 15];

export default function Pagination({
  page,
  perPage,
}: {
  page: number;
  perPage: string;
}) {
  const router = useRouter();

  const isFirstPage = Number(page) === 1;

  const changePage = (page: number) => {
    router.push({
      pathname: '/',
      query: { ...router.query, page },
    });
  };

  const nextPage = () => {
    changePage(Number(page) + 1);
  };

  const previousPage = () => {
    changePage(Number(page) - 1);
  };

  const handlePerPageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    router.push({
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
