export function filter(toFilter: Array<string>, from: Array<string>) {
  for (let i = 0; i <= toFilter.length; i++) {
    from = from.filter((item) => item !== toFilter[i]);
  }
  return from;
}
