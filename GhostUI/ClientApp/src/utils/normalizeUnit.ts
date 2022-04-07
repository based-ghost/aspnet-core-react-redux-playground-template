import type { ReactText } from 'react';

export const normalizeUnit = (size?: ReactText): string => {
  if (!size) return '0';
  if (typeof size === 'number') return `${size}px`;

  return /^\d$/.test(size[size.length - 1]) ? `${size}px` : size;
};