const createClassName = (classNames: any[]): string => classNames.filter((x) => x).join(' ');

export { createClassName };