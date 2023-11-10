import { useContext, useEffect, useState } from 'react';

import { fetchItems } from 'services/apiService';

import { ProductsContext } from 'contexts/ProductsContext';
import { SearchTermContext } from 'contexts/SearchTermContext';

import useDefaultParams from 'hooks/useDefaultParams';

export default function useItems() {
  const { searchTerm } = useContext(SearchTermContext);
  const { setProducts } = useContext(ProductsContext);

  const { page, perPage } = useDefaultParams();

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
