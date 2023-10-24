import { useCallback, useEffect, useState } from 'react';
import Card from 'src/components/card/Card';
import styles from 'src/components/Results/Results.module.scss';
import LoadingSpinner from 'src/components/loadingSpinner/LoadingSpinner';
import { useSearchParams } from 'react-router-dom';
import Pagination from 'src/components/pagination/Pagination';

interface ResultsProps {
  searchTerm: string | null;
}

type Result = {
  name: string;
  description: string;
  id: number;
  image_url: string;
};

function Results(props: ResultsProps) {
  const { searchTerm } = props;

  const [searchParams, setSearchParams] = useSearchParams();
  const pageQueryParam = searchParams.get('page');
  const page = pageQueryParam ? Number(pageQueryParam) : 1;

  const [results, setResults] = useState<Result[]>([]);
  const [loading, isLoading] = useState(false);

  const fetchResults = useCallback(
    async (searchTerm: string) => {
      let api = `https://api.punkapi.com/v2/beers/?page=${page}&per_page=9`;
      if (searchTerm) {
        api += `&beer_name=${searchTerm}`;
      }

      const response = await fetch(api);
      const data = await response.json();
      setResults(data);
      isLoading(false);
    },
    [page]
  );

  useEffect(() => {
    if (typeof searchTerm === 'string') {
      isLoading(true);
      fetchResults(searchTerm);
    }
  }, [searchTerm, fetchResults]);

  return (
    <>
      {loading ? (
        <>
          <LoadingSpinner />
        </>
      ) : (
        <>
          <div className={styles.container}>
            {results.map((result) => (
              <Card result={result} key={result.id} />
            ))}
          </div>
          <Pagination setSearchParams={setSearchParams} page={page} />
        </>
      )}
    </>
  );
}

export default Results;
