import { useEffect } from 'react';

import { useSearchParams } from 'react-router-dom';

const defaultParams = {
  page: '1',
  perPage: '10',
};

export default function useDefaultParams() {
  const [searchParams, setSearchParams] = useSearchParams();

  const page = Number(searchParams.get('page') || defaultParams.page);
  const perPage = searchParams.get('perPage') || defaultParams.perPage;

  useEffect(() => {
    for (const [key, value] of Object.entries(defaultParams)) {
      if (!searchParams.get(key)) {
        setSearchParams((searchParams) => {
          searchParams.set(key, value);
          return searchParams;
        });
      }
    }
  }, [searchParams, setSearchParams]);

  return {
    page,
    perPage,
  };
}
