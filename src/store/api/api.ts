import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { HYDRATE } from 'next-redux-wrapper';

import { Product } from 'src/interfaces/product';

export const API_URL = 'https://api.punkapi.com/v2';

interface GetItemsArguments {
  searchTerm: string;
  page: number;
  perPage: string;
}

export const apiService = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === HYDRATE) {
      return action.payload[reducerPath];
    }
  },
  endpoints: (builder) => ({
    getItems: builder.query<Product[], GetItemsArguments>({
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
    }),
    getItem: builder.query<Product, string>({
      query: (productId) => {
        return `beers/${productId}`;
      },
      transformResponse: (response: Product[]) => {
        return response[0];
      },
    }),
  }),
});

export const { reducer: apiServiceReducer } = apiService;
