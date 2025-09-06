import type { IProjectRepository } from "src/repositories/project.repository";
import { CreateProjectDto } from "../dto/create-project.dto";
import { Project } from "../entities/project.entity";
import { Inject, Injectable } from "@nestjs/common";

@Injectable()
export class CreateProjectUseCase {
    constructor(
        @Inject('IProjectRepository')
        private projectRepo: IProjectRepository
      ) {}

    async execute(createProjectDto: CreateProjectDto) {
        const project = new Project(createProjectDto);
        await this.projectRepo.create(project);
        return project;
    }
}