import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProjectEntity } from '../entities/projects.entity';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { ProjectDto } from '../dto/project.dto';

@Injectable()
export class ProjectsService {
    constructor(
        @InjectRepository(ProjectEntity)
        private readonly projectRepository: Repository<ProjectEntity>
    ) { }

    public async createProject(body: ProjectDto): Promise<ProjectEntity> {
        try {
            const project = await this.projectRepository.save(body);
            return project;
        }
        catch (error) {
            throw error;
        }
    }

    public async findProjects(): Promise<ProjectEntity[]> {
        try {
            const project = await this.projectRepository.find();
            return project;
        }
        catch (error) {
            throw error;
        }
    }

    public async findProjectById(id: string): Promise<ProjectEntity> {
        try {
            const project = await this.projectRepository
                .createQueryBuilder('project')
                .where({ id })
                .getOne();
            return project;
        }
        catch (error) {
            throw error;
        }
    }

    public async updateProject(id: string, body: ProjectDto): Promise<UpdateResult> {
        try {
            const project = await this.projectRepository.update(id, body);
            if (project.affected === 0) {
                throw new Error('No project found');
            }
            return project;
        }
        catch (error) {
            throw error;
        }
    }

    public async deleteProject(id: string): Promise<DeleteResult> {
        try {
            const project = await this.projectRepository.delete(id);
            if (project.affected === 0) {
                throw new Error('No project found');
            }
            return project;
        }
        catch (error) {
            throw error;
        }
    }
}
