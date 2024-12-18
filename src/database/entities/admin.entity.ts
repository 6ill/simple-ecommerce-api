import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({name: 'admins'})
export class Admin {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({unique: true})
    username:string;

    @Column({unique: true})
    email:string;

    @Column({name: 'hashed_password'})
    hashedPassword: string;

    @CreateDateColumn({name: 'created_at'})
    createdAt: Date;

    @UpdateDateColumn({name: 'updated_at'})
    updatedAt: Date;
}