export default () => {
  const toPrice = (price: number, currency = "KES", locale = "en-GB"): string =>
    price.toLocaleString(locale, {
      style: "currency",
      currency,
      // maximumFractionDigits: 0,
      // minimumFractionDigits: 0,
    });

  const toTitle = (title?: string): string =>
    title
      ? title
          .split("-")
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(" ")
      : "";

  return { toPrice, toTitle };
};
