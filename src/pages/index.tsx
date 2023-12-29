import { GetServerSideProps } from 'next';
import { useSelector } from 'react-redux';
import useProduct from 'src/hooks/useProduct';
import { useAppDispatch, wrapper } from 'src/store';

import { apiService } from 'store/api';
import { productsActions } from 'store/products/productsSlice';
import { selectProductId } from 'store/selectors';

import { Product } from 'src/interfaces/product';

import CardList from 'components/cardList/CardList';
import DetailedCard from 'components/detailedCard/DetailedCard';
import Pagination from 'components/pagination/Pagination';
import Search from 'components/search/Search';

type MainPageProps = {
  products?: Product[];
  searchTerm: string;
  page: number;
  perPage: number;
};

export default function MainPage({
  products,
  searchTerm,
  page,
  perPage,
}: MainPageProps) {
  const dispatch = useAppDispatch();

  const selectedProductId = useSelector(selectProductId);

  const { product } = useProduct(selectedProductId);

  const closeModal = () => {
    dispatch(productsActions.setSelectedProductId(-1));
  };

  const setSelected = (productId: number) => {
    dispatch(productsActions.setSelectedProductId(productId));
  };

  return (
    <>
      <Search searchTerm={searchTerm} />
      <CardList data={products} setSelected={setSelected} />
      <Pagination page={page} perPage={perPage} />
      {product && <DetailedCard product={product} closeModal={closeModal} />}
    </>
  );
}

export const getServerSideProps: GetServerSideProps<MainPageProps> =
  wrapper.getServerSideProps((store) => async (context) => {
    const { query } = context;

    const searchTerm = query.searchTerm?.toString() || '';
    const page = Number(query?.page) || 1;
    const perPage = Number(query?.perPage) || 10;

    const { data: products } = await store.dispatch(
      apiService.endpoints.getItems.initiate({
        searchTerm,
        page,
        perPage,
      })
    );

    return {
      props: {
        products,
        searchTerm,
        page,
        perPage,
      },
    };
  });
