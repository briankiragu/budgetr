const generateUID = (salt: string = 'ch'): string =>
  `${salt}${Math.random().toString(36).slice(2, 9)}`;

export { generateUID };
