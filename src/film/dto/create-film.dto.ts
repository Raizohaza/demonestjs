import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { FilmActor } from 'src/entities/FilmActor';
import { FilmCategory } from 'src/entities/FilmCategory';
import { Inventory } from 'src/entities/Inventory';
import { Language } from 'src/entities/Language';

export class CreateFilmDto {
  @ApiProperty({ type: Number, name: 'film_id' })
  @IsOptional()
  filmId: number;
  @ApiProperty({ name: 'title', maxLength: 255, required: true })
  @IsNotEmpty()
  @IsString()
  title: string;
  @IsOptional()
  @ApiProperty({ name: 'description', nullable: true, required: false })
  @IsString()
  description: string | null;
  @ApiProperty({ name: 'release_year', nullable: true, required: false })
  @IsOptional()
  releaseYear: number | null;
  @ApiProperty({ name: 'languageId', required: true })
  @IsNotEmpty()
  languageId: number;
  @ApiProperty({
    name: 'original_language_id',
    nullable: true,
    type: Number,
    required: false,
  })
  @IsOptional()
  originalLanguageId: number | null;
  @ApiProperty({
    type: Number,
    name: 'rental_duration',
    default: () => "'3'",
    required: false,
  })
  @IsOptional()
  rentalDuration: number;
  @ApiProperty({
    type: Number,
    name: 'rental_rate',
    default: () => "'4.99'",
    required: false,
  })
  @IsOptional()
  rentalRate: string;
  @ApiProperty({
    type: Number,
    name: 'length',
    nullable: true,
    required: false,
  })
  @IsOptional()
  length: number | null;
  @ApiProperty({
    type: Number,
    name: 'replacement_cost',
    default: () => "'19.99'",
    required: false,
  })
  @IsOptional()
  replacementCost: string;
  @ApiProperty({
    type: 'enum',
    name: 'rating',
    nullable: true,
    enum: ['G', 'PG', 'PG-13', 'R', 'NC-17'],
    default: "'G'",
    required: false,
  })
  @IsOptional()
  rating: 'G' | 'PG' | 'PG-13' | 'R' | 'NC-17' | null;
  @ApiProperty({
    type: 'set',
    name: 'special_features',
    nullable: true,
    enum: ['Trailers', 'Commentaries', 'Deleted Scenes', 'Behind the Scenes'],
    required: false,
  })
  @IsOptional()
  specialFeatures:
    | ('Trailers' | 'Commentaries' | 'Deleted Scenes' | 'Behind the Scenes')[]
    | null;
  @ApiProperty({
    type: Date,
    name: 'last_update',
    default: () => 'CURRENT_TIMESTAMP',
    required: false,
  })
  @IsOptional()
  lastUpdate: Date;
  @ApiProperty({ required: false })
  @IsOptional()
  language: Language;
  @ApiProperty({ required: false })
  @IsOptional()
  originalLanguage: Language;
  @ApiProperty({ required: false })
  @IsOptional()
  filmActors: FilmActor[];
  @ApiProperty({ required: false })
  @IsOptional()
  filmCategories: FilmCategory[];
  @ApiProperty({ required: false })
  @IsOptional()
  inventories: Inventory[];
}
