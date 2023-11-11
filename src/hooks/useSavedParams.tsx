import { useSelector } from 'react-redux';

import { RootState } from 'store/store';

export default function useSavedParams() {
  const page = useSelector((state: RootState) => state.search.page);
  const perPage = useSelector((state: RootState) => state.search.perPage);
  const searchTerm = useSelector((state: RootState) => state.search.searchTerm);

  return {
    page,
    perPage,
    searchTerm,
  };
}
