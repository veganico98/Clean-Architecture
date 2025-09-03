import { Column, Entity, PrimaryColumn } from "typeorm";

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

    @Column({nullable: true, type: 'datetime'})
    startedAt: Date | null;

    @Column({type: 'simple-enum'})
    status: ProjectStatus;

    @Column({type: 'datetime'})
    createdAt: Date;

    @Column({type: 'datetime'})
    updatedAt: Date;
}
