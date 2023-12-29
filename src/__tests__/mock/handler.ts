import { delay, http, HttpResponse } from 'msw';

import { API_URL } from 'store/api';

import { Product } from 'src/interfaces/product';

export const mockProducts: Product[] = [
  {
    id: 1,
    name: 'Product 1',
    description: 'Description 1',
    tagline: 'test',
    image_url: '/test',
    first_brewed: 's',
  },
  {
    id: 2,
    name: 'Product 2',
    description: 'Description 2',
    tagline: 'test',
    image_url: '/test',
    first_brewed: 's',
  },
  {
    id: 3,
    name: 'Product 3',
    description: 'Description 3',
    tagline: 'test',
    image_url: '/test',
    first_brewed: 's',
  },
  {
    id: 4,
    name: 'Product 4',
    description: 'Description 4',
    tagline: 'test',
    image_url: '/test',
    first_brewed: 's',
  },
  {
    id: 5,
    name: 'Product 5',
    description: 'Description 5',
    tagline: 'test',
    image_url: '/test',
    first_brewed: 's',
  },
  {
    id: 6,
    name: 'Product 1',
    description: 'Description 1',
    tagline: 'test',
    image_url: '/test',
    first_brewed: 's',
  },
  {
    id: 7,
    name: 'Product 2',
    description: 'Description 2',
    tagline: 'test',
    image_url: '/test',
    first_brewed: 's',
  },
  {
    id: 8,
    name: 'Product 3',
    description: 'Description 3',
    tagline: 'test',
    image_url: '/test',
    first_brewed: 's',
  },
  {
    id: 9,
    name: 'Product 4',
    description: 'Description 4',
    tagline: 'test',
    image_url: '/test',
    first_brewed: 's',
  },
  {
    id: 10,
    name: 'Product 5',
    description: 'Description 5',
    tagline: 'test',
    image_url: '/test',
    first_brewed: 's',
  },
];

export const mockProduct: Product = {
  id: 1,
  name: 'Detailed product',
  description: 'test description',
  image_url: '/testurl',
  tagline: 'test tagline',
  first_brewed: '1992',
};

export const handlers = [
  http.get(`${API_URL}/beers`, ({ request }) => {
    const url = new URL(request.url);
    const perPage = Number(url.searchParams.get('per_page')) || 5;
    return HttpResponse.json(mockProducts.slice(0, perPage));
  }),
  http.get(`${API_URL}/beers/:productId`, async () => {
    await delay(200);
    return HttpResponse.json([mockProduct]);
  }),
];
