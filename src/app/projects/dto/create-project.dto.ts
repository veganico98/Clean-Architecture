import { ProjectStatus } from "../entities/project.entity";

export class CreateProjectDto {
    name: string;

    description: string;

    startedAt: Date | null;

    finishedAt: Date | null;

    cancelledAt: Date | null;

    status: ProjectStatus;
}
