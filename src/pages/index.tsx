import { GetServerSideProps } from 'next';
import DetailedCard from 'src/components/detailedCard/DetailedCard';
import { wrapper } from 'src/store/store';
import { cls } from 'src/utils/cls';

import { apiService } from 'store/api/api';

import { Product } from 'src/interfaces/product';

import CardList from 'components/cardList/CardList';
import Pagination from 'components/pagination/Pagination';
import Search from 'components/search/Search';

import styles from './index.module.scss';

interface MainPageProps {
  products: Product[] | undefined;
  product: Product | undefined | null;
  searchTerm: string;
  page: number;
  perPage: string;
}

export const getServerSideProps: GetServerSideProps<MainPageProps> =
  wrapper.getServerSideProps((store) => async (context) => {
    const { query } = context;

    const searchTerm = (query.searchTerm as string) || '';
    const page = Number(query.page) || 1;
    const perPage = (query.perPage as string) || '10';

    const { data: products } = await store.dispatch(
      apiService.endpoints.getItems.initiate({
        searchTerm,
        page,
        perPage,
      })
    );

    let product;

    const productId = query.id as string;

    if (productId) {
      const { data } = await store.dispatch(
        apiService.endpoints.getItem.initiate(productId)
      );
      product = data;
    } else product = null;

    await Promise.all(store.dispatch(apiService.util.getRunningQueriesThunk()));

    return { props: { products, product, searchTerm, page, perPage } };
  });

export default function MainPage({
  products,
  product,
  page,
  perPage,
}: MainPageProps) {
  return (
    <>
      <Search />
      <div className={cls(product && styles.wrapper)}>
        <CardList data={products} />
        {product && <DetailedCard product={product} />}
      </div>
      <Pagination page={page} perPage={perPage} />
    </>
  );
}
