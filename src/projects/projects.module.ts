import { Module } from '@nestjs/common';
import { ProjectsService } from './services/projects.service';
import { ProjectEntity } from './entities/projects.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectsController } from './controllers/projects.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([ProjectEntity]),
  ],
  providers: [ProjectsService],
  controllers: [ProjectsController]
})
export class ProjectsModule { }
