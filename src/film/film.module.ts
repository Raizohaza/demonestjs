import { Module } from '@nestjs/common';
import { FilmService } from './film.service';
import { FilmController } from './film.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Film } from 'src/entities/Film';
import { Language } from 'src/entities/Language';
import { FilmActor } from 'src/entities/FilmActor';
import { FilmCategory } from 'src/entities/FilmCategory';
import { Category } from 'src/entities/Category';
import { Inventory } from 'src/entities/Inventory';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Film,
      Language,
      FilmActor,
      FilmCategory,
      Category,
      Inventory,
    ]),
  ],
  controllers: [FilmController],
  providers: [FilmService],
})
export class FilmModule {}
