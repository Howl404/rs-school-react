import { mockProduct, mockProducts } from 'mock/handler';
import { store } from 'src/store';
import { expect, it } from 'vitest';

import { apiService } from 'store/api';

it('getItems fetches beers successfully', async () => {
  const { data } = await store().dispatch(
    apiService.endpoints.getItems.initiate({
      searchTerm: '',
      page: 1,
      perPage: 10,
    })
  );

  expect(data).toEqual(mockProducts);
});

it('getItems fetches specified amount of beers', async () => {
  const { data } = await store().dispatch(
    apiService.endpoints.getItems.initiate({
      searchTerm: '',
      page: 1,
      perPage: 5,
    })
  );

  expect(data).toEqual(mockProducts.slice(0, 5));
});

it('getItem fetches beer successfully', async () => {
  const { data } = await store().dispatch(
    apiService.endpoints.getItem.initiate(1)
  );

  expect(data).toEqual(mockProduct);
});
