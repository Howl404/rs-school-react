import { useEffect } from 'react';

import { useSearchParams } from 'react-router-dom';

const defaultParams = [
  { key: 'page', value: '1' },
  { key: 'perPage', value: '10' },
];

export default function useDefaultParams() {
  const [searchParams, setSearchParams] = useSearchParams();

  const page = Number(searchParams.get('page') || 1);
  const perPage = searchParams.get('perPage') || '10';

  useEffect(() => {
    defaultParams.forEach(({ key, value }) => {
      if (!searchParams.get(key)) {
        setSearchParams((searchParams) => {
          searchParams.set(key, value);
          return searchParams;
        });
      }
    });
  }, [searchParams, setSearchParams]);

  return {
    page,
    perPage,
  };
}
