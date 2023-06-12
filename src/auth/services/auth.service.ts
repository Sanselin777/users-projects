import { Injectable } from '@nestjs/common';
import { UserEntity } from 'src/users/entities/users.entity';
import { UsersService } from 'src/users/services/users.service';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { AuthResponse, PayloadToken } from '../interfaces/auth.interface';

@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsersService,
    ) { }

    public async validateUser(username: string, password: string): Promise<UserEntity | null> {
        const userByUsername = await this.usersService.findBy({
            key: 'username',
            value: username,
        })
        const userByEmail = await this.usersService.findBy({
            key: 'email',
            value: username,
        })

        if (userByUsername) {
            const isValid = await bcrypt.compare(password, userByUsername.password);
            if (isValid) return userByUsername;
        }

        if (userByEmail) {
            const isValid = await bcrypt.compare(password, userByEmail.password);
            if (isValid) return userByEmail;
        }

        return null;
    }
    public signJWT({
        payload,
        secret,
        expires,
    }: {
        payload: jwt.JwtPayload;
        secret: string;
        expires: number | string;
    }): string {
        return jwt.sign(payload, secret, { expiresIn: expires });
    }

    public async generateJWT(user: UserEntity): Promise<AuthResponse> {
        const getUser = await this.usersService.findUserById(user.id);

        const payload: PayloadToken = {
            role: getUser.role,
            sub: getUser.id,
        };

        return {
            accessToken: this.signJWT({
                payload,
                secret: process.env.JWT_SECRET,
                expires: '1h',
            }),
            user,
        };
    }
}
