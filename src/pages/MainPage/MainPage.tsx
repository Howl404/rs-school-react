import { useState } from 'react';

import { SearchTermContextProvider } from 'src/contexts/SearchTermContext';
import { ProductsContextProvider } from 'src/contexts/ProductsContext';
import { SearchParamsProvider } from 'src/contexts/SearchParamsContext';

import Search from 'src/components/search/Search';
import Results from 'src/components/results/Results';

import styles from 'src/pages/MainPage/MainPage.module.scss';

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
      <button className={styles.errorButton} onClick={throwError}>
        Throw Error
      </button>
      <SearchTermContextProvider>
        <Search />
        <ProductsContextProvider>
          <SearchParamsProvider>
            <Results />
          </SearchParamsProvider>
        </ProductsContextProvider>
      </SearchTermContextProvider>
    </>
  );
}
