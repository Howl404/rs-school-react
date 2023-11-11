export function updateSearchParams(paramName: string, paramValue: string) {
  const params = new URLSearchParams(window.location.search);

  if (paramValue) {
    params.set(paramName, paramValue);
  } else {
    params.delete(paramName);
  }

  const newUrl = params.toString()
    ? `${window.location.pathname}?${params}`
    : window.location.pathname;

  window.history.pushState({}, '', newUrl);
}
