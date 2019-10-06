import { IAuthUser } from '../store/auth';

export const checkIsArrayOfObjects = (arr: any[]): boolean => {
    return arr && (arr[0] === Object(arr[0]));
};

export const isLoginSuccess = (authUser: IAuthUser): boolean => {
    if (!authUser || !Object.keys(authUser).length) {
        return false;
    }
    return (authUser['status'] || '').toLowerCase().includes('success');
};