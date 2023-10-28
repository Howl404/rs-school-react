import { expect, describe, it, vi } from 'vitest';
import { fetchItems, fetchItem } from 'src/services/apiService';

describe('fetchItems', () => {
  it('fetches items with a search term and page', async () => {
    const searchTerm = 'test';
    const page = 1;

    global.fetch = vi.fn().mockResolvedValue({
      json: async () => [
        {
          id: 1,
          name: 'Product 1',
          description: '',
          image_url: '',
          tagline: '',
          first_brewed: '',
        },
        {
          id: 2,
          name: 'Product 2',
          description: '',
          image_url: '',
          tagline: '',
          first_brewed: '',
        },
      ],
    });

    const data = await fetchItems(searchTerm, page);

    expect(global.fetch).toHaveBeenCalledWith(
      `https://api.punkapi.com/v2/beers/?page=${page}&per_page=4&beer_name=${searchTerm}`
    );

    expect(data).toEqual([
      {
        id: 1,
        name: 'Product 1',
        description: '',
        image_url: '',
        tagline: '',
        first_brewed: '',
      },
      {
        id: 2,
        name: 'Product 2',
        description: '',
        image_url: '',
        tagline: '',
        first_brewed: '',
      },
    ]);
  });

  it('fetches items without a search term and with a page', async () => {
    const searchTerm = '';
    const page = 1;

    global.fetch = vi.fn().mockResolvedValue({
      json: async () => [
        {
          id: 1,
          name: 'Product 1',
          description: '',
          image_url: '',
          tagline: '',
          first_brewed: '',
        },
        {
          id: 2,
          name: 'Product 2',
          description: '',
          image_url: '',
          tagline: '',
          first_brewed: '',
        },
      ],
    });

    const data = await fetchItems(searchTerm, page);

    expect(global.fetch).toHaveBeenCalledWith(
      `https://api.punkapi.com/v2/beers/?page=${page}&per_page=4`
    );

    expect(data).toEqual([
      {
        id: 1,
        name: 'Product 1',
        description: '',
        image_url: '',
        tagline: '',
        first_brewed: '',
      },
      {
        id: 2,
        name: 'Product 2',
        description: '',
        image_url: '',
        tagline: '',
        first_brewed: '',
      },
    ]);
  });
});

describe('fetchItem', () => {
  it('fetches a single item by ID', async () => {
    const id = '1';

    global.fetch = vi.fn().mockResolvedValue({
      json: async () => [
        {
          id: 1,
          name: 'Product 1',
          description: '',
          image_url: '',
          tagline: '',
          first_brewed: '',
        },
      ],
    });

    const data = await fetchItem(id);

    expect(global.fetch).toHaveBeenCalledWith(
      `https://api.punkapi.com/v2/beers/${id}`
    );

    expect(data).toEqual({
      id: 1,
      name: 'Product 1',
      description: '',
      image_url: '',
      tagline: '',
      first_brewed: '',
    });
  });
});