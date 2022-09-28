import { Entity, Column, PrimaryGeneratedColumn, PrimaryColumn } from 'typeorm';
@Entity()
export class Actor {
  @PrimaryColumn({
    type: 'smallint',
    width: 5,
    unsigned: true,
  })
  actor_id: number;
  @Column()
  first_name: string;
  @Column()
  last_name: string;
  @Column({ type: 'timestamp' })
  last_update: Date;
}
