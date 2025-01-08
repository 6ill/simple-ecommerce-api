import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";
import { OrderItem } from "./order-item.entity";
import { OrderStatus } from "src/common/enums";

@Entity('orders')
export class Order {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User)
  @JoinColumn({name: 'user_id'})
  user: User;

  @OneToMany(() => OrderItem, (orderItem) => orderItem.order, { cascade: true })
  items: OrderItem[];

  @Column({ name:'total_amount',  type: 'decimal', precision: 10, scale: 2 })
  totalAmount: number;

  @Column({ type: 'enum', enum: OrderStatus, default: OrderStatus.Pending })
  status: OrderStatus;

  @Column({ name:'refund_reason', type: 'text', nullable: true })
  refundReason: string;

  @Column({ name:'refund_amount', type: 'decimal', precision: 10, scale: 2, nullable: true })
  refundAmount: number;

  @Column({ name:'refund_processed_at', type: 'timestamp', nullable: true })
  refundProcessedAt: Date;

  @CreateDateColumn({name: 'created_at'})
  createdAt: Date;
}
