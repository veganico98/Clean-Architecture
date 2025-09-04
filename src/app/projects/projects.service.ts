import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { Repository } from 'typeorm';
import { Project, ProjectStatus } from './entities/project.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ProjectsService {

  constructor(
    @InjectRepository(Project)
    private projectRepo: Repository<Project>
  ) {}

  async create(createProjectDto: CreateProjectDto) {
    const project = new Project(createProjectDto);

    if (createProjectDto.startedAt) {
      project.status = ProjectStatus.Active;
    }

    return this.projectRepo.save(project);
  }

  async findAll() {
    return this.projectRepo.find();
  }

  async findOne(id: string) {
    const project = await this.projectRepo.findOne({ where: { id } })

    if (!project) {
      throw new NotFoundException(`O projeto ID ${id} não foi encontrado!`);
    }

    return project;
  }

  async update(id: string, updateProjectDto: UpdateProjectDto) {
    const project = await this.findOne(id)

    updateProjectDto.name && (project.name = updateProjectDto.name);
    updateProjectDto.description && (project.description = updateProjectDto.description)

    if (updateProjectDto.startedAt) {
      if (project.status === ProjectStatus.Active) {
        throw new BadRequestException("Não é possível iniciar um projeto ativo!");
      }

      if (project.status === ProjectStatus.Completed) {
        throw new BadRequestException("Não é possível iniciar um projeto concluído!");
      }

      if (project.status === ProjectStatus.Cancelled) {
        throw new BadRequestException("Não é possível iniciar um projeto cancelado!");
      }

      project.startedAt = updateProjectDto.startedAt;
      project.status = ProjectStatus.Active;
    }

    if (updateProjectDto.cancelledAt) {
      if (project.status === ProjectStatus.Completed) {
        throw new BadRequestException("Não é possível cancelar um projeto concluído!");
      }

      if (project.status === ProjectStatus.Cancelled) {
        throw new BadRequestException("Não é possível cancelar um projeto cancelado!");
      }

      // Fazer um null check antes da comparação
      if (project.startedAt && updateProjectDto.cancelledAt < project.startedAt) {
        throw new BadRequestException("Não é possível cancelar o projeto antes de ele ter começado");
      }

      project.cancelledAt = updateProjectDto.cancelledAt;
      project.status = ProjectStatus.Cancelled;
    }

    if (updateProjectDto.finishedAt) {
      if (project.status === ProjectStatus.Completed) {
        throw new BadRequestException("Não é possível concluir um projeto concluído!");
      }

      if (project.status === ProjectStatus.Cancelled) {
        throw new BadRequestException("Não é possível concluir um projeto cancelado!");
      }

      // Fazer um null check antes da comparação
      if (project.startedAt && updateProjectDto.finishedAt < project.startedAt) {
        throw new BadRequestException("Não é possível concluir o projeto antes de ele ter começado");
      }

      project.finishedAt = updateProjectDto.finishedAt;
      project.status = ProjectStatus.Completed;
    }

    return this.projectRepo.save(project);
  }

  async remove(id: string) {
    await this.findOne(id);

    return this.projectRepo.delete({ id })
  }
}
