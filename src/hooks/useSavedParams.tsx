import { useSelector } from 'react-redux';

import { selectPage, selectPerPage, selectSearchTerm } from 'store/selectors';

export default function useSavedParams() {
  const page = useSelector(selectPage);
  const perPage = useSelector(selectPerPage);
  const searchTerm = useSelector(selectSearchTerm);

  return {
    page,
    perPage,
    searchTerm,
  };
}
