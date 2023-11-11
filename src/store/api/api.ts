import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { loadingActions } from 'store/loading/loadingSlice';

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
        dispatch(loadingActions.setIsMainPageLoading(true));
        queryFulfilled
          .catch(() => {
            dispatch(loadingActions.setIsMainPageLoading(false));
          })
          .finally(() => {
            dispatch(loadingActions.setIsMainPageLoading(false));
          });
      },
    }),
    getItem: builder.query<Product[], string>({
      query: (productId) => {
        return `beers/${productId}`;
      },
      onQueryStarted: async (arg, { dispatch, queryFulfilled }) => {
        dispatch(loadingActions.setIsDetailsPageLoading(true));
        queryFulfilled
          .catch(() => {
            dispatch(loadingActions.setIsDetailsPageLoading(false));
          })
          .finally(() => {
            dispatch(loadingActions.setIsDetailsPageLoading(false));
          });
      },
    }),
  }),
});

export const { reducer: apiServiceReducer } = apiService;
