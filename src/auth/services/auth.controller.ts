import { Body, Controller, Post, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDTO } from '../dto/auth.dto';

@Controller('auth')
export class AuthController {

    constructor(
        private readonly authService: AuthService,
    ) { }

    @Post('login')
    async login(@Body() { username, password }: AuthDTO) {
        const userValidated = await this.authService.validateUser(username, password);

        if (!userValidated) {
            throw new UnauthorizedException('Invalid credentials');
        }

        const jwt = await this.authService.generateJWT(userValidated);

        return jwt;
    }
}
