import { Product } from 'components/results/Results';

export async function fetchItems(searchTerm: string, page: number) {
  let api = `https://api.punkapi.com/v2/beers/?page=${page}&per_page=16`;
  if (searchTerm) {
    api += `&beer_name=${searchTerm}`;
  }

  const response = await fetch(api);
  const data: Product[] = await response.json();
  return data;
}

export async function fetchItem(id: string) {
  const api = `https://api.punkapi.com/v2/beers/${id}`;

  const response = await fetch(api);
  const data: Product[] = await response.json();
  return data[0];
}
