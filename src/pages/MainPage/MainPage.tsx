import { useState } from 'react';

import Search from 'src/components/search/Search';
import Results from 'src/components/results/Results';

import styles from 'src/pages/MainPage/MainPage.module.scss';

export default function MainPage() {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [error, setError] = useState(false);

  const throwError = () => {
    setError(true);
  };

  if (error) {
    throw new Error('This is a test error');
  }

  return (
    <>
      <button className={styles.errorButton} onClick={throwError}>
        Throw Error
      </button>
      <Search setSearchTerm={setSearchTerm} searchTerm={searchTerm} />
      <Results searchTerm={searchTerm} />
    </>
  );
}
