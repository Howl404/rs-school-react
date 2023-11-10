import { useState } from 'react';

import Results from 'components/results/Results';
import Search from 'components/search/Search';

import styles from './MainPage.module.scss';

export default function MainPage() {
  const [error, setError] = useState(false);

  const throwError = () => {
    setError(true);
  };

  if (error) {
    throw new Error('This is a test error');
  }

  return (
    <>
      <button
        className={styles.errorButton}
        onClick={throwError}
        data-testid="error-button"
        type="button"
      >
        Throw Error
      </button>
      <Search />
      <Results />
    </>
  );
}
