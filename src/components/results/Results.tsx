import { useEffect, useState } from 'react';
import Card from 'src/components/card/Card';
import styles from 'src/components/Results/Results.module.scss';
import LoadingSpinner from 'src/components/loadingSpinner/LoadingSpinner';

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

  const [results, setResults] = useState<Result[]>([]);

  const [loading, isLoading] = useState(false);

  async function fetchResults(searchTerm: string) {
    let api = 'https://api.punkapi.com/v2/beers/?page=1&per_page=9';
    if (searchTerm) {
      api += `&beer_name=${searchTerm}`;
    }

    const response = await fetch(api);
    const data = await response.json();
    setResults(data);
    isLoading(false);
  }

  useEffect(() => {
    if (typeof searchTerm === 'string') {
      isLoading(true);
      fetchResults(searchTerm);
    }
  }, [searchTerm]);

  return (
    <>
      {loading ? (
        <LoadingSpinner />
      ) : (
        <div className={styles.container}>
          {results.map((result) => (
            <Card result={result} key={result.id} />
          ))}
        </div>
      )}
    </>
  );
}

export default Results;
