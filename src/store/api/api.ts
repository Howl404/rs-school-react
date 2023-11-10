import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { Product } from 'src/interfaces/product';

import {
  setDetailsPageLoading,
  setMainPageLoading,
} from '../loading/loadingSlice';

const API_URL = 'https://api.punkapi.com/v2';

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
        dispatch(setMainPageLoading(true));
        queryFulfilled
          .catch(() => {
            dispatch(setMainPageLoading(false));
          })
          .finally(() => {
            dispatch(setMainPageLoading(false));
          });
      },
    }),
    getItem: builder.query<Product[], string>({
      query: (productId) => {
        return `beers/${productId}`;
      },
      onQueryStarted: async (arg, { dispatch, queryFulfilled }) => {
        dispatch(setDetailsPageLoading(true));
        queryFulfilled
          .catch(() => {
            dispatch(setDetailsPageLoading(false));
          })
          .finally(() => {
            dispatch(setDetailsPageLoading(false));
          });
      },
    }),
  }),
});

export const { useGetItemsQuery, useGetItemQuery } = apiService;
