import { PropsWithChildren, createContext, useState } from 'react';

export type SearchTermContextType = {
  searchTerm: string | null;
  setSearchTerm: React.Dispatch<React.SetStateAction<string | null>>;
};

export const SearchTermContext = createContext<SearchTermContextType>(null!);

export function SearchTermContextProvider(props: PropsWithChildren) {
  const [searchTerm, setSearchTerm] = useState<string | null>(null);

  return (
    <SearchTermContext.Provider value={{ searchTerm, setSearchTerm }}>
      {props.children}
    </SearchTermContext.Provider>
  );
}
