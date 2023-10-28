import { PropsWithChildren, createContext, useMemo } from 'react';
import { SetURLSearchParams, useSearchParams } from 'react-router-dom';

export type SearchParamsContextType = {
  searchParams: URLSearchParams;
  setSearchParams: SetURLSearchParams;
};

export const SearchParamsContext = createContext<SearchParamsContextType>(
  null!
);

export function SearchParamsProvider(props: PropsWithChildren) {
  const [searchParams, setSearchParams] = useSearchParams();

  const value = useMemo(
    () => ({
      searchParams,
      setSearchParams,
    }),
    [searchParams, setSearchParams]
  );

  return (
    <SearchParamsContext.Provider value={value}>
      {props.children}
    </SearchParamsContext.Provider>
  );
}
