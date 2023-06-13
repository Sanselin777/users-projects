import { isEAN } from "class-validator";

export interface AuthResponse {
    accessToken: string;
    user: any;
}

export interface PayloadToken {
    role: string;
    sub: string;
}

export interface AuthBody {
    username: string;
    password: string;
}

export interface AuthTokenResult {
    role: string;
    sub: string;
    iat: number;
    exp: number;
}

export interface IUseToken {
    role: string;
    sub: string;
    isExpired: boolean;
}