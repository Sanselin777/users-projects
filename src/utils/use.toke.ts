import { AuthTokenResult, IUseToken } from "src/auth/interfaces/auth.interface";
import * as jwt from 'jsonwebtoken';

export const useToken = (token: string): IUseToken | string => {
    try {
        const decoded = jwt.decode(token) as AuthTokenResult;
        const { role, sub, exp } = decoded;
        const isExpired = +Date.now() >= +new Date(exp * 1000);
        return { role, sub, isExpired };
    } catch (error) {
        return 'Token is not valid'
    }
}