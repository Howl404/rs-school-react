export function cls<T>(...args: T[]) {
  return args.filter(Boolean).join(' ');
}
