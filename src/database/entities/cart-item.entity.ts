import { Entity, PrimaryGeneratedColumn, ManyToOne, Column, CreateDateColumn, JoinColumn } from "typeorm";
import { Cart } from "./cart.entity";
import { Product } from "./product.entity";

@Entity('cart_items')
export class CartItem {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Cart, (cart) => cart.items, { onDelete: 'CASCADE' })
  @JoinColumn({name: 'cart_id'})
  cart: Cart; 

  @ManyToOne(() => Product)
  @JoinColumn({name: 'product_id'})
  product: Product; 

  @Column('int')
  quantity: number; 
}
