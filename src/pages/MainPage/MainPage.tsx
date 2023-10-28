import { useState } from 'react';
import Search from 'src/components/search/Search';
import Results from 'src/components/results/Results';
import styles from 'src/pages/MainPage/MainPage.module.scss';
import { SearchTermContextProvider } from 'src/contexts/SearchTermContext';
import { ProductsContextProvider } from 'src/contexts/ProductsContext';
import { SearchParamsProvider } from 'src/contexts/SearchParamsContext';

function MainPage() {
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

export default MainPage;
