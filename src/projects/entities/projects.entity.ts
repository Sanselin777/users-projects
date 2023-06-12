import { BaseEntity } from "../../config/base.entity";
import { IProject } from "../../interfaces/project.interface";
import { UserEntity } from "../../users/entities/users.entity";
import { UsersProjectsEntity } from "../../users/entities/usersProjects.entity";
import { Entity, Column, OneToMany } from "typeorm";

@Entity({ name: 'projects' })
export class ProjectEntity extends BaseEntity implements IProject {
    @Column()
    name: string;
    @Column()
    description: string;

    @OneToMany(
        () => UsersProjectsEntity,
        (usersProjects) => usersProjects.project,
    )
    usersIncludes: UsersProjectsEntity[];
}