import { Inject, Injectable } from "@nestjs/common";
import type { IProjectRepository } from "src/repositories/project.repository";

@Injectable()
export class FindAllProjectsUseCase {
    constructor(
        @Inject('IProjectRepository')
        private projectRepo: IProjectRepository
      ) {}

    execute() {
        return this.projectRepo.findAll();
    }
}