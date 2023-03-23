export default () => {
  const toPrice = (price: number, currency = 'KES', locale = 'en-GB'): string =>
    price.toLocaleString(locale, {
      style: 'currency',
      currency,
    });

  const toTitle = (title: string): string =>
    title
      .split('-')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');

  return { toPrice, toTitle };
};
