import { Entity, PrimaryGeneratedColumn, ManyToOne, Column, CreateDateColumn } from "typeorm";
import { Cart } from "./cart.entity";
import { Product } from "./product.entity";

@Entity('cart_items')
export class CartItem {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Cart, (cart) => cart.items, { onDelete: 'CASCADE' })
  cart: Cart; 

  @ManyToOne(() => Product)
  product: Product; 

  @Column('int')
  quantity: number; 
}
