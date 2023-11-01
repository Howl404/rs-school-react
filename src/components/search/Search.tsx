import React, { useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';

import styles from 'components/Search/Search.module.scss';

interface SearchProps {
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
}

export default function Search(props: SearchProps) {
  const { setSearchTerm, searchTerm } = props;
  const [, setSearchParams] = useSearchParams();

  const input = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    const searchTerm = localStorage.getItem('howl-searchTerm');
    if (searchTerm) {
      setSearchTerm(searchTerm);
    }
  }, [setSearchTerm]);

  function handleSearch() {
    setSearchParams((searchParams) => {
      searchParams.set('page', '1');
      return searchParams;
    });
    if (input.current) {
      const trimmedSearchTerm = input.current.value.trim();
      localStorage.setItem('howl-searchTerm', trimmedSearchTerm);
      setSearchTerm(trimmedSearchTerm);
    }
  }

  function handleKeyDown(event: React.KeyboardEvent) {
    if (event.key === 'Enter') {
      handleSearch();
    }
  }

  return (
    <div className={styles.searchContainer}>
      <input
        type="text"
        defaultValue={searchTerm}
        className={styles.searchInput}
        ref={input}
        onKeyDown={handleKeyDown}
      />
      <button onClick={handleSearch} className={styles.submitButton}>
        Search
      </button>
    </div>
  );
}
