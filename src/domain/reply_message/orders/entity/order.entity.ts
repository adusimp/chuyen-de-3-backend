import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('orders')
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  order_code: string;

  @Column()
  customer_name: string;

  @Column()
  phone: string;

  @Column()
  address: string;

  @Column({ type: 'int', default: 0 })
  total_price: number;

  @Column({ default: 'pending' })
  status: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
