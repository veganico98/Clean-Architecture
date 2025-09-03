import { Column, CreateDateColumn, Entity, PrimaryColumn } from "typeorm";
import crypto from 'crypto';

export enum ProjectStatus {
    Pending = "pending",
    Active = "active",
    Canceled = "canceled",
    Completed = "completed"
}

@Entity()
export class Project {
    @PrimaryColumn()
    id: string;

    @Column()
    name: string;

    @CreateDateColumn({ nullable: true })
    startedAt: Date | null;

    @CreateDateColumn({ nullable: true })
    finishedAt: Date | null;

    @Column({type: 'simple-enum'})
    status: ProjectStatus;

    @CreateDateColumn()
    createdAt: Date;

    @CreateDateColumn()
    updatedAt: Date;

    constructor(props: {
        name: string;
        startedAt?: Date | null;
        finishedAt?: Date | null;
        createdAt?: Date | null;
        updatedAt?: Date | null;
    }, id? : string) {
        Object.assign(this, props);
        this.id = id ?? crypto.randomUUID();
    }
}