import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Film } from 'src/entities/Film';
import { Repository } from 'typeorm';
import { CreateFilmDto } from './dto/create-film.dto';
import { UpdateFilmDto } from './dto/update-film.dto';

@Injectable()
export class FilmService {
  constructor(
    @InjectRepository(Film)
    private filmsRepo: Repository<Film>,
  ) {}
  create(createFilmDto: CreateFilmDto) {
    return 'This action adds a new film';
  }

  async findAll() {
    return await this.filmsRepo.find();
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
