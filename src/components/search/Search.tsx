import { useRouter } from 'next/router';
import React, { FormEvent, useRef } from 'react';

import styles from './Search.module.scss';

export default function Search() {
  const router = useRouter();
  const { searchTerm } = router.query;

  const input = useRef<HTMLInputElement | null>(null);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = event.currentTarget as HTMLFormElement;

    const trimmedSearchTerm = form.search.value.trim();

    router.push({
      pathname: '/',
      query: { ...router.query, searchTerm: trimmedSearchTerm, page: 1 },
    });
  }

  return (
    <form className={styles.searchContainer} onSubmit={handleSubmit}>
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
