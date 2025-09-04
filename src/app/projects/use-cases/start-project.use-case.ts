import { Inject, NotFoundException } from "@nestjs/common";
import { StartProjectDto } from "../dto/start-project.dto";
import { IProjectRepository } from "src/repositories/project.ropository";

export class StartProjectUseCase {
    constructor(
        @Inject('IProjectRepository')
        private projectRepo: IProjectRepository
      ) {}

    async execute(id: string, startProjectDto: StartProjectDto) {
        const project = await this.projectRepo.findById(id)
        
        if (!project) {
            throw new NotFoundException(`O projeto ID ${id} não foi encontrado!`);
        }

        project.start(startProjectDto.startedAt)

        await this.projectRepo.update(project);

        return project;
    }
}