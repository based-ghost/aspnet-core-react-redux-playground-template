const formatJavaScriptObj = (data: any): string => {
  return JSON.stringify(data || {}).replace(/"/g, "'");
};

export {
  formatJavaScriptObj
};