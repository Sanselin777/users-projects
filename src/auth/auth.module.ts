import { Module } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { AuthController } from './services/auth.controller';
import { UsersModule } from 'src/users/users.module';
import { UsersService } from 'src/users/services/users.service';

@Module({
  imports: [UsersModule],
  providers: [AuthService, UsersService],
  controllers: [AuthController]
})
export class AuthModule { }
