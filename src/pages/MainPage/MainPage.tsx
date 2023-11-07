import { useState } from 'react';

import { SearchTermContextProvider } from 'contexts/SearchTermContext';
import { ProductsContextProvider } from 'contexts/ProductsContext';
import { DetailedProductContextProvider } from 'contexts/DetailedProductContext';

import Search from 'components/search/Search';
import Results from 'components/results/Results';

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
