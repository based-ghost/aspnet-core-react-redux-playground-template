import { IAuthUser } from '../store/auth';

export const isArrayOfObjects = (arr: any[]): boolean => {
    return arr && (arr[0] === Object(arr[0]));
};

export const validateLoginRs = (authUser: IAuthUser): boolean => {
    if (!authUser || !Object.keys(authUser).length) {
        return false;
    }
    return (authUser['status'] || '').toLowerCase().indexOf('success') > -1;
};