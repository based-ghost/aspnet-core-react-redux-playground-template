const formatJavaScriptObj = (data: any = {}): string => JSON.stringify(data).replace(/"/g, "'");

export default formatJavaScriptObj;