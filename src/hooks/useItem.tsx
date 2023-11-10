import { useEffect, useState } from 'react';

import { fetchItem } from 'services/apiService';

import { Product } from 'src/interfaces/product';

export default function useItem(productId: string) {
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    fetchItem(productId)
      .then((data) => {
        setProduct(data);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [productId]);

  return {
    product,
    isLoading,
  };
}
