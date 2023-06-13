import { Body, Controller, Get, Param, Post, Put, Delete, UseGuards } from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { UserDto, UserToProjectDto, UserUpdateDto } from '../entities/use.dto';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { PublicAccess } from 'src/auth/decorators/public.decorator';

@Controller('users')
@UseGuards(AuthGuard)
export class UsersController {
    constructor(
        private readonly usersService: UsersService
    ) { }

    @Post('create')
    public async createUser(@Body() body: UserDto) {
        return this.usersService.createUser(body);
    }


    @Get('all')
    public async findAllUsers() {
        return this.usersService.findAllUsers();
    }

    @PublicAccess()
    @Get(':id')
    public async findUserById(@Param('id') id: string) {
        return this.usersService.findUserById(id);
    }

    @Post('add-to-project')
    public async addToProject(@Body() body: UserToProjectDto) {
        return this.usersService.addToProject(body);
    }

    @Put('update/:id')
    public async updateUser(@Param('id') id: string, @Body() body: UserUpdateDto) {
        return this.usersService.updateUser(id, body);
    }

    @Delete(':id')
    public async deleteUser(@Param('id') id: string) {
        return this.usersService.deleteUser(id);
    }
}
