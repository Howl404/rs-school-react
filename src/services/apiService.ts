import { Product } from 'src/interfaces/product';

export async function fetchItems(
  searchTerm: string,
  page: number,
  perPage: string
) {
  const api = new URL('https://api.punkapi.com/v2/beers/');
  const params = new URLSearchParams({
    page: page.toString(),
    per_page: perPage,
  });

  if (searchTerm) {
    params.set('beer_name', searchTerm);
  }

  api.search = params.toString();

  const data: Product[] = await fetch(api).then((res) => res.json());

  return data;
}

export async function fetchItem(id: string) {
  const api = `https://api.punkapi.com/v2/beers/${id}`;

  const data: Product[] = await fetch(api).then((res) => res.json());

  return data[0];
}
