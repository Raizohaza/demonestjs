import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Actor } from 'src/entities/Actor';
import { Repository } from 'typeorm';
import { CreateActorDto } from './dto/create-actor.dto';
import { UpdateActorDto } from './dto/update-actor.dto';

@Injectable()
export class ActorService {
  constructor(
    @InjectRepository(Actor)
    private actorRepo: Repository<Actor>,
  ) {}
  async create(createActorDto: CreateActorDto) {
    const id = await this.actorRepo.query(
      `SELECT actor_id FROM actor WHERE actor_id = ( SELECT MAX(actor_id) FROM actor)`,
    );
    return await this.actorRepo.insert({
      actorId: id[0].actor_id + 1,
      ...createActorDto,
    });
  }

  async findAll() {
    return await this.actorRepo.find();
  }

  async findOne(id: number) {
    return await this.actorRepo.findOne({ where: { actorId: id } });
  }

  update(id: number, updateActorDto: UpdateActorDto) {
    return `This action updates a #${id} actor`;
  }

  async remove(id: number) {
    const actor = await this.actorRepo.findOne({ where: { actorId: id } });
    if (actor) {
      return await this.actorRepo.remove(actor);
    }
    return `Not found actor #${id}`;
  }
}
