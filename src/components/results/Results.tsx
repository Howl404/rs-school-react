import { useCallback, useEffect, useState } from 'react';
import { Outlet, useSearchParams } from 'react-router-dom';

import { fetchItems } from 'services/apiService';
import { Product } from 'src/interfaces/product';

import LoadingSpinner from 'components/loadingSpinner/LoadingSpinner';
import Pagination from 'components/pagination/Pagination';
import CardList from 'components/cardList/CardList';

import styles from 'components/Results/Results.module.scss';

interface ResultsProps {
  searchTerm: string;
}

export default function Results(props: ResultsProps) {
  const { searchTerm } = props;

  const [searchParams, setSearchParams] = useSearchParams();
  const pageQueryParam = searchParams.get('page');
  const page = pageQueryParam ? Number(pageQueryParam) : 1;

  const productId = searchParams.get('productId');

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, isLoading] = useState(false);

  const loadProducts = useCallback(async () => {
    try {
      isLoading(true);
      const data = await fetchItems(searchTerm, page);
      setProducts(data);
      isLoading(false);
    } catch (error) {
      console.error(error);
    }
  }, [searchTerm, page]);

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  useEffect(() => {
    if (!pageQueryParam) {
      setSearchParams((searchParams) => {
        searchParams.set('page', '1');
        return searchParams;
      });
    }
  }, [pageQueryParam, setSearchParams]);

  return (
    <div className={productId ? styles.wrapper : ''}>
      {loading ? (
        <LoadingSpinner />
      ) : (
        <CardList products={products} setSearchParams={setSearchParams} />
      )}
      {productId && <Outlet />}
      <Pagination setSearchParams={setSearchParams} page={page} />
    </div>
  );
}
