import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Address } from './Address';
import { Payment } from './Payment';

@Index('idx_fk_store_id', ['storeId'], {})
@Index('idx_fk_address_id', ['addressId'], {})
@Index('idx_last_name', ['lastName'], {})
@Entity('customer', { schema: 'testactor' })
export class Customer {
  @PrimaryGeneratedColumn({
    type: 'smallint',
    name: 'customer_id',
    unsigned: true,
  })
  customerId: number;

  @Column('tinyint', { name: 'store_id', unsigned: true })
  storeId: number;

  @Column('varchar', { name: 'first_name', length: 45 })
  firstName: string;

  @Column('varchar', { name: 'last_name', length: 45 })
  lastName: string;

  @Column('varchar', { name: 'email', nullable: true, length: 50 })
  email: string | null;

  @Column('smallint', { name: 'address_id', unsigned: true })
  addressId: number;

  @Column('tinyint', { name: 'active', width: 1, default: () => "'1'" })
  active: boolean;

  @Column('datetime', { name: 'create_date' })
  createDate: Date;

  @Column('timestamp', {
    name: 'last_update',
    default: () => 'CURRENT_TIMESTAMP',
  })
  lastUpdate: Date;

  @ManyToOne(() => Address, (address) => address.customers, {
    onDelete: 'RESTRICT',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'address_id', referencedColumnName: 'addressId' }])
  address: Address;

  @OneToMany(() => Payment, (payment) => payment.customer)
  payments: Payment[];
}
