import { useState } from 'react';

import { SearchTermContextProvider } from 'src/contexts/SearchTermContext';
import { ProductsContextProvider } from 'src/contexts/ProductsContext';

import Search from 'src/components/search/Search';
import Results from 'src/components/results/Results';

import styles from 'src/pages/MainPage/MainPage.module.scss';
import { DetailedProductContextProvider } from 'src/contexts/DetailedProductContext';

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
      >
        Throw Error
      </button>
      <SearchTermContextProvider>
        <Search />
        <ProductsContextProvider>
          <DetailedProductContextProvider>
            <Results />
          </DetailedProductContextProvider>
        </ProductsContextProvider>
      </SearchTermContextProvider>
    </>
  );
}
