import { useContext, useEffect, useState } from 'react';

import { fetchItems } from 'services/apiService';

import { SearchTermContext } from 'contexts/SearchTermContext';
import { ProductsContext } from 'contexts/ProductsContext';

interface UseItemsProps {
  page: number;
  perPage: string;
}

export default function useItems({ page, perPage }: UseItemsProps) {
  const { searchTerm } = useContext(SearchTermContext);
  const { setProducts } = useContext(ProductsContext);

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    fetchItems(searchTerm, page, perPage)
      .then((data) => {
        setProducts(data);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [searchTerm, page, perPage, setProducts]);

  return {
    isLoading,
  };
}
