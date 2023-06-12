import { Controller, Post, Body, Get, Param, Put, Delete } from '@nestjs/common';
import { ProjectsService } from '../services/projects.service';
import { ProjectDto } from '../dto/project.dto';

@Controller('projects')
export class ProjectsController {
    constructor(
        private readonly projectsService: ProjectsService
    ) { }

    @Post('create')
    public async createProject(@Body() body: ProjectDto) {
        return this.projectsService.createProject(body);
    }

    @Get('all')
    public async findProjects() {
        return this.projectsService.findProjects();
    }

    @Get(':id')
    public async findProjectById(@Param('id') id: string) {
        return this.projectsService.findProjectById(id);
    }

    @Put('update/:id')
    public async updateProject(@Param('id') id: string, @Body() body: ProjectDto) {
        return this.projectsService.updateProject(id, body);
    }

    @Delete(':id')
    public async deleteProject(@Param('id') id: string) {
        return this.projectsService.deleteProject(id);
    }

}
