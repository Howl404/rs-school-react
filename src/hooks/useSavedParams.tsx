import { useAppSelector } from 'store/store';

export default function useSavedParams() {
  const page = useAppSelector((state) => state.search.page);
  const perPage = useAppSelector((state) => state.search.perPage);
  const searchTerm = useAppSelector((state) => state.search.searchTerm);

  return {
    page,
    perPage,
    searchTerm,
  };
}
