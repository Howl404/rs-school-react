import { PropsWithChildren, createContext, useMemo, useState } from 'react';
import { Product } from 'src/components/results/Results';

export type ProductsContextType = {
  products: Product[];
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
};

export const ProductsContext = createContext<ProductsContextType>(null!);

export function ProductsContextProvider(props: PropsWithChildren) {
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
      {props.children}
    </ProductsContext.Provider>
  );
}
