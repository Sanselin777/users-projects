import { BaseEntity } from "../../config/base.entity";
import { ACCESS_LEVEL } from "../../constants/roles";
import { ProjectEntity } from "../../projects/entities/projects.entity";
import { Column, ManyToOne, Entity } from 'typeorm';
import { UserEntity } from "./users.entity";


@Entity({ name: 'users_projects' })
export class UsersProjectsEntity extends BaseEntity {

    @Column()
    accessLevel: ACCESS_LEVEL;
    
    @ManyToOne(() => UserEntity, user => user.projectsIncludes)
    user: UserEntity;

    @ManyToOne(() => ProjectEntity, project => project.usersIncludes)
    project: ProjectEntity;
}

