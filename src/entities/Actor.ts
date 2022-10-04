import { Column, Entity, OneToMany } from 'typeorm';
import { FilmActor } from './FilmActor';

@Entity('actor', { schema: 'testactor' })
export class Actor {
  @Column('smallint', { primary: true, name: 'actor_id', unsigned: true })
  actorId: number;

  @Column('timestamp', {
    name: 'last_update',
    default: () => 'CURRENT_TIMESTAMP',
  })
  lastUpdate: Date;

  @Column('varchar', { name: 'first_name', length: 255 })
  firstName: string;

  @Column('varchar', { name: 'last_name', length: 255 })
  lastName: string;

  @OneToMany(() => FilmActor, (filmActor) => filmActor.actor)
  filmActors: FilmActor[];
}
