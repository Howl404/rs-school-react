import React, { useEffect, useState } from 'react';
import styles from 'components/Search/Search.module.scss';
import { useSearchParams } from 'react-router-dom';

interface SearchProps {
  searchTerm: string | null;
  setSearchTerm: React.Dispatch<React.SetStateAction<string | null>>;
}

function Search(props: SearchProps) {
  const { setSearchTerm } = props;

  const [inputText, setInputText] = useState<string | null>(null);
  const [, setSearchParams] = useSearchParams();

  useEffect(() => {
    const searchTerm = localStorage.getItem('howl-searchTerm');
    if (searchTerm) {
      setInputText(searchTerm);
      setSearchTerm(searchTerm);
    } else {
      setInputText('');
      setSearchTerm('');
    }
  }, [setSearchTerm]);

  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    setInputText(event.target.value);
  }

  function handleSearch() {
    if (typeof inputText === 'string') {
      setSearchParams((searchParams) => {
        searchParams.set('page', '1');
        return searchParams;
      });
      const trimmedSearchTerm = inputText.trim();
      localStorage.setItem('howl-searchTerm', trimmedSearchTerm);
      setSearchTerm(trimmedSearchTerm);
    }
  }

  return (
    <div className={styles.container}>
      <input
        type="text"
        value={inputText || ''}
        onChange={handleInputChange}
        className={styles.input}
      />
      <button onClick={handleSearch} className={styles.button}>
        Search
      </button>
    </div>
  );
}

export default Search;
