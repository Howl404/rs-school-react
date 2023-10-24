import { useState } from 'react';
import Search from 'src/components/search/Search';
import Results from 'src/components/results/Results';
import styles from 'src/pages/MainPage.module.scss';

function MainPage() {
  const [searchTerm, setSearchTerm] = useState<string | null>(null);
  const [error, setError] = useState(false);

  if (error) {
    throw new Error('This is a test error');
  }

  return (
    <>
      <button
        className={styles.button}
        onClick={() => {
          setError(true);
        }}
      >
        Throw Error
      </button>
      <Search setSearchTerm={setSearchTerm} searchTerm={searchTerm} />
      <Results searchTerm={searchTerm} />
    </>
  );
}

export default MainPage;
