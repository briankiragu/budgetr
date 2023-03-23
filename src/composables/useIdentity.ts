export default () => {
  const generateUid = (salt = 'ch'): string =>
    `${salt}${Math.random().toString(36).slice(2, 9)}`;

  return { generateUid };
};
