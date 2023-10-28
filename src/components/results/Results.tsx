import { useCallback, useEffect, useState } from 'react';
import styles from 'components/Results/Results.module.scss';
import LoadingSpinner from 'components/loadingSpinner/LoadingSpinner';
import { Outlet, useSearchParams } from 'react-router-dom';
import Pagination from 'components/pagination/Pagination';
import { fetchItems } from 'services/apiService';
import CardList from 'components/cardList/CardList';

interface ResultsProps {
  searchTerm: string | null;
}

export type Product = {
  name: string;
  description: string;
  id: number;
  image_url: string;
  tagline: string;
  first_brewed: string;
};

function Results(props: ResultsProps) {
  const { searchTerm } = props;

  const [searchParams, setSearchParams] = useSearchParams();
  const pageQueryParam = searchParams.get('page');
  const page = pageQueryParam ? Number(pageQueryParam) : 1;

  const productId = searchParams.get('productId');

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, isLoading] = useState(false);

  const loadProducts = useCallback(async () => {
    if (typeof searchTerm === 'string') {
      isLoading(true);
      const data = await fetchItems(searchTerm, page);
      setProducts(data);
      isLoading(false);
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
      {productId ? <Outlet /> : ''}
      <Pagination setSearchParams={setSearchParams} page={page} />
    </div>
  );
}

export default Results;
