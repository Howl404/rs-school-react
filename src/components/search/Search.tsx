import { useRouter } from 'next/router';
import React, { FormEvent } from 'react';

import styles from './Search.module.scss';

type SearchProps = { searchTerm: string };

export default function Search({ searchTerm }: SearchProps) {
  const router = useRouter();

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const inputValue = formData.get('searchTerm') as string;
    const trimmedInputValue = inputValue.trim();

    router.push({
      pathname: '/',
      query: { ...router.query, searchTerm: trimmedInputValue, page: 1 },
    });
  }

  return (
    <form className={styles.searchContainer} onSubmit={handleSubmit}>
      <input
        type="text"
        name="searchTerm"
        defaultValue={searchTerm}
        className={styles.searchInput}
      />
      <button className={styles.submitButton} type="submit" role="button">
        Search
      </button>
    </form>
  );
}
