import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

@Entity('payments')
export class Payment {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column('decimal', { precision: 10, scale: 2 })
  amount!: number;

  @Column({ default: 'pending' })
  status!: string; // pending, completed, failed

  @Column()
  paymentMethod!: string; // cash, card, mobile

  @Column({ nullable: true })
  description!: string;

  @CreateDateColumn()
  createdAt!: Date;
}