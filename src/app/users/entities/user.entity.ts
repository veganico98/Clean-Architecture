import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn} from "typeorm";

export enum RoleUser{
    Admin = 'administrador',
    User = 'usuario'
}

export enum DeptoUser{
    SD = 'Sem departamento',
    TI = 'Tecnologia',
    MKT = 'Marketing',
    FI = "Financas",
    RH = "Recursos Humanos"
}

@Entity()
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column()
    email: string;

    @Column()
    document: string;

    @Column()
    phone: string;

    @Column()
    socialnetwork: string;

    @Column({ type: 'enum', enum: RoleUser, default: RoleUser.User })
    role: RoleUser;

    @Column({ type: 'enum', enum: DeptoUser, default: DeptoUser.SD })
    depto: DeptoUser;

    @CreateDateColumn({ 
        type: 'timestamp', 
        default: () => 'CURRENT_TIMESTAMP(6)',
    })createdAt: Date;

    @CreateDateColumn({ 
        type: 'timestamp', 
        default: () => 'CURRENT_TIMESTAMP(6)',
        onUpdate: 'CURRENT_TIMESTAMP(6)',
    })updatedAt: Date;

    constructor(props?: {
        name: string;
        email: string;
        phone: string;
        document: string;
        socialnetwork: string;
        role: RoleUser;
        depto: DeptoUser;
    }){
        Object.assign(this, props);
        this.createdAt = new Date();
    }
}