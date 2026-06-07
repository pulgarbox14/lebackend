import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('orders')  // ← orders pas inventory !
export class Order {

  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  customerName!: string;  // ← nom du client

  @Column({ default: 0 })
  quantity!: number;      // ← quantité

  @Column('decimal', { precision: 10, scale: 2 })
  totalPrice!: number;    // ← prix total

  @Column({ default: 'pending' })
  status!: string;        // ← pending, completed, cancelled

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}