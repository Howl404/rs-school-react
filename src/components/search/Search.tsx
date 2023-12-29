import { useRouter } from 'next/router';
import React, { FormEvent, useRef } from 'react';

import styles from './Search.module.scss';

type SearchProps = { searchTerm: string };

export default function Search({ searchTerm }: SearchProps) {
  const router = useRouter();
  const ref = useRef<HTMLInputElement>(null);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const inputValue = ref.current?.value.trim() || '';

    if (inputValue !== router.query.searchTerm) {
      const params = new URLSearchParams({
        page: '' + 1,
      });

      if (inputValue) {
        params.set('searchTerm', inputValue);
      }

      void router.push(`/?${params}`);
    }
  }

  return (
    <form className={styles.searchContainer} onSubmit={handleSubmit}>
      <input
        type="text"
        name="searchTerm"
        ref={ref}
        defaultValue={searchTerm}
        className={styles.searchInput}
      />
      <button className={styles.submitButton} type="submit" role="button">
        Search
      </button>
    </form>
  );
}
