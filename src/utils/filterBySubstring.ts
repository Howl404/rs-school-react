export function filterBySubstring(array: string[], substring: string) {
  return array.filter((item) =>
    item.toLowerCase().includes(substring.toLowerCase())
  );
}
