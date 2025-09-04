import { BadRequestException } from '@nestjs/common';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export enum ProjectStatus {
  Pending = 'pending',
  Active = 'active',
  Cancelled = 'cancelled',
  Completed = 'completed',
}

@Entity()
export class Project {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column({ type: 'timestamp', nullable: true })
  startedAt: Date | null;

  @Column({ type: 'timestamp', nullable: true })
  finishedAt: Date | null;

  @Column({ type: 'timestamp', nullable: true })
  cancelledAt: Date | null;

  @Column({ type: 'enum', enum: ProjectStatus, default: ProjectStatus.Pending })
  status: ProjectStatus;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  updatedAt: Date;

  constructor(
    props?: {
      name: string;
      description: string;
      startedAt?: Date | null;
      finishedAt?: Date | null;
      cancelledAt?: Date | null;
    },
    id?: string
    ) {
      Object.assign(this, props);
      this.id = id ?? crypto.randomUUID();

      if (props?.startedAt) {
        this.start(props.startedAt);
      }
  }

  start(startedAt: Date) {
    if (this.status === ProjectStatus.Active) {
    throw new BadRequestException("Não é possível iniciar um projeto ativo!");
    }

    if (this.status === ProjectStatus.Completed) {
    throw new BadRequestException("Não é possível iniciar um projeto concluído!");
    }

    if (this.status === ProjectStatus.Cancelled) {
    throw new BadRequestException("Não é possível iniciar um projeto cancelado!");
    }

    this.startedAt = startedAt;
    this.status = ProjectStatus.Active;
  }

}
