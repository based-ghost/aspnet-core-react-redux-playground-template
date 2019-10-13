export const checkIsArrayOfObjects = (arr: any[]): boolean => {
    return arr && (arr[0] === Object(arr[0]));
};