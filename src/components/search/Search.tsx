import React, { useRef } from 'react';

import { searchActions } from 'store/search/searchSlice';
import { useAppDispatch } from 'store/store';

import useSavedParams from 'hooks/useSavedParams';

import styles from './Search.module.scss';

export default function Search() {
  const { searchTerm } = useSavedParams();

  const dispatch = useAppDispatch();

  const input = useRef<HTMLInputElement | null>(null);

  function handleSearch() {
    if (input.current) {
      const trimmedSearchTerm = input.current.value.trim();
      dispatch(searchActions.setSearchTerm(trimmedSearchTerm));
      dispatch(searchActions.setPage(1));
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
