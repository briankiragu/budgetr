const toPrice = (price: number, currency = 'KES', locale = 'en-GB'): string => {
  return price.toLocaleString(locale, {
    style: 'currency',
    currency,
  });
};

const toTitle = (title: string): string =>
  title
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

export { toPrice, toTitle };
