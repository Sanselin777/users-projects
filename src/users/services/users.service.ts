import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { UserEntity } from '../entities/users.entity';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { UserDto, UserToProjectDto, UserUpdateDto } from '../entities/use.dto';
import { ErrorManager } from 'src/utils/error.manger';
import { UsersProjectsEntity } from '../entities/usersProjects.entity';

@Injectable()
export class UsersService {

    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>,
        @InjectRepository(UsersProjectsEntity)
        private readonly userProjectRepository: Repository<UsersProjectsEntity>
    ) { }

    public async createUser(body: UserDto): Promise<UserEntity> {
        try {
            body.password = await bcrypt.hash(body.password, +process.env.HASH_SALT);
            const user = await this.userRepository.save(body);
            return user;
        }
        catch (error) {
            throw ErrorManager.createSignatureError(error.message);
        }
    }

    public async findAllUsers(): Promise<UserEntity[]> {
        try {
            const users = await this.userRepository.find();
            if (users.length === 0) {
                throw new ErrorManager({
                    type: 'BAD_REQUEST',
                    message: 'No users found',
                });
            }
            return users;
        }
        catch (error) {
            throw ErrorManager.createSignatureError(error.message);
        }
    }

    public async findUserById(id: string): Promise<UserEntity> {
        try {
            const user = await this.userRepository
                .createQueryBuilder('user')
                .leftJoinAndSelect('user.projectsIncludes', 'projectsIncludes')
                .leftJoinAndSelect('projectsIncludes.project', 'project')
                .where({ id })
                .getOne();
            if (!user) {
                throw new ErrorManager({
                    type: 'BAD_REQUEST',
                    message: 'No user found',
                });
            }
            return user;
        }
        catch (error) {
            throw ErrorManager.createSignatureError(error.message);
        }
    }

    public async addToProject(body: UserToProjectDto): Promise<UsersProjectsEntity> {
        try {
            const userProject = await this.userProjectRepository.save(body);
            return userProject;
        }
        catch (error) {
            throw ErrorManager.createSignatureError(error.message);
        }
    }

    public async updateUser(id: string, body: UserUpdateDto): Promise<UpdateResult> {
        try {
            const user = await this.userRepository.update(id, body);
            if (user.affected === 0) {
                throw new ErrorManager({
                    type: 'BAD_REQUEST',
                    message: 'No user found',
                });
            }
            return user;
        }
        catch (error) {
            throw ErrorManager.createSignatureError(error.message);
        }
    }

    public async deleteUser(id: string): Promise<DeleteResult> {
        try {
            const user = await this.userRepository.delete(id);
            if (user.affected === 0) {
                throw new ErrorManager({
                    type: 'BAD_REQUEST',
                    message: 'No user found',
                });
            }
            return user;
        }
        catch (error) {
            throw ErrorManager.createSignatureError(error.message);
        }
    }

    public async findBy(
        { key, value }: { key: keyof UserDto, value: any }
    ) {
        try {
            const user: UserEntity = await this.userRepository
                .createQueryBuilder('user')
                .addSelect('user.password')
                .where({ [key]: value })
                .getOne();
            return user;
        }
        catch (error) {
            throw ErrorManager.createSignatureError(error.message);
        }
    }


}
