import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { productsActions } from 'store/products/productsSlice';

import { Product } from 'src/interfaces/product';

export const API_URL = 'https://api.punkapi.com/v2';

export const apiService = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
  endpoints: (builder) => ({
    getItems: builder.query<
      Product[],
      { searchTerm: string; page: number; perPage: string }
    >({
      query: ({ searchTerm, page, perPage }) => {
        const params = new URLSearchParams({
          page: page.toString(),
          per_page: perPage,
        });
        if (searchTerm) {
          params.set('beer_name', searchTerm);
        }
        return `beers/?${params}`;
      },
      onQueryStarted: async (arg, { dispatch, queryFulfilled }) => {
        dispatch(productsActions.setIsMainPageLoading(true));
        queryFulfilled
          .catch(() => {
            dispatch(productsActions.setIsMainPageLoading(false));
          })
          .finally(() => {
            dispatch(productsActions.setIsMainPageLoading(false));
          });
      },
    }),
    getItem: builder.query<Product, string>({
      query: (productId) => {
        return `beers/${productId}`;
      },
      onQueryStarted: async (arg, { dispatch, queryFulfilled }) => {
        dispatch(productsActions.setIsDetailsPageLoading(true));
        queryFulfilled
          .catch(() => {
            dispatch(productsActions.setIsDetailsPageLoading(false));
          })
          .finally(() => {
            dispatch(productsActions.setIsDetailsPageLoading(false));
          });
      },
      transformResponse: (response: Product[]) => {
        return response[0];
      },
    }),
  }),
});

export const { reducer: apiServiceReducer } = apiService;
