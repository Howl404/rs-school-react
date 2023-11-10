export function updateSearchParams(paramName: string, paramValue: string) {
  const params = new URLSearchParams(window.location.search);

  if (paramValue) {
    params.set(paramName, paramValue);
  } else {
    params.delete(paramName);
  }

  window.history.pushState({}, '', `${window.location.pathname}?${params}`);
}
