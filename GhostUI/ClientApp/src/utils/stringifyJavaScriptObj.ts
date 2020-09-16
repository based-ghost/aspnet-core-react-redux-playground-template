const stringifyJavaScriptObj = (data: any): string => {
  return JSON.stringify(data || {}).replace(/"/g, "'");
};

export {
  stringifyJavaScriptObj
};