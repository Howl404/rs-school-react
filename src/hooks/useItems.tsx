import { useEffect, useState } from 'react';

import { Product } from 'src/interfaces/product';
import { fetchItems } from 'services/apiService';

interface UseItemsProps {
  page: number;
  searchTerm: string;
  perPage: string;
}

export default function useItems({ page, searchTerm, perPage }: UseItemsProps) {
  const [products, setProducts] = useState<Product[]>([]);
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
  }, [searchTerm, page, perPage]);

  return {
    products,
    isLoading,
  };
}
