import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Customer } from './Customer';

@Index('idx_fk_staff_id', ['staffId'], {})
@Index('idx_fk_customer_id', ['customerId'], {})
@Index('fk_payment_rental', ['rentalId'], {})
@Entity('payment', { schema: 'testactor' })
export class Payment {
  @PrimaryGeneratedColumn({
    type: 'smallint',
    name: 'payment_id',
    unsigned: true,
  })
  paymentId: number;

  @Column('smallint', { name: 'customer_id', unsigned: true })
  customerId: number;

  @Column('tinyint', { name: 'staff_id', unsigned: true })
  staffId: number;

  @Column('int', { name: 'rental_id', nullable: true })
  rentalId: number | null;

  @Column('decimal', { name: 'amount', precision: 5, scale: 2 })
  amount: string;

  @Column('datetime', { name: 'payment_date' })
  paymentDate: Date;

  @Column('timestamp', {
    name: 'last_update',
    default: () => 'CURRENT_TIMESTAMP',
  })
  lastUpdate: Date;

  @ManyToOne(() => Customer, (customer) => customer.payments, {
    onDelete: 'RESTRICT',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'customer_id', referencedColumnName: 'customerId' }])
  customer: Customer;
}
