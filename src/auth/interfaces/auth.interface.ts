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