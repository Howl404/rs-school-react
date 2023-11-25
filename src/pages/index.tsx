import { GetServerSideProps } from 'next';

import { useAppDispatch, wrapper } from 'src/store';
import { apiService } from 'store/api';

import { Product } from 'src/interfaces/product';

import CardList from 'components/cardList/CardList';
import Pagination from 'components/pagination/Pagination';
import Search from 'components/search/Search';
import DetailedCard from 'src/components/detailedCard/DetailedCard';
import { useEffect, useState } from 'react';

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
  const [selected, setSelected] = useState<number>(-1); // вынеси это в стор
  const [product, setProduct] = useState<Product | null | undefined>(null);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (selected !== -1) {
      dispatch(apiService.endpoints.getItem.initiate(selected)).then((res) => {
        setProduct(res.data);
      });
      return;
    }

    setProduct(null);
  }, [selected]);

  const closeModal = () => {
    setSelected(-1);
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
