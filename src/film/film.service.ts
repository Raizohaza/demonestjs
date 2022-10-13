import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Film } from 'src/entities/Film';
import { Repository } from 'typeorm';
import { Logger } from 'winston';
import { CreateFilmDto } from './dto/create-film.dto';
import { UpdateFilmDto } from './dto/update-film.dto';

@Injectable()
export class FilmService {
  constructor(
    @InjectRepository(Film)
    private filmRepo: Repository<Film>,
    @Inject('winston')
    private readonly logger: Logger,
  ) {}
  async create(createFilmDto: CreateFilmDto) {
    this.logger.info(createFilmDto);
    return await this.filmRepo.insert({
      ...createFilmDto,
    });
  }

  async findAll() {
    this.logger.info('Returning suggestions...');
    return await this.filmRepo.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} film`;
  }

  update(id: number, updateFilmDto: UpdateFilmDto) {
    return `This action updates a #${id} film`;
  }

  remove(id: number) {
    return `This action removes a #${id} film`;
  }
}
