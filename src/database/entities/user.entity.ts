import { Column, CreateDateColumn, Entity, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Cart } from "./cart.entity";

@Entity({name: 'users'})
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({unique: true})
    username:string;

    @Column({unique: true})
    email:string;

    @Column({name: 'full_name'})
    fullName: string;

    @Column({name: 'contact_number'})
    contactNumber:string;

    @Column({name: 'hashed_password'})
    hashedPassword: string;

    @CreateDateColumn({name: 'created_at'})
    createdAt: Date;

    @UpdateDateColumn({name: 'updated_at'})
    updatedAt: Date;

    @Column()
    address: string;

    @OneToOne(() => Cart, (cart) => cart.user, {cascade: true})
    cart: Cart;
}