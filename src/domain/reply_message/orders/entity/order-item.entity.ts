import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('order_items')
export class OrderItem {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  order_id: number;

  @Column()
  product_id: number;

  @Column()
  size: string; 

  @Column()
  quantity: number;

  @Column()
  price: number;
}
