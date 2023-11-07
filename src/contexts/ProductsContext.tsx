import { PropsWithChildren, createContext, useMemo, useState } from 'react';

import { Product } from 'src/interfaces/product';

export type ProductsContextType = {
  products: Product[];
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
};

export const ProductsContext = createContext<ProductsContextType>(null!);

export function ProductsContextProvider({ children }: PropsWithChildren) {
  const [products, setProducts] = useState<Product[]>([]);

  const value = useMemo(
    () => ({
      products,
      setProducts,
    }),
    [products]
  );

  return (
    <ProductsContext.Provider value={value}>
      {children}
    </ProductsContext.Provider>
  );
}
