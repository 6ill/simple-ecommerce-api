import { Entity, PrimaryGeneratedColumn, OneToOne, JoinColumn, OneToMany, Column, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { User } from "./user.entity";
import { CartItem } from "./cart-item.entity";

@Entity('carts')
export class Cart {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne(() => User, (user) => user.cart, { onDelete: 'CASCADE' })
  @JoinColumn({name: 'user_id'}) 
  user: User; 

  @OneToMany(() => CartItem, (cartItem) => cartItem.cart, { cascade: true })
  items: CartItem[]; 
}
