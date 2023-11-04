import { PropsWithChildren, createContext, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

export type DetailedProductContextType = {
  detailedProductId: string;
  setDetailedProductId: React.Dispatch<React.SetStateAction<string>>;
};

export const DetailedProductContext = createContext<DetailedProductContextType>(
  null!
);

export function DetailedProductContextProvider({
  children,
}: PropsWithChildren) {
  const [searchParams] = useSearchParams();

  const [detailedProductId, setDetailedProductId] = useState<string>(
    searchParams.get('productId')?.toString() || ''
  );

  const value = useMemo(
    () => ({
      detailedProductId,
      setDetailedProductId,
    }),
    [detailedProductId]
  );

  return (
    <DetailedProductContext.Provider value={value}>
      {children}
    </DetailedProductContext.Provider>
  );
}
