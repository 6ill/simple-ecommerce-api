import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Order } from "./order.entity";
import { Product } from "./product.entity";

@Entity('order_items')
export class OrderItem {
  @PrimaryGeneratedColumn('uuid')
  id: string; 

  @ManyToOne(() => Product)
  @JoinColumn({name: 'product_id'})
  product: Product;

  @ManyToOne(() => Order, (order) => order.items)
  @JoinColumn({name: 'order_id'})
  order: Order;

  @Column()
  quantity: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  totalPrice: number;
}
