import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Film } from './Film';

@Index('idx_fk_film_id', ['filmId'], {})
@Index('idx_store_id_film_id', ['storeId', 'filmId'], {})
@Entity('inventory', { schema: 'testactor' })
export class Inventory {
  @PrimaryGeneratedColumn({
    type: 'mediumint',
    name: 'inventory_id',
    unsigned: true,
  })
  inventoryId: number;

  @Column('smallint', { name: 'film_id', unsigned: true })
  filmId: number;

  @Column('tinyint', { name: 'store_id', unsigned: true })
  storeId: number;

  @Column('timestamp', {
    name: 'last_update',
    default: () => 'CURRENT_TIMESTAMP',
  })
  lastUpdate: Date;

  @ManyToOne(() => Film, (film) => film.inventories, {
    onDelete: 'RESTRICT',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'film_id', referencedColumnName: 'filmId' }])
  film: Film;
}
