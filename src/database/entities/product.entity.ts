import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({name: 'products'})
export class Product {  
    @PrimaryGeneratedColumn('uuid')
    id:string;

    @Column()
    name:string;

    @Column()
    description: string;

    @Column()
    price: number;

    @CreateDateColumn({name: 'created_at'})
    createdAt: Date;
    
    @UpdateDateColumn({name: 'updated_at'})
    updatedAt: Date;
}