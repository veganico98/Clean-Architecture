import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Project } from './entities/project.entity';
import { ProjectsController } from './projects.controller';
import { ProjectsService } from './projects.service';
import { ProjectsWithUseCaseController } from './projects-with-use-case.controller';
import { CreateProjectUseCase } from './use-cases/create-project.use-case';
import { FindAllProjectsUseCase } from './use-cases/find-all-projects.use-case';
import { StartProjectUseCase } from './use-cases/start-project.use-case';
import { ProjectTypeOrmRepository } from 'src/repositories/project.ropository';

@Module({
  imports: [TypeOrmModule.forFeature([Project])],
  controllers: [
    // ProjectsController,
    ProjectsWithUseCaseController
  ],
  providers: [
    ProjectsService,
    CreateProjectUseCase,
    FindAllProjectsUseCase,
    StartProjectUseCase,
    ProjectTypeOrmRepository,
    {
      provide: 'IProjectRepository',
      useExisting: ProjectTypeOrmRepository
    }
  ],
})
export class ProjectsModule {}
