import { PropsWithChildren, createContext, useMemo, useState } from 'react';

export type SearchTermContextType = {
  searchTerm: string | null;
  setSearchTerm: React.Dispatch<React.SetStateAction<string | null>>;
};

export const SearchTermContext = createContext<SearchTermContextType>(null!);

export function SearchTermContextProvider(props: PropsWithChildren) {
  const [searchTerm, setSearchTerm] = useState<string | null>(null);

  const value = useMemo(
    () => ({
      searchTerm,
      setSearchTerm,
    }),
    [searchTerm]
  );

  return (
    <SearchTermContext.Provider value={value}>
      {props.children}
    </SearchTermContext.Provider>
  );
}
