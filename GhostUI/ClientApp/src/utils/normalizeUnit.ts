import { ReactText } from 'react';

const normalizeUnit = (size?: ReactText): string => {
  if (!size) return '0';
  if (typeof size === 'number') return `${size}px`;

  return /^\d$/.test(size[size.length - 1]) ? `${size}px` : size;
};

export { normalizeUnit };