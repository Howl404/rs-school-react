import { useRouter } from 'next/router';
import React, { useRef } from 'react';

import styles from './Search.module.scss';

export default function Search() {
  const router = useRouter();
  const { searchTerm } = router.query;

  const input = useRef<HTMLInputElement | null>(null);

  function handleKeyDown(event: React.KeyboardEvent) {
    if (event.key === 'Enter') {
      handleSubmit();
    }
  }

  function handleSubmit() {
    if (input) {
      const trimmedSearchTerm = input.current?.value.trim();

      router.push({
        pathname: '/',
        query: { ...router.query, searchTerm: trimmedSearchTerm, page: 1 },
      });
    }
  }

  return (
    <form
      className={styles.searchContainer}
      onSubmit={handleSubmit}
      onKeyDown={handleKeyDown}
      data-testid="search-form"
    >
      <input
        type="text"
        name="search"
        defaultValue={searchTerm}
        className={styles.searchInput}
        ref={input}
      />
      <button className={styles.submitButton} type="submit" role="button">
        Search
      </button>
    </form>
  );
}
