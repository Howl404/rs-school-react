import { useEffect, useState } from 'react';

import { apiService } from 'store/api';
import { useAppDispatch } from 'store/index';

import { Product } from 'src/interfaces/product';

export default function useProduct(selected: number) {
  const dispatch = useAppDispatch();

  const [product, setProduct] = useState<Product | null | undefined>(null);

  useEffect(() => {
    if (selected !== -1) {
      dispatch(apiService.endpoints.getItem.initiate(selected)).then((res) => {
        setProduct(res.data);
      });
      return;
    }

    setProduct(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selected]);

  return {
    product,
  };
}
