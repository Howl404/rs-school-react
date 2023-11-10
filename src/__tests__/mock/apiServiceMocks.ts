import { vi } from 'vitest';

const fetchItemMock = vi.fn().mockImplementation(
  () =>
    new Promise((resolve) =>
      setTimeout(
        () =>
          resolve({
            id: 1,
            name: 'Detailed product',
            description: 'test description',
            image_url: 'test url',
            tagline: 'test tagline',
            first_brewed: '1992',
          }),
        100
      )
    )
);

const fetchItemsMock = vi.fn().mockResolvedValue([
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

export { fetchItemMock, fetchItemsMock };
